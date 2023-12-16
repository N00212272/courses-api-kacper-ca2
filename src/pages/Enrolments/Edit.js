import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [college,image] = axios;
  // Extracting 'id' parameter from the route
  const { id } = useParams();

  // State variables using React hooks
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [enrolment, setEnrolment] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  // Error style for displaying error messages
  const errorStyle = {
    color: 'red',
    fontStyle: 'bold'
  };

  // Function to validate if required fields are not empty
  const isRequired = (fields) => {
    let included = true;
    setErrors({});
    fields.forEach(field => {
      if (!form[field]) {
        included = false;
        setErrors(prevState => ({
          ...prevState,
          [field]: {
            message: `${field} is required`
          }
        }));
      }
    });
    return included;
  };

  // State variables for errors, navigation, and form data
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    status: "",
    course_id: "",
    lecturer_id: "",
    time: "",
    date: ""
  });

  // Fetching courses, lecturers, and enrolment data from the API
  useEffect(() => {
    let token = localStorage.getItem('token');

    college
      .get('/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });

    college
      .get('/lecturers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setLecturers(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });

    college
      .get(`/enrolments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setEnrolment(response.data.data);
        setForm(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  // If enrolment data is not available, display loading spinner
  if (!enrolment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity"></span>
      </div>
    );
  }

  // Handling changes in form input fields and updating the corresponding field in the form state
  const handleForm = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Submitting the form after validating the required fields
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitted", form);
    if (isRequired(['status', 'course_id', 'lecturer_id', 'date', 'time'])) {
      let token = localStorage.getItem('token');
      college.put(`/enrolments/${id}`, form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          const edited = response.data.data
          navigate(`/enrolments/${edited.id}`);
        })
        .catch(err => {
          console.error(err);
          setErrorMessage(Object.values(err.response.data.errors));
        });
    }
  };

  // Generating options for the course select dropdown
  const courseOptions = courses.map((course) => (
    <option value={course.id} key={course.id} selected={form.course_id === course.id}>
      {course.title}
    </option>
  ));

  // Generating options for the lecturer select dropdown
  const lecturerOptions = lecturers.map((lecturer) => (
    <option value={lecturer.id} key={lecturer.id} selected={form.lecturer_id === lecturer.id}>
      {lecturer.name}
    </option>
  ));

  return (
    <div className="bg-base-200 rounded-xl">
      <h1 className="text-center mb-8 text-3xl font-bold mt-8 pt-5">Edit Enrolment {id}</h1>
      <div className='flex justify-center items-center rounded-xl pb-5'>
        <form onSubmit={submitForm}  className='w-56'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select name="status" id="status" value={form.status} onChange={handleForm}>
              <option value="">Choose Status</option>
              <option value="interested">Interested</option>
              <option value="assigned">Assigned</option>
              <option value="associate">Associate</option>
              <option value="career_break">Career Break</option>
            </select>
            <span style={errorStyle}>{errors?.status?.message}</span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <select name="course_id" onChange={handleForm}>
              <option value="" >Choose a course</option>
              {courseOptions}
            </select>
            <span style={errorStyle}>{errors?.course_id?.message}</span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Lecturers</span>
            </label>
            <select name="lecturer_id" onChange={handleForm}>
              <option value="">Choose a lecturer</option>
              {lecturerOptions}
            </select>
            <span style={errorStyle}>{errors?.lecturer_id?.message}</span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input type="date" onChange={handleForm} value={form.date} name="date" className="input input-bordered" />
            <span style={errorStyle}>{errors?.date?.message}</span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input type="time" onChange={handleForm} value={form.time} name="time" className="input input-bordered" />
            <span style={errorStyle}>{errors?.time?.message}</span>
          </div>
          <p className='mb-1' style={errorStyle}>{errorMessage}</p>
          <input className="mt-4 font-bold" type='submit' />
        </form>
      </div>
    </div>
  );
};

export default Edit;
