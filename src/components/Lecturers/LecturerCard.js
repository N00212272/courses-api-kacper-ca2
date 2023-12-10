
import { Link} from 'react-router-dom';
const LecturerCard = (props) => {
    return(

        <div className="card w-96 base-content shadow-xl rounded-badge  ">
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                     <p>{props.email}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/lecturers/${props.id}`}><button className="btn btn-primary">More info</button></Link>
                        </div>
                        
            </div>
        </div>
       

    );
}
export default LecturerCard;