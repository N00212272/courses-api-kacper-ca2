import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [college,image] = axios;
  // useParams to extract 'id' parameter from the route
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables using React hooks
  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    points: "",
    level: ""
  });

  // State variable for form validation errors
  const [errors, setErrors] = useState();

  // Error style for displaying error messages
  const errorStyle = {
    color: 'red',
    fontStyle: 'bold'
  };

  // Handling changes in form input fields and updating the corresponding field in the form state
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Fetches course details to prefill the form
  useEffect(() => {
    let token = localStorage.getItem('token');
    college
      .get(`/courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setCourse(response.data.data);
        setForm(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  // If course is not available, show a loading spinner
  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity"></span>
      </div>
    );
  }

  // Checks if specific fields are not empty using a forEach to filter through the form
  const isRequired = (fields) => {
    let included = true;
    setErrors({});
    fields.forEach(field => {
      if (!form[field]) {
        included = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`
          }
        }));
      } else if (field === 'points' && form.field < 100) {
        included = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} must be a number greater than or equal to 100`
          }
        }));
      } else if (field === 'level' &&form.field < 7) {
        included = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} must be a number greater than or equal to 7`
          }
        }));
      }
    });
    return included;
  };

  // Submits the form after validating the required fields
  const submitForm = (e) => {
    e.preventDefault();
    if (isRequired(['title', 'description', 'code', 'level', 'points'])) {
      let token = localStorage.getItem('token');
      // Submits and edits the course with form
      college.put(`/courses/${id}`, form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          const edited = response.data.data
          navigate(`/courses/${edited.id}`);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <div className="bg-base-200 rounded-xl">
      <h1 className="text-center mb-8 text-3xl font-bold mt-8 pt-5">Edit Course {id}</h1>
      <div className='flex justify-center items-center  pb-5'>
        <form onSubmit={submitForm}  className='w-56'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="title" name="title" onChange={handleForm} value={form.title} className="input input-bordered" required /><span style={errorStyle}>{errors?.title?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Code</span>
            </label>
            <input type="code" onChange={handleForm} value={form.code} name="code" className="input input-bordered" maxLength={5} required /><span style={errorStyle}>{errors?.code?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input type="description" onChange={handleForm} value={form.description} name="description" className="input input-bordered" required /><span style={errorStyle}>{errors?.description?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Points</span>
            </label>
            <input type="number" step="1" onChange={handleForm} value={form.points} name="points" className="input input-bordered" required /><span style={errorStyle}>{errors?.points?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Level</span>
            </label>
            <input type="number" onChange={handleForm} value={form.level} name="level" className="input input-bordered" required /><span style={errorStyle}>{errors?.level?.message}</span>
          </div>

          <input className="mt-4 font-bold" type='submit' />
        </form>
      </div>
    </div>
  );
};

export default Edit;
