import React from 'react'
import Image from 'next/image';
import userphoto from '../public/userphoto.png'
function UserPhoto() {
  return (
     <div className='flex justify-center rounded-full border w-16 h-16'>
       <div className=' flex justify-center relative  border-black h-12 w-12'>
        <div className='absolute top-2 text-3xl text-white'>
          <Image src={userphoto}></Image>
        </div>
    </div>  
     </div>
  )
}

export default UserPhoto;
