import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseHero from "../../components/Courses/CourseHero";
import axios from '../../config/Api';

const Single = () => {
    const [college, image] = axios;
    const imageKey = "ym4N46cTECeFkNnysx3JydSymSxrPzWz3uQSpiFFZp4NxiFkdQj6J9EF";
    // Get the 'id' parameter from the URL using useParams hook
    const { id } = useParams();

    // State to hold the course data
    const [course, setCourse] = useState(null);
    //state to hold image
    const [backgroundImage, setBackgroundImage] = useState(null)
    // Retrieve the token from localStorage
    let token = localStorage.getItem('token');
 
    

    // Fetch course data from the API using Axios and update state
    useEffect(() => {
        college
            .get(`/courses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                // Update state with the fetched course data
                setCourse(response.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id, token]);
     //fetch image in relation to the title
     useEffect(() => {
        if (course) {
            image
                .get(`${course.title}`, {
                    headers: {
                        'Authorization': `${imageKey}`
                    }
                })
                .then(response => {
                    setBackgroundImage(response.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [imageKey, course]);

    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity"></span>
            </div>
        );
    }
  
console.log(backgroundImage)
    // Extract enrolment IDs from the course data
    const enrolmentIds = Object.values(course.enrolments).map(enrolment => enrolment.id);

    return (
        <>
            {/* Render the CourseHero component with course details */}
            <CourseHero
                title={course.title}
                code={course.code}
                description={course.description}
                level={course.level}
                points={course.points}
                id={course.id}
                data={course}
                enrolments={enrolmentIds}
                backgroundImage={backgroundImage && backgroundImage.photos && backgroundImage.photos[0].src.landscape}
            />
        </>
    );
}

export default Single;
