import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../services/firebase";
import "../Signup.css"; 

const Login: React.FC = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      setError("Google login failed. Try again.");
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
            <button className="active ml-[2rem]">Login</button>
            <button className="inactive"></button>
          </div>
          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            placeholder="Enter your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="continue-button">
            {loading ? "Logging in..." : "Continue"}
          </button>

          <p className="or-text ml-[10rem] text-xl">or</p>

          <button onClick={handleGoogleLogin} className="google-button">
            <img
              src="https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg"
              alt="Google Icon"
              className="google-icon"
            />
            Sign in with Google
          </button>

          <p className="login-text">
            Don't have an account? <Link to="/signup" className="login-link">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
