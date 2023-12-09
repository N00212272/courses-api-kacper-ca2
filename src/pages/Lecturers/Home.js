import { useEffect, useState } from "react";
import axios from '../../config/Api';
import {useNavigate, Link} from 'react-router-dom'
import LecturerCard from "../../components/Lecturers/LecturerCard";

const Home = ({auth,term}) =>{
  
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [searchLecturers, setSearchLecturers] = useState([]);
  
    
  const removeLecturer = (id) => {
    let updatedLecturers = lecturers.filter((lecturer) => {
        return lecturer.id !== id;
    })
    setLecturers(updatedLecturers)
}

useEffect(() => {  
  if(term.length <= 3){
    setSearchLecturers(lecturers)
 }
 else{
     let lecturerFilter = lecturers.filter((lecturer) => {
         return lecturer.name.toLowerCase().includes(term.toLowerCase());
     })
     setSearchLecturers(lecturerFilter)
 }
},[lecturers,term]);

  useEffect(()=> {
    let token = localStorage.getItem('token')
      axios
      .get('/lecturers',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // console.log(response.data.data)
          setLecturers(response.data.data)
        
      })
      .catch(err => {
          console.error(err)
      })
  }, []);
  console.log(searchLecturers)
  console.log(lecturers)
  console.log(term)
  if(lecturers.length === 0) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  


  const lecturersList = searchLecturers.map((lecturer,i) => {
      return (
         <LecturerCard name={lecturer.name} email={lecturer.email} id={lecturer.id} key={i} deleteCallback={removeLecturer} />
      )
  })
    return (
    <>
    {(!auth) ? (
       navigate('/')
    ):(
      <>
      <Link to={`/lecturers/create`}><a className="btn btn-success text-l ">Create</a></Link>
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