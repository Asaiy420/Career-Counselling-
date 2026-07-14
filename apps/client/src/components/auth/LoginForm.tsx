import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import AuthHero from './AuthHero';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error on change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    let valid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage('');
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      // Handle "Remember Me" locally (simulated setting)
      if (rememberMe) {
        localStorage.setItem('savedEmail', formData.email.trim());
      } else {
        localStorage.removeItem('savedEmail');
      }

      setServerMessage(response.data.message || 'Login successful!');
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard', { state: { userName: response.data.user.name } });
      }, 800);

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setSubmitError(error.response?.data.message);
      } else {
        setSubmitError('Login failed. Please verify your credentials and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Form Panel */}
      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          {/* Logo Space - Left blank as requested with optional text for visual balance */}
          <div className="auth-logo-container">
            <span className="auth-logo-text">
              SkillHive Digital
              <span className="auth-logo-dot" />
            </span>
          </div>

          <h1 className="auth-heading">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue your career journey.</p>

          {/* Form-Level Status Messages */}
          {submitError && (
            <div className="auth-alert auth-alert-error" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{submitError}</span>
            </div>
          )}

          {serverMessage && (
            <div className="auth-alert auth-alert-success" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>{serverMessage}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">Email Address</label>
              <div className="auth-input-container">
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="name@example.com"
                  className={`auth-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="email"
                  required
                />
              </div>
              {errors.email && <span className="auth-error-text" id="email-error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <div className="auth-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  className={`auth-input auth-input-with-icon ${errors.password ? 'has-error' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(prev => !prev)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="auth-error-text" id="password-error">{errors.password}</span>}
            </div>

            {/* Checkbox and link options */}
            <div className="auth-options">
              <label className="auth-checkbox-label" htmlFor="login-remember">
                <input
                  type="checkbox"
                  id="login-remember"
                  className="auth-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isSubmitting}
                />
                <span>Remember Me</span>
              </label>
              
              <a 
                href="#forgot" 
                className="auth-forgot-link" 
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password recovery flow would launch here.");
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="auth-spinner" aria-hidden="true" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Form Switch Footer */}
          <p className="auth-footer">
            Don't have an account?
            <a href="/register">Register</a>
          </p>
        </div>
      </section>

      {/* Right Hero Panel */}
      <AuthHero />
    </div>
  );
}

export default LoginForm;
