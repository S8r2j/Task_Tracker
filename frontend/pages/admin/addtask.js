import React,{useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import AdminNavbar from '@/components/AdminNavbar';
import axios from 'axios';

function addtask() { 
    const [task, setTask] = useState();
    const [refetch, setRefetch] =useState(false);
    const [todo, settodo] = useState([]);
    const [data, setData] = useState([]);
    const {data:session}= useSession();
    const token = session?.user.access_token;
    const url ="http://127.0.0.1:8000/get/tasks/";

    useEffect(() => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      axios
        .get(url, config)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
  
  },[refetch,token]);
  
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setTask('')
      const axios = require('axios');
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/add/tasks/',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        data:{
          task:task,
          status:"todo",
        }
      };
  
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      setRefetch(!refetch);
    }
  
  return (
    <div className='bg-gray-100 h-screen'> 
    <div><AdminNavbar/></div>
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
      <div className='m-2 bg-gray-50 shadow-sm w-full md:w-1/2 lg:w-1/2 '>
      <ul className='flex flex-col justify-center mt-4 list-disc m-2 pl-2'>
              {data.map((item , index) => (
                <li key={index}>
                  <p>{item.task}</p>
                </li>
              ))}
            </ul>
      </div>
     </div>
    </div>
  )
}

export default addtask
