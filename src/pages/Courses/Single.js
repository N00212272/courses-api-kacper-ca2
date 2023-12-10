import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseHero from "../../components/Courses/CourseHero";
import axios from '../../config/Api';

const Single = () => {
    // Get the 'id' parameter from the URL using useParams hook
    const { id } = useParams();

    // State to hold the course data
    const [course, setCourse] = useState(null);

    // Retrieve the token from localStorage
    let token = localStorage.getItem('token');

    // Fetch course data from the API using Axios and update state
    useEffect(() => {
        axios
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

    // If course data is not yet available, show a loading spinner
    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity"></span>
            </div>
        );
    }

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
            />
        </>
    );
}

export default Single;
