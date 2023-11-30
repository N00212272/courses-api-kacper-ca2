import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = (auth) => {
    const errorStyle = {
        color:'red',
        fontStyle:'bold'
    }
    const isRequired = (fields) => {
        let included = true;
        setErrors({})
        fields.forEach(field => {
            if(!form[field]){
                included = false;
                setErrors(prevState => ({
                    ...prevState,
                 [field]:{
                    message:`${field} is required`
                 }
                }))
            }
        });
        return included;
    }

    const [errors, setErrors] = useState()
    const navigate = useNavigate()
    const [form,setForm] = useState({
        name:"",
        address:"",
        email:"",
        phone:""
    });

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
   

    
    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitted",form)
        if(isRequired(['name','address','email','phone'])){
        let token = localStorage.getItem('token');
        axios.post('https://college-api.vercel.app/api/lecturers',form,{
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => {
            navigate('/lecturers/home')
        })
        .catch(err => {
            console.error(err)
        })

    }
}
    return(
    <div className='flex justify-center items-center h-screen'>
       <form onSubmit={submitForm}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="input" name="name" onChange={handleForm} value={form.name} className="input input-bordered"  /><span style={errorStyle}>{errors?.name?.message}</span>
                </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input type="text" onChange={handleForm} value={form.address} name="address" className="input input-bordered"  /><span style={errorStyle}>{errors?.address?.message}</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="input" onChange={handleForm} value={form.email} name="email" className="input input-bordered"  /><span style={errorStyle}>{errors?.email?.message}</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input type="input" onChange={handleForm} value={form.phone} name="phone" className="input input-bordered"  /><span style={errorStyle}>{errors?.phone?.message}</span>
              </div>
              <input type='submit'/>
  
              </form>
              </div>

    );

}
export default Create;