// Import necessary dependencies
import axios from '../config/Api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
// Register component
const Register = () => {
  const [college,image] = axios;
  const { onAuth } = useAuth();

  // State to manage form data
  const [form, setForm] = useState({});

  // Navigation hook
  const navigate = useNavigate();

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle registration process
  const handleClick = () => {
    college.post('/register', {
      name: form.name,
      email: form.email,
      password: form.password
    })
      .then(response => {
        onAuth(true, response.data.token);
        navigate('/home');
      })
      .catch(err => {
        console.error(err);
        setErrorMessage(err.response.data.message);
        
        // If a user tries to use an email which is already taken, this message will come up
        if (err.response.status === 422) {
          setErrorMessage("This email has already been used");
        }
      });
  };

  // Function to handle form input changes
  const handleRegisterForm = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // JSX structure for the Register component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Now!</h1>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-600">Name</span>
          </label>
          <input type="name" name="name" onChange={handleRegisterForm} value={form.name} className="input input-bordered w-full" required />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-600">Email</span>
          </label>
          <input type="email" name="email" onChange={handleRegisterForm} value={form.email} className="input input-bordered w-full" required />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-600">Password</span>
          </label>
          <input type="password" onChange={handleRegisterForm} value={form.password} name="password" className="input input-bordered w-full" required />
        </div>

        <div className="form-control mt-6">
          <button onClick={handleClick} className="btn btn-primary w-full">Register</button>
          {/* Display error message, if any */}
          <p className="text-red-500 mt-2">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

// Export the Register component
export default Register;
