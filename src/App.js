// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import ViewUser from './pages/ViewUser';

// Courses
import Home from './pages/Courses/Home';
import SingleCourse from './pages/Courses/Single';
import CreateCourse from './pages/Courses/Create';
import EditCourse from './pages/Courses/Edit';

// Lecturers
import LecturersHome from './pages/Lecturers/Home';
import LecturersSingle from './pages/Lecturers/Single';
import LecturersCreate from './pages/Lecturers/Create';
import LecturersEdit from './pages/Lecturers/Edit';

// Enrolments
import EnrolmentsHome from './pages/Enrolments/Home';
import EnrolmentsSingle from './pages/Enrolments/Single';
import EnrolmentsCreate from './pages/Enrolments/Create';
import EnrolmentsEdit from './pages/Enrolments/Edit';

// Import components
import MyNavBar from './components/MyNavBar';
import PageNotFound from './pages/PageNotFound';

//authprovider 
import { useAuth } from './contexts/AuthProvider';
// App component
const App = () => {
  const { auth} = useAuth();

  // State to manage search term
  const [term, setTerm] = useState("");

  // Function to handle term change
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // Function to handle lecturer term change
  const handleLChange = (e) => {
    setTerm(e.target.value);
  };



  // Routes for authenticated users
  let routesProtected;

  if (auth) {
    routesProtected = (
      <>
        <Route path='/home' element={<Home term={term}  />} />
        <Route path='/courses/:id' element={<SingleCourse  />} />
        <Route path='/courses/create' element={<CreateCourse  />} />
        <Route path='/courses/:id/edit' element={<EditCourse  />} />

        <Route path='/lecturers/home' element={<LecturersHome term={term} />} />
        <Route path='/lecturers/:id' element={<LecturersSingle />} />
        <Route path='/lecturers/create' element={<LecturersCreate/>} />
        <Route path='/lecturers/:id/edit' element={<LecturersEdit  />} />

        <Route path='/enrolments/home' element={<EnrolmentsHome  />} />
        <Route path='/enrolments/:id' element={<EnrolmentsSingle  />} />
        <Route path='/enrolments/create' element={<EnrolmentsCreate  />} />
        <Route path='/enrolments/:id/edit' element={<EnrolmentsEdit  />} />
        <Route path='/user' element={<ViewUser />} />
      </>
    );
  }

  // JSX structure for the App component
  return (
   
    <Router>
      <MyNavBar handleChange={handleChange} handleLChange={handleLChange} />
      <div className='container mx-auto'>
        <Routes>
          <Route path='/' element={<Login  />} />
          <Route path='/register' element={<Register />} />
          {routesProtected}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
 
  );
};

// Export the App component
export default App;
