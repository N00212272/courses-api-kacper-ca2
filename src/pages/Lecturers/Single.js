import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LecturerHero from "../../components/Lecturers/LecturerHero";
import axios from '../../config/Api';

const Single = () => {
  const [college,image] = axios;
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  // State to store the details of a single lecturer
  const [lecturer, setLecturer] = useState(null);
  // Retrieving the user token from localStorage
  let token = localStorage.getItem('token');
  const [backgroundImage, setBackgroundImage] = useState(null)
  const imageKey = "ym4N46cTECeFkNnysx3JydSymSxrPzWz3uQSpiFFZp4NxiFkdQj6J9EF";
  // Effect to fetch the details of a single lecturer when the component mounts
  useEffect(() => {
    college
      .get(`/lecturers/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // Set the details of the lecturer in the state
        setLecturer(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);
  useEffect(() => {
    if (lecturer) {
        image
            .get(`${lecturer.name}`, {
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
}, [imageKey, lecturer]);
  // If lecturer data is not available, show a loading indicator
  if (!lecturer) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  // Extracting enrolment IDs from the lecturer data
  const enrolmentIds = Object.values(lecturer.enrolments).map(enrolment => enrolment.id);

  // JSX for the Single Lecturer component
  return (
    <LecturerHero
      id={lecturer.id}
      name={lecturer.name}
      address={lecturer.address}
      email={lecturer.email}
      phone={lecturer.phone}
      data={lecturer}
      enrolments={enrolmentIds}
      backgroundImage={backgroundImage && backgroundImage.photos && backgroundImage.photos[0].src.landscape}
    />
  );
}

export default Single;
