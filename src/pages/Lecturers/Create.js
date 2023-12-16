import { useState } from 'react';
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [college,image] = axios;
  const [errorMessage, setErrorMessage] = useState("");
  // Styling for displaying errors
  const errorStyle = {
    color: 'red',
    fontStyle: 'bold'
  };

  // Function to check if required fields are included and meet specific format (email and phone)
  const isRequired = (fields) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d()+\-\s]*\d{10}$/;

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
        //.test is a js method to test whether the string matchs a pattern
      } else if (field === 'email' && !emailRegex.test(form.email)) {
        included = false;
        setErrors(prevState => ({
          ...prevState,
          email: {
            message: `${field} must be the correct format`
          }
        }));
      } else if (field === 'phone' && !phoneRegex.test(form.phone)) {
        included = false;
        setErrors(prevState => ({
          ...prevState,
          phone: {
            message: `${field} must be the correct format`
          }
        }));
      }
    });

    return included;
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });

  // Function to handle form input changes
  const handleForm = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Function to handle form submission
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitted", form);
    if (isRequired(['name', 'address', 'email', 'phone'])) {
      let token = localStorage.getItem('token');
      college.post('/lecturers', form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          const created = response.data.data
          navigate(`/lecturers/${created.id}`);
        })
        .catch(err => {
          console.error(err);
          setErrorMessage(Object.values(err.response.data.errors));
        });
    }
  };

  // JSX for the Create Lecturer component
  return (
    <div className="bg-base-200 rounded-xl">
      <h1 className="text-center mb-8 text-3xl font-bold mt-8 pt-5">Create a Lecturer</h1>
      <div className='flex justify-center items-center rounded-xl pb-5'>
        <form onSubmit={submitForm}  className='w-56'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="input" name="name" onChange={handleForm} value={form.name} className="input input-bordered" /><span style={errorStyle}>{errors?.name?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input type="text" onChange={handleForm} value={form.address} name="address" className="input input-bordered" /><span style={errorStyle}>{errors?.address?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="input" onChange={handleForm} value={form.email} name="email" className="input input-bordered" /><span style={errorStyle}>{errors?.email?.message}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="number" onChange={handleForm} value={form.phone} name="phone" className="input input-bordered" /><span style={errorStyle}>{errors?.phone?.message}</span>
          </div>
          <p className='mb-1' style={errorStyle}>{errorMessage}</p>
          <input className="mt-4 font-bold" type='submit' />
        </form>
      </div>
    </div>
  );
}

export default Create;
