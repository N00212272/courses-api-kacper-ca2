import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useNavigate, Link } from 'react-router-dom';
import EnrolmentCard from "../../components/Enrolments/EnrolmentCard";

const Home = (auth) => {
  const navigate = useNavigate();
  const [enrolments, setEnrolments] = useState([]);
  let token = localStorage.getItem('token');

  // Function to remove enrolment from the list
  const removeEnrolments = (id) => {
    let updatedEnrolments = enrolments.filter((enrolment) => {
      return enrolment.id !== id;
    });
    setEnrolments(updatedEnrolments);
  };

  // Fetch enrolments data from the API
  useEffect(() => {
    axios
      .get('/enrolments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setEnrolments(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // Display loading spinner while data is being fetched
  if (enrolments.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity"></span>
      </div>
    );
  }

  // Map enrolments data to EnrolmentCard components
  const enrolmentsList = enrolments.map((enrolment, i) => {
    return (
      <EnrolmentCard
        status={enrolment.status}
        course={enrolment.course.title}
        lecturer={enrolment.lecturer.name}
        id={enrolment.id}
        key={i}
        deleteCallback={removeEnrolments}
      />
    );
  });

  return (
    <>
      {!auth ? (
        navigate('/')
      ) : (
        <>
          <Link to={`/enrolments/create`}><a className="btn btn-success text-l ">Create</a></Link>
          <h1 className="text-center mb-8 text-3xl font-bold">Enrolments</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {enrolmentsList}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
