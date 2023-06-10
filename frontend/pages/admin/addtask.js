import React,{useState} from 'react'
import { useSession } from 'next-auth/react';
  
function addtask() { 
    const [task, setTask] = useState();
    const {data:session}= useSession();
    const token = session?.user.access_token;
 
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      setName('');
      setUrl('');
  
      const axios = require('axios');
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/links/?title=${name}&url=${url}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      setShowbtn(!showbtn)
    }
  
  return (
    <div className='bg-gray-100 h-screen'> 
     <div className='p-2'>
     <form onSubmit={handleSubmit}>
       <div>
        <div>
        <h1 className=' font-bold  w-[100%] md:w-1/2 lg:w-1/2  rounded'>ADD TASK</h1>  
        </div>
       <div className=' bg-white p-2 flex justify-center border rounded-lg  shadow-md w-full  md:w-2/3 lg:w-1/2 xl:w-1/2'>
        <div className="flex  justify-center my-10">
         
      </div> 
        <div className="mb-1">
            <input
              type="text"
              placeholder='Add your task here'
              required
              className="border-gray-400 border-2 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>      
       
          <div className='flex-col'>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 ml-2 text-white font-medium py-2 px-4 rounded-md"
          >
            ADD 
          </button>
          </div>
        </div>  
       </div>
      </form> 
     </div>
    </div>
  )
}

export default addtask
