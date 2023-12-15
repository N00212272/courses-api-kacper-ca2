import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useNavigate, Link } from 'react-router-dom';
import LecturerCard from "../../components/Lecturers/LecturerCard";
import { useAuth } from "../../contexts/AuthProvider";
const Home = ({ term }) => {
  const [college,image] = axios;
  const { auth } = useAuth();
  // Hook to navigate between pages
  const navigate = useNavigate();
  // State to store the list of all lecturers
  const [lecturers, setLecturers] = useState([]);
  // State to store the list of lecturers based on search term
  const [searchLecturers, setSearchLecturers] = useState([]);

  // Function to remove a lecturer from the list
  const removeLecturer = (id) => {
    let updatedLecturers = lecturers.filter((lecturer) => {
      return lecturer.id !== id;
    });
    setLecturers(updatedLecturers);
  };

  // Effect to filter lecturers based on the search term
  useEffect(() => {
    // If the search term is less than or equal to 3 characters, display all lecturers
    if (term.length <= 3) {
      setSearchLecturers(lecturers);
    } else {
      // Filter lecturers whose name includes the search term (case-insensitive)
      let lecturerFilter = lecturers.filter((lecturer) => {
        return lecturer.name.toLowerCase().includes(term.toLowerCase());
      });
      setSearchLecturers(lecturerFilter);
    }
  }, [lecturers, term]);

  // Effect to fetch the list of lecturers when the component mounts
  useEffect(() => {
    let token = localStorage.getItem('token');
    college
      .get('/lecturers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // Set the list of lecturers
        setLecturers(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // Conditional rendering based on authentication status
  if (lecturers.length === 0) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  // Mapping the list of lecturers to LecturerCard components
  const lecturersList = searchLecturers.map((lecturer, i) => {
    return (
      <LecturerCard name={lecturer.name} email={lecturer.email} id={lecturer.id} key={i} deleteCallback={removeLecturer} />
    );
  });

  // JSX for the Home component
  return (
    <>
      {(!auth) ? (
        navigate('/')
      ) : (
        <>
          <Link to={`/lecturers/create`}><a className="btn btn-success text-l mt-5 mb-3 ">Create</a></Link>
          <h1 className="text-center mb-8 text-3xl font-bold">Lecturers</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {lecturersList}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
