import { useEffect, useState } from "react";
import axios from '../../config/Api';
import {useNavigate, Link} from 'react-router-dom'
import CourseCard from "../../components/Courses/CourseCard";

function Home({auth}) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  let token = localStorage.getItem('token')
    
  const removeCourse = (id) => {
    let updatedCourses = courses.filter((course) => {
        return course.id !== id;
    })
    setCourses(updatedCourses)
}

 

  useEffect(()=> {
      axios
      .get('/courses',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
          setCourses(response.data.data)
      })
      .catch(err => {
          console.error(err)
      })
  }, []);

  if(courses.length === 0) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  const coursesList = courses.map((course,i) => {
      return (
         <CourseCard title={course.title} code={course.code} id={course.id} key={i} deleteCallback={removeCourse}  />
      )
  })
    return (
    <>
    {(!auth) ? (
       navigate('/')
    ):(
      <>
      <Link to={`/courses/create`}><a className="btn btn-success text-l ">Create</a></Link>
      <h1>Courses</h1>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {coursesList}
        </div>
      </>
    )}
      
    </>
    );
  }
  
  export default Home;