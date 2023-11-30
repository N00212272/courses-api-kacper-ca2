import { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import LecturerCard from "../../components/Lecturers/LecturerCard";

const Home = (auth) =>{
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  let token = localStorage.getItem('token')
    
//   const removeLecturer = (id) => {
//     let updatedLecturers = lecturers.filter((lecturer) => {
//         return lecturer.id !== id;
//     })
//     setLecturers(updatedLecturers)
// }

 

  useEffect(()=> {
      axios
      .get('https://college-api.vercel.app/api/lecturers',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data.data)
          setLecturers(response.data.data)
      })
      .catch(err => {
          console.error(err)
      })
  }, []);

  if(lecturers.length === 0) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  const lecturersList = lecturers.map((lecturer,i) => {
      return (
         <LecturerCard name={lecturer.name} email={lecturer.email} id={lecturer.id} key={i}  />
      )
  })
    return (
    <>
    {(!auth) ? (
       navigate('/')
    ):(
      <>
      <Link to={`/enrolments/create`}><a className="btn btn-success text-l ">Create</a></Link>
      <h1>Lecturers</h1>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {lecturersList}
        </div>
      </>
    )}
      
    </>
    );
}
export default Home;