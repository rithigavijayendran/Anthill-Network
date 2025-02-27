import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedListings from "../components/FeaturedListings";
import Button from "../components/ui/Button";
import Queryform from "../components/Queryform";
import ExploreCars from "../components/ExploreCars";
//import hero from "../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-[400px] md:h-[600px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1549207107-2704df6b92ab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0  bg-opacity-50"></div>

        <div className="relative container mx-auto px-5 flex justify-start">
          <div className="text-white text-left max-w-lg">
            <motion.h1
              className="text-2xl md:text-4xl font-bold"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Find Quality-Assured Cars <br /> Tailored to Your Budget and Preferences
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg rounded-lg shadow-lg"
                onClick={() => navigate("/listings")}
              >
                Book My Car
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Cars */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ExploreCars />
      </motion.div>

      {/* Featured Listings */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gray-100"
      >
        <FeaturedListings />
      </motion.div>

      {/* Contact / Query Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Queryform />
      </motion.div>
    </div>
  );
};

export default Home;
