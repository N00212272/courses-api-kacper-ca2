import {useState,useEffect} from 'react';
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const Create = (auth) => {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

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
        status:"",
        course_id:"",
        lecturer_id:"",
        time:"",
        date:""
    });
    useEffect(()=> {
      let token = localStorage.getItem('token');
      axios
      .get('/courses',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
          setCourses(response.data.data)
      })
      .catch(err => {
          console.error(err)
      })
    }, []);
    useEffect(()=> {
      let token = localStorage.getItem('token');
      axios
      .get('/lecturers',{
        headers: {
           'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
          setLecturers(response.data.data)
      })
      .catch(err => {
          console.error(err)
      })
    }, []);

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
   

    
    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitted",form)
        if(isRequired(['status','course_id','lecturer_id','date','time'])){
        let token = localStorage.getItem('token');
        axios.post('/enrolments',form,{
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => {
            navigate('/enrolments/home')
        })
        .catch(err => {
            console.error(err)
        })

    }
}

const courseOptions = courses.map((course) => {
  return <option  value={course.id}>{course.title}</option>
})
const lecturerOptions = lecturers.map((lecturer) => {
  return <option  value={lecturer.id}>{lecturer.name}</option>
})
    return(
    <div className='flex justify-center items-center h-screen'>
       <form onSubmit={submitForm}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select name="status" id="status" onChange={handleForm}>
                  <option value="">Choose Status</option>
                  <option value="interesed">Interested</option>
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
                <option value="" >Choose a course</option>
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
                <input type="date" onChange={handleForm} value={form.date} name="date" className="input input-bordered"  /><span style={errorStyle}>{errors?.date?.message}</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <input type="time" onChange={handleForm} value={form.time} name="time" className="input input-bordered"  /><span style={errorStyle}>{errors?.time?.message}</span>
              </div>
              <input type='submit'/>
  
              </form>
              </div>

    );

}
export default Create;