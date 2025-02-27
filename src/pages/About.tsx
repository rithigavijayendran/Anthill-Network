import { motion } from "framer-motion";
import Rithi from "../assets/Rithi.jpeg";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-16 mt-10">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-gray-900">About <span className="text-red-600">CarSpace</span></h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          CarSpace is your trusted destination for buying and selling quality-assured second-hand cars, tailored to your budget and preferences.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 text-gray-700">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-3xl font-semibold text-red-600 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To create the most transparent, reliable, and efficient marketplace for buying and selling used cars, ensuring safety, trust, and customer satisfaction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-3xl font-semibold text-red-600 mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To revolutionize the pre-owned car industry with a seamless, hassle-free, and secure buying experience, making CarSpace the go-to platform for car enthusiasts.
          </p>
        </motion.div>
      </div>

      {/* Core Values */}
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Trust & Transparency", desc: "We ensure full transparency in every transaction to build customer trust." },
            { title: "Customer First", desc: "Our platform is built with a customer-centric approach, prioritizing user experience." },
            { title: "Innovation & Excellence", desc: "We continuously innovate to provide the best car-buying experience." },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-gray-100 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-2">{value.title}</h3>
              <p className="text-lg text-gray-700">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { name: "Rithiga", role: "Co-Founder & CEO", img: Rithi },
            { name: "Rithu", role: "Chief Technology Officer", img: Rithi },
            { name: "Rithi", role: "Head of Marketing", img: Rithi },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className="bg-white p-6 shadow-lg rounded-xl border border-gray-200"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-gray-300"
              />
              <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-500 text-lg">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
