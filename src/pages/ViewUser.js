import axios from '../config/Api';
import {useState, useEffect} from 'react';

const ViewUser = () => {

   const [users,setUsers] = useState(null);
   let token = localStorage.getItem('token')
   useEffect(()=> {
    axios
    .get('/user',{
      headers: {
         'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
       setUsers(response.data)
        
    })
    .catch(err => {
        console.error(err)
    })
  }, []);
  console.log(users)
  return(
    



        <div className="hero min-h-screen bg-base-200 mt-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">{users?.user?.name}</h1>
            <p className="py-4">{users?.user?.email}</p>
          </div>
        </div>
        </div>



  );
}

export default ViewUser;                           