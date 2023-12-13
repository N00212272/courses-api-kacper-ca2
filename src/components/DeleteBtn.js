import axios from 'axios';
import { useState } from 'react';

export default function DeleteBtn({ id, deleteCallback, resource, data }) {
  // State to manage the confirmation
  const [count, setCount] = useState(0);

  // Function to handle 'Yes' click
  const handleYes = () => {
    onFinalDelete();
    setCount(0);
  };

  // Function to handle 'No' click
  const handleNo = () => {
    setCount(0);
  };

  // Function to handle the deletion
  const onDelete = () => {
    let token = localStorage.getItem('token');
    axios
      .delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        deleteCallback(id);
        setCount(0);
      })
      .catch(err => {
        console.log(err, "DELETION ON COURSE/LECTURER");
      });
  };

  // Function to delete associated enrolments
  const onDeleteEnrolments = () => {
    let token = localStorage.getItem('token');
    data.enrolments.forEach(enrolment => {
      axios
        .delete(`https://college-api.vercel.app/api/enrolments/${enrolment.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .catch(error => {
          console.log(error, "DELETION ON ENROLMENT");
        });
    });
    onDelete();
  };

  // Function to handle the final deletion
  const onFinalDelete = () => {
    // Check if data.enrolments is an array and not empty
    if (data && Array.isArray(data.enrolments) && data.enrolments.length > 0) {
      onDeleteEnrolments();
    } else {
      onDelete();
    }
  };

  return (
    <div>
      {/* Simple condition to display different content based on the count */}
      {count === 0 ? (
        <button className='btn btn-error text-l' onClick={() => setCount(1)}>
          Delete
        </button>
      ) : (
        <div>
          <alert className="mr-2">Are you sure you want to delete?</alert>
          <button className='btn btn-error mr-2' onClick={handleYes}>
            Yes
          </button>
          <button className='btn btn-success' onClick={handleNo}>
            No
          </button>
        </div>
      )}
    </div>
  );
}
