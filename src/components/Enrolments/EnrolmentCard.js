
import { Link} from 'react-router-dom';
const EnrolmentCard = (props) => {
    return(

        <div className="card w-96 base-content shadow-xl  ">
            <div className="card-body">
                <h2 className="card-title">{props.status}</h2>
                     <p>{props.course_id}</p>
                     <p>{props.lecturer_id}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/enrolments/${props.id}`}><button className="btn btn-primary">More info</button></Link>
                        </div>
                        
            </div>
        </div>
       

    );
}
export default EnrolmentCard;