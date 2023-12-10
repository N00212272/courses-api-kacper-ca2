import { Link, useNavigate, useLocation } from 'react-router-dom';

const MyNavbar = ({ auth, onAuth, term, handleChange, handleLChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle input change for courses
  const handleInputChange = (e) => {
    if (auth) {
      navigate('/home');
      handleChange(e);
    } else {
      navigate('/');
    }
  };

  // Function to handle input change for lecturers
  const handleLecturerChange = (e) => {
    if (auth) {
      navigate('/lecturers/home');
      handleLChange(e);
    } else {
      navigate('/');
    }
  };

  // Function to handle logout
  const logout = () => {
    onAuth(false);
    navigate('/');
  };

  return (
    <div className="navbar bg-secondary">
      <div className="flex-1 ml-5">
        {/* Conditionally render Home link based on auth status */}
        {auth ? (
          <Link to="/home">
            <a className="btn btn-ghost text-xl text-white">Home</a>
          </Link>
        ) : (
          <Link to="/">
            <a className="btn btn-ghost text-xl text-white">Home</a>
          </Link>
        )}
      </div>
      {location.pathname === '/home' && (
        <div className='flex-1 ml-5'>
          {/* Input for searching courses */}
          <input
            type='text'
            placeholder="Search a Course...."
            onChange={handleInputChange}
            value={term}
            auth={auth}
          />
        </div>
      )}
      {location.pathname === '/lecturers/home' && (
        <div className='flex-1 ml-5'>
          {/* Input for searching lecturers */}
          <input
            type='text'
            placeholder="Search a lecturer...."
            onChange={handleLecturerChange}
            value={term}
            auth={auth}
          />
        </div>
      )}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white">
          {/* Conditionally render Lecturers and Enrolments links based on auth status */}
          {auth ? (
            <Link to="/lecturers/home">
              <a className="btn btn-ghost text-l">Lecturers</a>
            </Link>
          ) : (
            <Link to="/">
              <a className="btn btn-ghost text-l">Lecturers</a>
            </Link>
          )}
          {auth ? (
            <Link to="/enrolments/home">
              <a className="btn btn-ghost text-l">Enrolments</a>
            </Link>
          ) : (
            <Link to="/">
              <a className="btn btn-ghost text-l">Enrolments</a>
            </Link>
          )}
          {auth ? (
            // Logout button for authenticated users
            <a onClick={logout} className='btn btn-warning text-l mr-3'>
              Logout
            </a>
          ) : (
            ''
          )}
          {auth ? (
            // Avatar for authenticated users
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <Link to='/user'>
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user-avatar" />
                </Link>
              </div>
            </div>
          ) : (
            // Avatar for non-authenticated users
            <div className="avatar offline">
              <div className="w-12 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user-avatar" />
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyNavbar;
