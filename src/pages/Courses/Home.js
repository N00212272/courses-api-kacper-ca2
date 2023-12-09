import { useEffect, useState } from "react";
import axios from '../../config/Api';
import {Link} from 'react-router-dom'
import CourseCard from "../../components/Courses/CourseCard";

function Home({auth, term}) {
  //state variables using react hook
  const [courses, setCourses] = useState([]);
  const [searchCourses, setSearchCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [user,setUser] = useState(null)
  const [alertVisible, setAlertVisible] = useState(false);
  const [criteria, setCriteria] = useState("points")
  //token to allow user to view pages
  let token = localStorage.getItem('token')

  //handles changes in the sorting order for the filter
  const handleSortOrderChange = (selectedValue) => {
    //.split is a js method for strings which splits strings into an array
    const [selectedCriteria, selectedOrder] = selectedValue.split(':');
    setCriteria(selectedCriteria);
    setSortOrder(selectedOrder);
  };

  const removeCourse = (id) => {
    let updatedCourses = courses.filter((course) => {
        return course.id !== id;
    })
    setCourses(updatedCourses)
}
  //fetch user information when component mounts
useEffect(()=> {
  axios
  .get('/user',{
    headers: {
       'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
     setUser(response.data)
     //alert to come up once user is logged in
     setAlertVisible(true);
     setTimeout(() => {
       setAlertVisible(false);
     }, 3000);
      
  })
  .catch(err => {
      console.error(err)
  })
}, []);


//filter courses by search term
useEffect(() => {  
   if(term <= 3){
    setSearchCourses(courses)
  }
  else{
      let coursesFilter = courses.filter((course) => {
          return course.title.toLowerCase().includes(term.toLowerCase());
      })
      setSearchCourses(coursesFilter)
  }
},[courses,term]);


//function to sort based on data, criteria and order
const applySort = (data, criteria, order) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    const aValue = a[criteria];
    const bValue = b[criteria];

    return order === 'asc' ? aValue - bValue : bValue - aValue;
  });
  return sortedData;
};


  useEffect(()=> {
      axios
      .get('/courses',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
  
        
          setCourses(applySort(response.data.data, criteria, sortOrder))
        
          
          
      })
      .catch(err => {
          console.error(err)
      })
  }, [sortOrder]);

  if(courses.length === 0) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);
  

  const coursesList = searchCourses.map((course,i) => {
      return (
        //component called to filter the data using props
         <CourseCard title={course.title} level={course.level} points={course.points} id={course.id} key={i} deleteCallback={removeCourse}  />
      )
  })

 //welcome message for user by name from data recieved
  let welcomeMessage = <p>welcome <b>{user.user.name}</b>, Glad to have you back </p>




if(auth){


    return (
    <>
  
       {alertVisible && (
        <div className="alert">
         {welcomeMessage}
        </div>
      )}
      <label name="sortOrder">Sort Order:</label>
      <select id="sortOrder"  onChange={(e) => handleSortOrderChange(e.target.value)}>
       <option value="points:desc">Highest-Lowest Points</option>
        <option value="points:asc">Lowest-Highest Points</option>
        <option value="level:asc">Lowest-Highest Level</option>
        <option value="level:desc">Highest-Lowest Level</option>
      </select>
      <Link to={`/courses/create`}><a className="btn btn-success text-l ">Create</a></Link>
      <h1 className="text-center mb-8 text-3xl font-bold">Courses</h1>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {coursesList}
        </div>
      
    </>
    );
  
       }
}
  
  export default Home;