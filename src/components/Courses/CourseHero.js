import DeleteBtn from '../DeleteBtn';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const CourseHero = (props) => {
  // Hook for navigation
  const navigate = useNavigate();
  // State to track the selected enrolment
  const [selectedEnrolment, setSelectedEnrolment] = useState(null);

  // Function to handle selecting an enrolment
  const handleEnrolmentSelect = (enrolment) => {
    setSelectedEnrolment(enrolment);
  };

  // Function to handle viewing the selected enrolment
  const handleViewEnrolment = () => {
    // Navigate to the selected enrolment if it exists
    if (selectedEnrolment) {
      navigate(`/enrolments/${selectedEnrolment}`);
    }
  };

  return (
    <div className="hero min-h-screen base-content shadow-xl mt-5 rounded-box">
      <div className="hero-content flex-col lg:flex-row-reverse">
      {(props.backgroundImage)?(<img src={props.backgroundImage} className="max-w-sm rounded-lg shadow-2xl"/>):(<div className="max-w-sm rounded-lg shadow-2xl">
        <p>No image available</p>
      </div>)}
   
        <div>
          {/* Course details */}
          <h1 className="text-5xl font-bold py-4">{props.title}</h1>
          <p className="py-2"><b>About this course: </b>{props.description}</p>
          <p className="py-2"><b>Points estimation: </b>{props.points}</p>
          <p className="py-2"><b>Code: </b>{props.code}</p>
          <p className="py-2"><b>Level: </b>{props.level}</p>

          
          {/* Enrolment Dropdown and View Button */}
          {props.enrolments.length <= 0 ? (
  <Link to={'/enrolments/create'}><p className='mb-2'><b>Looks like there are no enrolments</b>Add an Enrolment</p></Link>
) : (
  <div className="flex py-2">
    <label name="enrolmentDropdown" className="mr-2 py-3"><b>Enrolment ID: </b></label>
    <select
      onChange={(e) => handleEnrolmentSelect(e.target.value)}
      value={selectedEnrolment || ''}
    >
      <option value="" disabled>Select Enrolment</option>
      {/* Map through enrolments and create options */}
      {props.enrolments.map(enrolment => (
        <option key={enrolment} value={enrolment}>{enrolment}</option>
      ))}
    </select>

    {/* View Enrolment Button */}
    <button onClick={handleViewEnrolment} className="btn btn-info text-sm ml-2">
      View
    </button>
  </div>
)}


          {/* Edit and Delete Buttons */}
          <ul className='flex'>
            <li className='mr-2'><DeleteBtn id={props.id} resource="courses" data={props.data} deleteCallback={() => navigate('/home')} /></li>
            <li><Link to={`/courses/${props.id}/edit`}><button className='btn btn-info text-l'>Edit</button></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
