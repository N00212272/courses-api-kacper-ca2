import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { Link } from 'react-router-dom';
import CourseCard from "../../components/Courses/CourseCard";
import { useAuth } from "../../contexts/AuthProvider";
function Home({term }) {
  const { auth } = useAuth();
  // State variables using React hooks
  const [courses, setCourses] = useState([]);
  const [searchCourses, setSearchCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [user, setUser] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [criteria, setCriteria] = useState("points");

  // Token to allow the user to view pages
  let token = localStorage.getItem('token');

  // Handles changes in the sorting order for the filter
  const handleSortOrderChange = (selectedValue) => {
    const [selectedCriteria, selectedOrder] = selectedValue.split(':');
    setCriteria(selectedCriteria);
    setSortOrder(selectedOrder);
  };

  // Remove a course from the list
  const removeCourse = (id) => {
    let updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  // Fetch user information when the component mounts
  useEffect(() => {
    axios
      .get('/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
        // Alert to come up once the user is logged in
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // Filter courses by search term
  useEffect(() => {
    if (term <= 3) {
      setSearchCourses(courses);
    } else {
      let coursesFilter = courses.filter((course) =>
        course.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchCourses(coursesFilter);
    }
  }, [courses, term]);

  // Function to sort based on data, criteria, and order
  const applySort = (data, criteria, order) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const aValue = a[criteria];
      const bValue = b[criteria];
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });
    return sortedData;
  };

  useEffect(() => {
    axios
      .get('/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setCourses(applySort(response.data.data, criteria, sortOrder));
      })
      .catch(err => {
        console.error(err);
      });
  }, [sortOrder, criteria, token]);

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity"></span>
      </div>
    );
  }

  const coursesList = searchCourses.map((course, i) => (
    <CourseCard
      title={course.title}
      level={course.level}
      points={course.points}
      id={course.id}
      key={i}
      deleteCallback={removeCourse}
    />
  ));

  // Welcome message for the user by name from data received
  let welcomeMessage = <p>Welcome <b>{user?.user?.name}</b>, Glad to have you back</p>;

  if (auth) {
    return (
      <>
        {alertVisible && (
          <div className="alert">
            {welcomeMessage}
          </div>
        )}
        <div className="mt-5 mb-3">
          <label htmlFor="sortOrder">Sort Order: </label>
          <select id="sortOrder" onChange={(e) => handleSortOrderChange(e.target.value)}>
            <option value="points:desc"><b>Highest-Lowest Points</b></option>
            <option value="points:asc"><b>Lowest-Highest Points</b></option>
            <option value="level:asc"><b>Lowest-Highest Level</b></option>
            <option value="level:desc"><b>Highest-Lowest Level</b></option>
          </select>
        </div>
        <Link to={`/courses/create`}><a className="btn btn-success text-l">Create</a></Link>
        <h1 className="text-center mb-8 text-3xl font-bold">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {coursesList}
        </div>
      </>
    );
  }
}

export default Home;
