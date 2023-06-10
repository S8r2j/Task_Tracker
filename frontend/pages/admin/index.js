import React from 'react'
import { useState , useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar';
import { IoMdTrash } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import JupiterLogo from '@/components/JupiterLogo';
import UserPhoto from 'components/UserPhoto';

function admin() {
  const {data:session}= useSession();
  const token = session?.user.access_token;


  useEffect(() => {
 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    };
     axios.get('http://127.0.0.1:8000/links',config)
      .then(response => {
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    },[token])
  return (
    <>
    <div className=' bg-gray-200 h-screen'>
     
    <div> <AdminNavbar/></div>
      <div className='md:flex lg:flex p-4 bg-gray-200'>
       <div className='bg-gray-50 mb-2 w-full md:w-1/3 lg:w-1/3 h-[500px] p-2 rounded-lg shadow-md'>
        <h1 className='font-bold'>TO DO</h1>
       </div>
       <div className='bg-gray-50 mx-2 mb-2 w-full md:w-1/3 lg:w-1/3 h-[500px] p-2 rounded-lg shadow-md'>
        <h1 className='font-bold'>In Progress</h1>
       </div>
       <div className='bg-gray-50 mb-2 w-full md:w-1/3 lg:w-1/3 h-[500px] p-2 rounded-lg shadow-md'>
        <h1 className='font-bold'>Done</h1>
       </div>
      </div>
    
    </div>
    </>
  )
}

export default admin