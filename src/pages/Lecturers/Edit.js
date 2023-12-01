import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Edit = (auth) => {
    const { id } = useParams();
    const [lecturer, setlecturer] = useState(null);

    

    const errorStyle = {
        color:'red',
        fontStyle:'bold'
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

  

    useEffect(()=> {
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
    if(!lecturer) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-infinity"></span></div>);

    
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

  
   

    
    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitted",form)
        if(isRequired(['name','address','email','phone'])){
        let token = localStorage.getItem('token');
        axios.post('/lecturers',form,{
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
export default Edit;