import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { auth, provider } from "../services/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem("userPhoto") || "");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const photoURL = currentUser.photoURL || "";
        setUserPhoto(photoURL);
        localStorage.setItem("userPhoto", photoURL); 
      } else {
        setUserPhoto(""); 
        localStorage.removeItem("userPhoto");
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.photoURL) {
        setUserPhoto(result.user.photoURL);
        localStorage.setItem("userPhoto", result.user.photoURL);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserPhoto(""); 
      localStorage.removeItem("userPhoto");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-5">
        <Link to="/" className="text-2xl font-bold text-red-500">
          CarSpace
        </Link>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
          <li><Link to="/listings" className="hover:text-red-500 transition">Listings</Link></li>
          <li><Link to="/contact" className="hover:text-red-500 transition">Contact</Link></li>
          <li><Link to="/about" className="hover:text-red-500 transition">About Us</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <img 
                src={userPhoto || "/default-avatar.png"} 
                onError={(e) => (e.target.src = "/default-avatar.png")} 
                alt="User Avatar" 
                className="h-8 w-8 rounded-full" 
              />
              <button onClick={handleSignOut} className="text-gray-700 hover:text-red-500 transition">
                <FaSignOutAlt size={22} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button onClick={handleSignIn} className="text-gray-700 hover:text-red-500 transition">
                <FaSignInAlt size={22} />
              </button>
              <Link to="/signup" className="text-gray-700 hover:text-red-500 transition">
                <FaUserPlus size={22} />
              </Link>
            </div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <ul className="md:hidden bg-white border-t border-gray-200 py-4 space-y-4 text-center">
          <li><Link to="/" className="block text-gray-700 font-medium hover:text-red-500 transition">Home</Link></li>
          <li><Link to="/listings" className="block text-gray-700 font-medium hover:text-red-500 transition">Listings</Link></li>
          <li><Link to="/contact" className="block text-gray-700 font-medium hover:text-red-500 transition">Contact</Link></li>
          <li><Link to="/about" className="block text-gray-700 font-medium hover:text-red-500 transition">About Us</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
