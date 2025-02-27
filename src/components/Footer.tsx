import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-blue-600 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Do you have Something to Sell through Us?</h2>
          <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => navigate("/home")}>
            Sell your car today
          </button>
        </div>

        <hr className="border-white/30 mb-6" />
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white text-black p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
            <p className="font-semibold">📍Anthill Networks, BTM 1st Stage, Bangalore, Karnataka 560029</p>
            <p className="mt-2 flex items-center">
              ✉️ <a href="mailto:hello@email.com" className="ml-2 text-blue-600 hover:underline">rithiga@email.com</a>
            </p>
            <p className="mt-2 flex items-center">
              📞 <a href="tel:+9183109555920" className="ml-2 text-blue-600 hover:underline">+91 8778859443</a>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <ul className="space-y-1 text-white/80">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Cars</a></li>
                <li><a href="#" className="hover:text-white">Testimonials</a></li>
                <li><a href="#" className="hover:text-white">FAQ’s</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Explore</h3>
              <ul className="space-y-1 text-white/80">
                <li><a href="#" className="hover:text-white">Blogs</a></li>
                <li><a href="#" className="hover:text-white">Press Mentions</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8 border-t border-white/30 pt-4">
          <div className="text-white/80 text-sm space-x-4">
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/rithiga-v-80788b259/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-gray-200" />
            </a>
            <a href="https://www.linkedin.com/in/rithiga-v-80788b259/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-gray-200" />
            </a>
            <a href="https://www.linkedin.com/in/rithiga-v-80788b259/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-200" />
            </a>
            <a href="https://www.linkedin.com/in/rithiga-v-80788b259/" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="w-5 h-5 cursor-pointer hover:text-gray-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
