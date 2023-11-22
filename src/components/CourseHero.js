import {Link} from 'react-router-dom';

const CourseHero = (props) => {
    return(

        <div className="hero min-h-screen bg-base-200 mt-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">{props.title}</h1>
            <p className="py-4">{props.description}</p>
            <p className="py-2"><b>Points estimation: </b>{props.points}</p>
            <p className="py-2"><b>Code: </b>{props.code}</p>
            <p className="py-2"><b>Level: </b>{props.level}</p>
          </div>
        </div>
      </div>

    );
}
export default CourseHero;