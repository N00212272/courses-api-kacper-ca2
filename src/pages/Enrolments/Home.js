import { useEffect, useState } from "react";
import axios from '../../config/Api';
import {useNavigate, Link} from 'react-router-dom'
import EnrolmentCard from "../../components/Enrolments/EnrolmentCard";

const Home = (auth) =>{
  const navigate = useNavigate();
  const [enrolments, setEnrolments] = useState([]);
  let token = localStorage.getItem('token')
    
  const removeEnrolments = (id) => {
    let updatedEnrolments = enrolments.filter((Enrolment) => {
        return Enrolment.id !== id;
    })
    setEnrolments(updatedEnrolments)
}

 

  useEffect(()=> {
      axios
      .get('/enrolments',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data.data)
        setEnrolments(response.data.data)
        
       
      })
      .catch(err => {
          console.error(err)
      })
  }, []);

  if(enrolments.length === 0) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  const enrolmentsList = enrolments.map((enrolment,i) => {
      return (
         <EnrolmentCard status={enrolment.status} course_id={enrolment.course_id} lecturer_id={enrolment.lecturer_id} id={enrolment.id} key={i} deleteCallback={removeEnrolments} />
      )
  })
    return (
    <>
    {(!auth) ? (
       navigate('/')
    ):(
      <>
      <Link to={`/enrolments/create`}><a className="btn btn-success text-l ">Create</a></Link>
      <h1>Enrolments</h1>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {enrolmentsList}
        
        </div>
      </>
    )}
      
    </>
    );
}
export default Home;