import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../services/firebase";
import { Link } from "react-router-dom";
import "../Signup.css"; 

const Signup: React.FC = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Auth Success:", result.user);
      navigate("/home");
    } catch (err) {
      setError("Google Authentication Failed.");
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!name || !phone || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setLoading(false);
      navigate("/home"); // Redirect to home after successful signup
    } catch (err) {
      setError("Registration Failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-image"></div>
        <div className="signup-form">
          <h2 className="logo-text">
            <span className="blue-text">Car</span>
            <span className="red-text">space</span>
          </h2>
          <div className="switch-buttons">
            <button className="inactive"></button>
            <button className="active mr-[3rem]">Sign up</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Registered Successfully!</p>}
          
          <input type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Enter your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Enter your Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={handleRegister} className="continue-button">
            {loading ? "Registering..." : "Continue"}
          </button>

          <p className="or-text ml-[10rem] text-xl">or</p>
          {/* Google Signup Button */}
          <button onClick={handleGoogleAuth} className="google-button">
            <img src="https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg" alt="Google Icon" className="google-icon" />
            Sign up with Google
          </button>
          
          <p className="login-text">
            Already have an account? <Link to="/login" className="login-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
