import axios from 'axios'
import {useState} from 'react'
export default function DeleteBtn({id ,deleteCallback,resource,data}) {
    // console.log(id,deleteCallback)
    //created this variable to manage the confirmation
    const [count, setCount] = useState(0)
    //handle yes would delete the object and set the count back to 0 so theres no confusion next time when deleting
    const handleYes = () => {
        onFinalDelete();
        setCount(0);
    };
    //handle no just puts the state back to its origianl form
    const handleNo = () => {
        setCount(0);
    };
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
            setCount(0)
        })
        .catch(err => {
            console.log(err, "DELETION ON COURSE/LECTURER")
        })
    }
        const onDeleteEnrolments = ()=>{
            let token = localStorage.getItem('token')
            
                data.enrolments.forEach((enrolment)=>{
                axios
                .delete(`https://college-api.vercel.app/api/enrolments/${enrolment.id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                
                .catch((error) => {
                  console.log(error,"DELETION ON ENROLMENT");
                });
            })
            onDelete()
        }
        const onFinalDelete = () => {
            //Had to add if data.enrolments is in array then do this as enrolments do not have an object called enrolments
            if (data && Array.isArray(data.enrolments) && data.enrolments.length > 0) {
                onDeleteEnrolments();
            } else {
                onDelete();
            
        };
        
        }
    
    return(
        <div>
            {/* simple condition saying if count is 0 then if clicked it would put it to 1 and show the are you sure buttons */}
        {count === 0 ? (
            <button className='btn btn-error text-l' onClick={() => setCount(1)}>
                Delete
            </button>
        ) : (
            <div>
                <p>Are you sure you want to delete?</p>
                <button className='btn btn-error' onClick={handleYes}>
                    Yes
                </button>
                <button className='btn btn-success' onClick={handleNo}>
                    No
                </button>
            </div>
        )}
    </div>
    ) 
}
