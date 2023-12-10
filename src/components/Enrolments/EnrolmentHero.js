import DeleteBtn from '../DeleteBtn';
import { useNavigate, Link } from 'react-router-dom';

const EnrolmentHero = (props) => {
  // Access the useNavigate hook
  const navigate = useNavigate();

  // JSX structure for EnrolmentHero component
  return (
    <div className="hero min-h-screen base-content shadow-xl mt-5 rounded-box ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-5xl font-bold">{props.status}</h1>
          <Link to={`/courses/${props.course_id}`}>
            <p className="py-4">
              <b>Course: </b> {props.course}
            </p>
          </Link>
          <Link to={`/lecturers/${props.lecturer_id}`}>
            <p className="py-2">
              <b>Lecturer: </b> {props.lecturer}
            </p>
          </Link>
          <p className="py-2">
            <b>date: </b>
            {props.date}
          </p>
          <p className="py-2">
            <b>time: </b>
            {props.time}
          </p>
          <ul className="flex">
            <li className="mr-2">
              {/* DeleteBtn component with props */}
              <DeleteBtn id={props.id} resource="enrolments" deleteCallback={() => navigate('/enrolments/home')} />
            </li>
            <li>
              {/* Link to edit page */}
              <Link to={`/enrolments/${props.id}/edit`}>
                <button className="btn btn-info text-l">Edit</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnrolmentHero;
