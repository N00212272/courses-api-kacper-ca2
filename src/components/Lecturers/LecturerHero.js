import DeleteBtn from '../DeleteBtn';
import { useNavigate, Link } from 'react-router-dom';

const LecturerHero = (props) => {
  const navigate = useNavigate();
    return(

        <div className="hero min-h-screen bg-base-200 mt-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold mb-3">{props.name}</h1>
            <p className="py-2"><b>Address: </b>{props.address}</p>
            <p className="py-2"><b>email: </b>{props.email}</p>
            <p className="py-2"><b>phone: </b>{props.phone}</p>
            <ul className='flex'>
            <li className='mr-2'><DeleteBtn id={props.id} resource="lecturers" data={props.data}deleteCallback={() => navigate('/lecturers/home')} /></li>
            <li><Link to={`/lecturers/${props.id}/edit`}><button className='btn btn-info text-l'>Edit</button></Link></li>
            </ul>
          </div>
        </div>
      </div>

    );
}
export default LecturerHero;