import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EnrolmentHero from "../../components/Enrolments/EnrolmentHero";
import axios from '../../config/Api';

const Single = () => {
    // Access the 'id' parameter from the route
    const { id } = useParams();

    // State to store enrolment data
    const [enrolment, setEnrolment] = useState(null);

    // Fetch enrolment data from the API
    useEffect(() => {
        let token = localStorage.getItem('token');

        axios
            .get(`/enrolments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                // Update state with enrolment data
                setEnrolment(response.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    // Display loading spinner while data is being fetched
    if (!enrolment) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity"></span>
            </div>
        );
    }

    // Render the EnrolmentHero component with enrolment data
    return (
        <EnrolmentHero
            id={enrolment.id}
            status={enrolment.status}
            time={enrolment.time}
            date={enrolment.date}
            lecturer_id={enrolment.lecturer_id}
            course_id={enrolment.course_id}
            course={enrolment.course.title}
            lecturer={enrolment.lecturer.name}
        />
    );
};

export default Single;
