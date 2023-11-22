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
            <li><a>Lecturers</a></li>
            <li><a>Enrolments</a></li>
            { ( auth ) ? <li onClick={logout} className=' text-orange-600'><a>Logout</a></li>: "" }
            <li>
              <details>
                <summary>
                  Filter
                </summary>
                <ul className="p-2 bg-base-100">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    );
}
export default MyNavbar;