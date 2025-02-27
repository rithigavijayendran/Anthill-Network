import { useState } from "react";
import { db } from "../services/firebase"; // Ensure this is the correct path
import { collection, addDoc } from "firebase/firestore";

const QueryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Store the form data in the Firestore "inquiries" collection
      await addDoc(collection(db, "queries"), {
        name: formData.name,
        phone: formData.phone,
        description: formData.description,
        timestamp: new Date(),
      });

      setMessage("✅ Your inquiry has been sent successfully!");
      setFormData({ name: "", phone: "", description: "" }); // Reset form
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Error submitting your inquiry. Please try again.");
      console.error("Firebase Error:", error);
    }
    setLoading(false);
  };

  return (
    <section className="py-10 px-5 container mx-auto">
      <h2 className="text-3xl font-bold mb-5">║ Get In Touch</h2>
      <div className="flex flex-col lg:flex-row bg-gray-100 py-12 px-6 lg:px-20">
        
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl lg:w-1/2 p-6">
          <p className="text-gray-600 mb-6">We're here to help! Reach out with your queries, and we'll get back ASAP.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-red-300"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-red-300"
                required
              />
            </div>

            <textarea
              name="description"
              placeholder="Your Message"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-md h-28 focus:ring focus:ring-red-300"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin mr-2">⏳</span>
              ) : (
                "Send My Inquiry"
              )}
            </button>

            {message && (
              <p className={`mt-3 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="lg:w-1/2 hidden lg:block">
          <img
            src="https://plus.unsplash.com/premium_photo-1679823827177-a94b898c9d2e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Customer support"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default QueryForm;
