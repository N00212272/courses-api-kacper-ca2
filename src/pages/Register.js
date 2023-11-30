import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Register = ({onAuth}) => {

    const [form,setForm] = useState({
       
    });

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {

        axios.post('https://college-api.vercel.app/api/register', {
            name: form.name,
            email: form.email,
            password: form.password
        })
        .then(response => {
            onAuth(true,response.data.token);
            navigate('/home')
        })
        .catch(err => {
            console.error(err)
            setErrorMessage(err.response.data.message)
            //If a user tries to use an email which is already taken this message will come up
            if (err.response && err.response.status === 422) {

                setErrorMessage("This email has already been used");
            } 
        });
    }

    const handleRegisterForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    return(
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="name" name="name" onChange={handleRegisterForm} value={form.name} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" onChange={handleRegisterForm} value={form.email} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" onChange={handleRegisterForm} value={form.password} name="password" className="input input-bordered" required />
          
              </div>
              <div className="form-control mt-6">
                <button onClick={handleClick} className="btn btn-primary">Register</button>
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

};

export default Register;                           