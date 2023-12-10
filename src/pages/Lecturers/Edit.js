import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Edit = (auth) => {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  // State to store the lecturer data
  const [lecturer, setlecturer] = useState(null);

  // Styling for displaying errors
  const errorStyle = {
    color: 'red',
    fontStyle: 'bold'
  };
  
  // State to store form validation errors
  const [errors, setErrors] = useState()
  const navigate = useNavigate()
  
  // State to store form data
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
    }))
  }

  // Effect to fetch lecturer data when the component mounts
  useEffect(() => {
    let token = localStorage.getItem('token')
    axios
      .get(`/lecturers/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setForm(response.data.data)
        setlecturer(response.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [id]);

  // If lecturer data is not available, show a loading indicator
  if (!lecturer) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

  // Function to validate form fields
  const isRequired = (fields) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d()+\-\s]*\d{10}$/;

    let included = true;
    setErrors({})
    fields.forEach(field => {
      if (!form[field]) {
        included = false;
        setErrors(prevState => ({
          ...prevState,
          [field]: {
            message: `${field} is required`
          }
        }))
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
  }

  // Function to handle form submission
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitted", form)
    // If form validation passes, make an API call
    if (isRequired(['name', 'address', 'email', 'phone'])) {
      let token = localStorage.getItem('token');
      axios.post('/lecturers', form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          // Redirect to the home page after successful submission
          navigate('/lecturers/home')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  // JSX for the Edit Lecturer component
  return (
    <div className="bg-base-200 rounded-xl">
      <h1 className="text-center mb-8 text-3xl font-bold mt-8 pt-5">Edit Lecturer {id}</h1>
      <div className='flex justify-center items-center rounded-xl pb-5'>
        <form onSubmit={submitForm}>
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
            <input type="input" onChange={handleForm} value={form.phone} name="phone" className="input input-bordered" /><span style={errorStyle}>{errors?.phone?.message}</span>
          </div>
          <input className="mt-4 font-bold" type='submit' />
        </form>
      </div>
    </div>
  );
}

export default Edit;
