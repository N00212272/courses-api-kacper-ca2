// Import necessary dependencies
import axios from '../config/Api';
import { useState, useEffect } from 'react';

// ViewUser component
const ViewUser = () => {
  const [college,image] = axios;
  // State to manage user data
  const [user, setUser] = useState(null);

  // Get the token from local storage
  let token = localStorage.getItem('token');

  // Effect hook to fetch user data
  useEffect(() => {
    college
      .get('/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // JSX structure for the ViewUser component
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-4">Users name: {user?.name}</h1>
        <p className="text-gray-600"><b>Current Email: </b>{user?.email}</p>
      </div>
    </div>
  );
};

// Export the ViewUser component
export default ViewUser;
