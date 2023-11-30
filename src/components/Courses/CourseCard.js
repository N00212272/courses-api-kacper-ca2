
import { Link} from 'react-router-dom';
const CourseCard = (props) => {
    return(

        <div className="card w-96 base-content shadow-xl  ">
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
                     <p>{props.code}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/courses/${props.id}`}><button className="btn btn-primary">More info</button></Link>
                        </div>
                        
            </div>
        </div>
       

    );
}
export default CourseCard;