import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
// import pages
import Login from './pages/Login';
import Home from './pages/Courses/Home';

import SingleCourse from './pages/Courses/Single'
// import components
import MyNavBar from './components/MyNavBar';


const App = () => {
  const [auth,setAuth] = useState(false);
  let routesProtected;
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
    }
  }
  if(auth){
    routesProtected = (
    <>
        <Route path='/home' element={<Home auth={auth}/>} />
    </>
    )
  }
  return (

    
          
    <Router>
      <MyNavBar onAuth={onAuth} auth={auth} />
      <div className='container mx-auto'>
        <Routes>  
        
          <Route path='/' element={<Login auth={auth} onAuth={onAuth}/>} />
          <Route path='/home' element={<Home auth={auth}/>} />
          <Route path='/courses/:id' element={<SingleCourse auth={auth}/>} />
      </Routes>
      </div>
    </Router>
    

  );
}

export default App;
