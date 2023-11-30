import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function DeleteBtn({id ,deleteCallback,resource}) {
    // console.log(id,deleteCallback)
    const navigate = useNavigate();
    const onDelete = ()=>{
        let token = localStorage.getItem('token')
        axios
        .delete(`https://college-api.vercel.app/api/${resource}/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        .then(response => {
            deleteCallback(id)
            navigate('/home')
        })
        .catch(err => {
            console.log(err)
        })
    };
    return(
        <button className='btn btn-error text-l' onClick={onDelete}>
            Delete
        </button>
    ) 
}
