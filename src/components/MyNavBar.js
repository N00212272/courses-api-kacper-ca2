import {Link, useNavigate} from 'react-router-dom';

const MyNavbar = ({auth, onAuth}) => {

    const navigate = useNavigate();

    const logout = () => {
        onAuth(false);
        navigate('/');
    }
    return(
        <div className="navbar bg-base-300">
        <div className="flex-1 ml-5">
        { ( auth ) ?  <Link to="/home"><a className="btn btn-ghost text-xl">Home</a></Link>: <Link to="/"><a className="btn btn-ghost text-xl">Home</a></Link>}
        </div>
        <div className="form-control flex-1">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
          { ( auth ) ?  <Link to="/lecturers/home"><a className="btn btn-ghost text-l">Lecturers</a></Link>: <Link to="/"><a className="btn btn-ghost text-l">Lecturers</a></Link>}
          { ( auth ) ?  <Link to="/enrolments/home"><a className="btn btn-ghost text-l">Enrolments</a></Link>: <Link to="/"><a className="btn btn-ghost text-l">Enrolments</a></Link>}
            { ( auth ) ? <a onClick={logout} className='btn btn-warning text-l mr-3'>Logout</a>: "" }
            
            <select className="select select-bordered join-item">
              <option option disabled selected>Filter</option>
              <option>Sci-fi</option>
               <option>Drama</option>
              <option>Action</option>
            </select>
          </ul>
        </div>
      </div>
    );
}
export default MyNavbar;