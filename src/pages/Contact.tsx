import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await addDoc(collection(db, "queries"), form);
      setMessage("✅ Your inquiry has been sent successfully!");
      setForm({ name: "", phone: "", message: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 mt-12">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-red-500">Get in Touch</h1>
        <p className="mt-4 text-gray-600 text-lg">
          We’re here to help! Feel free to reach out, and we’ll get back to you as soon as possible.
        </p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-lg"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4 h-32"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            {isSubmitting ? "Sending..." : "Send My Inquiry"}
          </button>
          {message && (
              <p className={`mt-3 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
        </motion.form>

        {/* Contact Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src="https://plus.unsplash.com/premium_photo-1681487748082-839c7c0ee0c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Contact Us" className="w-full rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
