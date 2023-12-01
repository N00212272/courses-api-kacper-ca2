import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EnrolmentHero from "../../components/Enrolments/EnrolmentHero";
import axios from '../../config/Api';

const Single = () => {
    const { id } = useParams();
    const [enrolment, setEnrolment] = useState(null);

    

    useEffect(()=> {
        let token = localStorage.getItem('token');
        axios
        .get(`/enrolments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // console.log(response.data.data)
            setEnrolment(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [id]);
    if(!enrolment) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);
  
    return(
        <EnrolmentHero id={enrolment.id} status={enrolment.status} time={enrolment.time} date={enrolment.date} course={enrolment.course.title} lecturer={enrolment.lecturer.name}
         />
    )
  
}
export default Single;