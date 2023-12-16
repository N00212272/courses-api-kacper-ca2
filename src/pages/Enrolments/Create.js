import { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [college,image] = axios;
  // State variables using React hooks
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

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

  // Fetching courses and lecturers data from the API
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
  }, []);

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
      college.post('/enrolments', form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          const created = response.data.data
          navigate(`/enrolments/${created.id}`);
        })
        .catch(err => {
          console.error(err);
          setErrorMessage(Object.values(err.response.data.errors));
          
        });
    }
  };

  // Generating options for the course select dropdown
  const courseOptions = courses.map((course) => (
    <option value={course.id} key={course.id}>{course.title}</option>
  ));

  // Generating options for the lecturer select dropdown
  const lecturerOptions = lecturers.map((lecturer) => (
    <option value={lecturer.id} key={lecturer.id}>{lecturer.name}</option>
  ));

  return (
    <div className="bg-base-200 rounded-xl">
      <h1 className="text-center mb-8 text-3xl font-bold mt-8 pt-5">Create an Enrolment</h1>
      <div className='flex justify-center items-center rounded-xl pb-5 '>
        <form onSubmit={submitForm}  className='w-56'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select name="status" id="status" onChange={handleForm}>
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
              <option value="">Choose a course</option>
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
            <input type="date" onChange={handleForm} value={form.date} name="date" className="input input-bordered" /><span style={errorStyle}>{errors?.date?.message}</span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input type="time" onChange={handleForm} value={form.time} name="time" className="input input-bordered" /><span style={errorStyle}>{errors?.time?.message}</span>
          </div>
          <p className='mb-1' style={errorStyle}>{errorMessage}</p>
          <input className="mt-4 font-bold" type='submit' />
         
        </form>
       
      </div>
    </div>
  );
};

export default Create;
