import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login = ({auth, onAuth}) => {

    const [form,setForm] = useState({
        email:"n00212272@iadt.ie",
        password:"Secret123" 
    });

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {

        axios.post('https://college-api.vercel.app/api/login', {
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
        });
    }

    const handleLoginForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    return(
        // <div>
        //     <h1 class="bg-primary">Welcome to the Login Page</h1>
        // <div className="justify-center ">
            
        //     Email : <input onChange={handleLoginForm} type="text" name="email" value={form.email}/> <br/>
        //     Password : <input onChange={handleLoginForm} type="password" name="password" value={form.password}/> <br/>

        //     <button onClick={handleClick} >Login</button>
        //     <p>{errorMessage}</p>
        // </div>
        // </div>
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <Link to="/register"> <p className="py-6">Please login to view current courses and other information. <b>Dont have an account? Register Now</b></p></Link>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" onChange={handleLoginForm} value={form.email} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" onChange={handleLoginForm} value={form.password} name="password" className="input input-bordered" required />
          
              </div>
              <div className="form-control mt-6">
                <button onClick={handleClick} className="btn btn-primary">Login</button>
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

};

export default Login;                           