// Import necessary dependencies
import axios from '../config/Api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Login component
const Login = ({ auth, onAuth }) => {
  // State to manage form data
  const [form, setForm] = useState({
    email: "n00212272@gmail.com",
    password: "Secret123"
  });

  // State to manage error message
  const [errorMessage, setErrorMessage] = useState("");

  // Navigate hook from react-router-dom
  const navigate = useNavigate();

  // Click handler for login button
  const handleClick = () => {
    axios.post('/login', {
      email: form.email,
      password: form.password
    })
    .then(response => {
      // On successful login, update authentication status and token
      onAuth(true, response.data.token);
      // Redirect to the home page
      navigate('/home');
    })
    .catch(err => {
      console.error(err);
      // Set error message on login failure
      setErrorMessage(err.response.data.message);
    });
  }

  // Form change handler
  const handleLoginForm = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  // JSX structure for the Login component
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <Link to="/register">
            <p className="py-6">Please login to view current courses and other information. <b>Dont have an account? Register Now</b></p>
          </Link>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" onChange={handleLoginForm} value={form.email} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" onChange={handleLoginForm} value={form.password} name="password" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button onClick={handleClick} className="btn btn-primary">Login</button>
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Login component
export default Login;
