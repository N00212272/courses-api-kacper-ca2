import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseHero from "../../components/Courses/CourseHero";
import axios from '../../config/Api';

const Single = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(()=> {
        axios
        .get(`/courses/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // console.log(response.data.data)
            setCourse(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [id]);
    if(!course) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

    return(
        <CourseHero title={course.title} code={course.code} description={course.description} level={course.level} points={course.points}  id={course.id} data={course} />
    )
}
export default Single;