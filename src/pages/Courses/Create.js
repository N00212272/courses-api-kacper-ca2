import { useState } from 'react';
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [college,image] = axios;
  // Error style for displaying error messages
  const errorStyle = {
    color: 'red',
    fontStyle: 'bold'
  };

  // State variables using React hooks
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    points: "",
    level: ""
  });

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
        // Additional condition: points must be greater than or equal to 100
      } else if (form.points < 100) {
        included = false;
        setErrors(prevState => ({
          ...prevState,
          [field]: {
            message: `${field} must be a number greater than or equal to 100`
          }
        }));
      // Additional condition: level must be greater than or equal to 7
      } else if (form.level < 7) {
        included = false;
        setErrors(prevState => ({
          ...prevState,
          [field]: {
            message: `${field} must be a number greater than or equal to 7`
          }
        }));
      }
    });
    return included;
  };

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
    if (isRequired(['title', 'description', 'code', 'level', 'points'])) {
      let token = localStorage.getItem('token');
      college.post('/courses', form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          const created = response.data.data
          navigate(`/courses/${created.id}`);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <div className="bg-base-200 rounded-xl">
      <h1 className="text-center mb-8 text-3xl font-bold mt-8 pt-5">Create a Course</h1>
      <div className='flex justify-center items-center pb-5 '>
        <form onSubmit={submitForm} className='w-56'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="title" name="title" onChange={handleForm} value={form.title} className="input input-bordered" /><span style={errorStyle}>{errors?.title?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Code</span>
            </label>
            <input type="code" onChange={handleForm} value={form.code} name="code" className="input input-bordered" maxLength={5} /><span style={errorStyle}>{errors?.code?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input type="description" onChange={handleForm} value={form.description} name="description" className="input input-bordered" /><span style={errorStyle}>{errors?.description?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Points</span>
            </label>
            <input type="number" step="1" onChange={handleForm} value={form.points} name="points" className="input input-bordered " /><span style={errorStyle}>{errors?.points?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Level</span>
            </label>
            <input type="number" onChange={handleForm} value={form.level} name="level" className="input input-bordered" /><span style={errorStyle}>{errors?.level?.message}</span>
          </div>
          <input className="mt-4 font-bold" type='submit' />
        </form>
      </div>
    </div>
  );
};

export default Create;
