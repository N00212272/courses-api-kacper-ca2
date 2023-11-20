import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import pages
import Home from './pages/Home';

// import components
import MyNavBar from './components/MyNavBar';


const App = () => {
  return (

    <div className='container mx-auto'>
          
    <Router>
      <MyNavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />   
      </Routes>
    </Router>
    </div>

  );
}

export default App;
