import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State variables for user credentials and "remember me" toggle
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);

  // State to track error messages
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  // Handler for changes in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked); // Update checkbox state
    } else if (name === 'email') {
      setEmail(value); // Update email state
    } else if (name === 'password') {
      setPassword(value); // Update password state
    }
  };

  // Navigate to registration page
  const handleRegisterClick = () => {
    navigate('/createaccount');
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior
    setError(''); // Clear previous errors

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Set login URL based on "remember me"
    const loginUrl = rememberme
      ? 'https://localhost:5000/login?useCookies=true'
      : 'https://localhost:5000/login?useSessionCookies=true';

    try {
      // Send POST request to login endpoint
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // Send and receive cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Parse response body only if content exists
      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      // If login fails, throw an error with message
      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      // Redirect to authenticated page on success
      navigate('/competition');
    } catch (error: any) {
      // Show login failure message
      setError(error.message || 'Error logging in.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>

              {/* Remember me checkbox */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberme"
                  name="rememberme"
                  checked={rememberme}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberme">
                  Remember password
                </label>
              </div>

              {/* Submit login button */}
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>

              {/* Create account button */}
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={handleRegisterClick}
                >
                  Create Account
                </button>
              </div>

              <hr className="my-4" />

              {/* Placeholder buttons for social auth */}
              <div className="d-grid mb-2">
                <button
                  className="btn btn-google btn-login text-uppercase fw-bold"
                  type="button"
                >
                  <i className="fa-brands fa-google me-2"></i> Sign in with
                  Google
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-facebook btn-login text-uppercase fw-bold"
                  type="button"
                >
                  <i className="fa-brands fa-facebook-f me-2"></i> Sign in with
                  Facebook
                </button>
              </div>
            </form>

            {/* Show error if exists */}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
