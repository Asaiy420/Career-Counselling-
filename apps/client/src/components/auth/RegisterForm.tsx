import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import AuthHero from './AuthHero';
import { API_BASE } from '../../api';

const passwordPolicy = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error on change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    };

    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!passwordPolicy.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, and include one uppercase letter, one number, and one special character (@#$/etc.)';
      valid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
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

    try {
      const response = await axios.post(
        `${API_BASE}/auth/register`,
        {
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      setServerMessage(
        response.data.message || 'Account created successfully!'
      );

      // Navigate to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard', {
          state: { userName: response.data.user.name },
        });
      }, 800);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setSubmitError(error.response?.data.message);
      } else {
        setSubmitError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='auth-container'>
      {/* Left Form Panel */}
      <section className='auth-form-section'>
        <div className='auth-form-wrapper'>
          {/* Logo Space - Left blank as requested with optional text for visual balance */}
          <div className='auth-logo-container'>
            <span className='auth-logo-text'>
              SkillHive Digital
              <span className='auth-logo-dot' />
            </span>
          </div>

          <h1 className='auth-heading'>Create Account</h1>
          <p className='auth-subtitle'>
            Join us to start planning and navigating your professional pathways.
          </p>

          {/* Form-Level Status Messages */}
          {submitError && (
            <div className='auth-alert auth-alert-error' role='alert'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
                style={{ flexShrink: 0 }}
              >
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='8' x2='12' y2='12' />
                <line x1='12' y1='16' x2='12.01' y2='16' />
              </svg>
              <span>{submitError}</span>
            </div>
          )}

          {serverMessage && (
            <div className='auth-alert auth-alert-success' role='alert'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
                style={{ flexShrink: 0 }}
              >
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              <span>{serverMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form className='auth-form' onSubmit={handleSubmit} noValidate>
            <div className='auth-field'>
              <label className='auth-label' htmlFor='register-name'>
                Full Name
              </label>
              <div className='auth-input-container'>
                <input
                  type='text'
                  id='register-name'
                  name='name'
                  placeholder='John Doe'
                  className={`auth-input ${errors.name ? 'has-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete='name'
                  required
                />
              </div>
              {errors.name && (
                <span className='auth-error-text' id='name-error'>
                  {errors.name}
                </span>
              )}
            </div>

            <div className='auth-field'>
              <label className='auth-label' htmlFor='register-email'>
                Email Address
              </label>
              <div className='auth-input-container'>
                <input
                  type='email'
                  id='register-email'
                  name='email'
                  placeholder='name@example.com'
                  className={`auth-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete='email'
                  required
                />
              </div>
              {errors.email && (
                <span className='auth-error-text' id='email-error'>
                  {errors.email}
                </span>
              )}
            </div>

            <div className='auth-form-row'>
              <div className='auth-field'>
                <label className='auth-label' htmlFor='register-password'>
                  Password
                </label>
                <div className='auth-input-container'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='register-password'
                    name='password'
                    placeholder='Create password'
                    className={`auth-input auth-input-with-icon ${errors.password ? 'has-error' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete='new-password'
                    required
                  />
                  <button
                    type='button'
                    className='auth-password-toggle'
                    onClick={() => setShowPassword(prev => !prev)}
                    disabled={isSubmitting}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                        <line x1='1' y1='1' x2='23' y2='23' />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                        <circle cx='12' cy='12' r='3' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className='auth-field'>
                <label
                  className='auth-label'
                  htmlFor='register-confirm-password'
                >
                  Confirm Password
                </label>
                <div className='auth-input-container'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='register-confirm-password'
                    name='confirmPassword'
                    placeholder='Repeat password'
                    className={`auth-input auth-input-with-icon ${errors.confirmPassword ? 'has-error' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete='new-password'
                    required
                  />
                  <button
                    type='button'
                    className='auth-password-toggle'
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    disabled={isSubmitting}
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                        <line x1='1' y1='1' x2='23' y2='23' />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                        <circle cx='12' cy='12' r='3' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Display errors under the password fields collectively to keep the grid balanced */}
            {(errors.password || errors.confirmPassword) && (
              <div style={{ marginTop: '-12px' }}>
                {errors.password && (
                  <div className='auth-error-text' id='password-error'>
                    {errors.password}
                  </div>
                )}
                {errors.confirmPassword && (
                  <div className='auth-error-text' id='confirm-password-error'>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            {/* Terms and Conditions Checkbox */}
            <div
              className='auth-options'
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6px',
              }}
            >
              <label className='auth-checkbox-label' htmlFor='register-terms'>
                <input
                  type='checkbox'
                  id='register-terms'
                  className='auth-checkbox'
                  checked={acceptTerms}
                  onChange={e => {
                    setAcceptTerms(e.target.checked);
                    if (e.target.checked && errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  disabled={isSubmitting}
                />
                <span style={{ fontSize: '0.85rem' }}>
                  I agree to the{' '}
                  <a
                    href='#terms'
                    className='auth-inline-link'
                    onClick={e => e.preventDefault()}
                  >
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href='#privacy'
                    className='auth-inline-link'
                    onClick={e => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <span className='auth-error-text' id='terms-error'>
                  {errors.terms}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='auth-submit-btn'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className='auth-spinner' aria-hidden='true' />
                  Creating account...
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Form Switch Footer */}
          <p className='auth-footer'>
            Already have an account?
            <a href='/login'>Login</a>
          </p>
        </div>
      </section>

      {/* Right Hero Panel */}
      <AuthHero />
    </div>
  );
}

export default RegisterForm;
