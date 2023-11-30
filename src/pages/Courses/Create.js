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
        title:"",
        code:"",
        description:"",
        points:"",
        level:""
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
        if(isRequired(['title','description','code','level','points'])){
        let token = localStorage.getItem('token');
        axios.post('https://college-api.vercel.app/api/courses',form,{
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => {
            navigate('/home')
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
                  <span className="label-text">Title</span>
                </label>
                <input type="title" name="title" onChange={handleForm} value={form.title} className="input input-bordered"  /><span style={errorStyle}>{errors?.title?.message}</span>
                </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">code</span>
                </label>
                <input type="code" onChange={handleForm} value={form.code} name="code" className="input input-bordered" maxLength={5}  /><span style={errorStyle}>{errors?.code?.message}</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input type="description" onChange={handleForm} value={form.description} name="description" className="input input-bordered"  /><span style={errorStyle}>{errors?.description?.message}</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Points</span>
                </label>
                <input number="points" step="1"onChange={handleForm} value={form.points} name="points" className="input input-bordered"  /><span style={errorStyle}>{errors?.points?.message}</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Level</span>
                </label>
                <input type="level" onChange={handleForm} value={form.level} name="level" className="input input-bordered"  /><span style={errorStyle}>{errors?.level?.message}</span>
              </div>
              <input type='submit'/>
  
              </form>
              </div>

    );

}
export default Create;