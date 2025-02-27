
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listing"; 
import CarDetail from "./pages/CarDetail";
import Login from "./pages/login";
import Signup from "./pages/Signup"; 
import About from "./pages/About"; 
import Contact from "./pages/Contact" 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> {/* ✅ About Page */}
            <Route path="/contact" element={<Contact />} /> {/* ✅ Contact Page */}
            <Route path="/listings" element={<Listings />} />
            <Route path="/car/:carId" element={<CarDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
