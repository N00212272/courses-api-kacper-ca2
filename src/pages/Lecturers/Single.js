import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LecturerHero from "../../components/Lecturers/LecturerHero";
import axios from '../../config/Api';

const Single = () => {
    const { id } = useParams();
    const [lecturer, setLecturer] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(()=> {
        axios
        .get(`/lecturers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // console.log(response.data.data)
            setLecturer(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [id]);
    if(!lecturer) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

    return(
        <LecturerHero id={lecturer.id} name={lecturer.name} address={lecturer.address} email={lecturer.email} phone={lecturer.phone} data={lecturer}
         />
    )
}
export default Single;