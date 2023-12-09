import {Link, useNavigate, useLocation} from 'react-router-dom';

const MyNavbar = ({auth, onAuth, term ,handleChange,handleLChange}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      if(auth){
        navigate('/home');
        handleChange(e);
      }
      else{
        navigate('/')
      }
  }
  const handleLecturerChange = (e) => {
    if(auth){
      navigate('/lecturers/home');
      handleLChange(e);
    }
    else{
      navigate('/')
    }
}
  
    const logout = () => {
        onAuth(false);
        navigate('/');
    }
    return(
        <div className="navbar bg-base-300">
        <div className="flex-1 ml-5">
        { ( auth ) ?  <Link to="/home"><a className="btn btn-ghost text-xl">Home</a></Link>: <Link to="/"><a className="btn btn-ghost text-xl">Home</a></Link>}
        </div>
        {location.pathname === "/home" &&(
          <div className='flex-1 ml-5'>
        <input type='text' placeholder="Search a Course...." onChange={handleInputChange} value={term} auth={auth}/>
        </div>
        )}
         {location.pathname === "/lecturers/home" &&(
          <div className='flex-1 ml-5'>
        <input type='text' placeholder="Search a lecturer...." onChange={handleLecturerChange} value={term} auth={auth}/>
        </div>
        )}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
          { ( auth ) ?  <Link to="/lecturers/home"><a className="btn btn-ghost text-l">Lecturers</a></Link>: <Link to="/"><a className="btn btn-ghost text-l">Lecturers</a></Link>}
          { ( auth ) ?  <Link to="/enrolments/home"><a className="btn btn-ghost text-l">Enrolments</a></Link>: <Link to="/"><a className="btn btn-ghost text-l">Enrolments</a></Link>}
            { ( auth ) ? <a onClick={logout} className='btn btn-warning text-l mr-3'>Logout</a>: "" }
            {(auth)?<div className="avatar online">
            <div className="w-12 rounded-full">
            <Link to='/user'> <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /></Link>
             </div>
            </div>:<div className="avatar offline">
           <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>}
            

          
          </ul>
        </div>
      </div>
    );
}
export default MyNavbar;