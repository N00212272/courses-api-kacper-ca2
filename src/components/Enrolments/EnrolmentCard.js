
import { Link} from 'react-router-dom';
const EnrolmentCard = (props) => {
    return(
        
        <div className="card base-content shadow-xl rounded-badge ">
            
            <div className="card-body">
                <h2 className="card-title">{props.status}</h2>
                     <p><b>Course: </b>{props.course}</p>
                     <p><b>Lecturer: </b>{props.lecturer}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/enrolments/${props.id}`}><button className="btn btn-primary">More info</button></Link>
                        </div>
                        
            </div>
         
        </div>
    

    );
}
export default EnrolmentCard;