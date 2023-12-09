import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
// import pages
import Login from './pages/Login';
import Register from './pages/Register';
import { Navigate } from "react-router-dom";

import ViewUser from './pages/ViewUser';
//courses
import Home from './pages/Courses/Home';
import SingleCourse from './pages/Courses/Single'
import CreateCourse from './pages/Courses/Create';
import EditCourse from './pages/Courses/Edit';

//Lecturers
import LecturersHome from './pages/Lecturers/Home';
import LecturersSingle from './pages/Lecturers/Single';
import LecturersCreate from './pages/Lecturers/Create';
import LecturersEdit from './pages/Lecturers/Edit';
//enrolments
import EnrolmentsHome from './pages/Enrolments/Home';
import EnrolmentsSingle from './pages/Enrolments/Single';
import EnrolmentsCreate from './pages/Enrolments/Create';
import EnrolmentsEdit from './pages/Enrolments/Edit';
// import components
import MyNavBar from './components/MyNavBar';


const App = () => {
  const [auth,setAuth] = useState(false);
  let routesProtected;
  
  
  const [term, setTerm] = useState("");
  
  const handleChange = (e) => {
    setTerm(e.target.value);
}
const handleLChange = (e) => {
  setTerm(e.target.value);
}
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setAuth(true);
    }
  },[])
  const onAuth = (checked , token) => {
    setAuth(checked)
    if(checked){
      localStorage.setItem('token', token)
    }
    else{
      localStorage.removeItem('token');
      setAuth(false)
    }
  }
 
  if(auth){
   
    routesProtected = (
    <>
        <Route path='/home' element={<Home term={term} auth={auth}/>} />
        <Route path='/courses/:id' element={<SingleCourse auth={auth}/>} />
        <Route path='/courses/create' element={<CreateCourse auth={auth}/>} />
        <Route path='/courses/:id/edit' element={<EditCourse auth={auth}/>} />

        <Route path='/lecturers/home' element={<LecturersHome term={term} auth={auth}/>} />
        <Route path='/lecturers/:id' element={<LecturersSingle auth={auth}/>} />
        <Route path='/lecturers/create' element={<LecturersCreate auth={auth}/>} />
        <Route path='/lecturers/:id/edit' element={<LecturersEdit auth={auth}/>} />

        <Route path='/enrolments/home' element={<EnrolmentsHome auth={auth}/>} />
        <Route path='/enrolments/:id' element={<EnrolmentsSingle auth={auth}/>} />
        <Route path='/enrolments/create' element={<EnrolmentsCreate auth={auth}/>} />
        <Route path='/enrolments/:id/edit' element={<EnrolmentsEdit auth={auth}/>} />
        <Route path='/user' element={<ViewUser />} />
    </>
    )
  }
  
  
  return (

    
          
    <Router>
      <MyNavBar handleChange={handleChange} handleLChange={handleLChange} term={term} onAuth={onAuth} auth={auth} />
      <div className='container mx-auto'>
        <Routes>  
        
          <Route path='/' element={<Login auth={auth} onAuth={onAuth}/>} />
          <Route path='/register' element={<Register onAuth={onAuth} />} />
          
         {routesProtected}
          
          
      </Routes>
      </div>
    </Router>
    

  );
}

export default App;
