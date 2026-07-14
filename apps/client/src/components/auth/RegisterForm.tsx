import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";

const passwordPolicy = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!passwordPolicy.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters, include one uppercase letter, one number, and one special character (@#$/etc.)";
      valid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      setServerMessage(response.data.message);
      navigate("/dashboard", { state: { userName: response.data.user.name } });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrors((prev) => ({ ...prev, email: error.response?.data.message }));
      } else {
        setErrors((prev) => ({ ...prev, email: "Registration failed. Please try again." }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <p>Join the Career Counselling System</p>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />
        <span>{errors.name}</span>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <span>{errors.email}</span>

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            👁
          </button>
        </div>
        <span>{errors.password}</span>

        <label>Confirm Password</label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            👁
          </button>
        </div>
        <span>{errors.confirmPassword}</span>

        {serverMessage && <p className="success-message">{serverMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </button>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;