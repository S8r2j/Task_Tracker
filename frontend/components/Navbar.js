import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import JupiterLogo from './JupiterLogo';
import { signIn, signOut, useSession } from 'next-auth/react';


function AdminNavbar() {
   const [navbar, setNavbar] = useState(false);
   const {data:session}= useSession();
   console.log(session)

  return (
    
    <div>
         <nav className="w-full  bg-white shadow-lg ">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
              <div className=' w-[150px] '><JupiterLogo/>  </div>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                 <div>
                  {session?(
                    <div className='flex '>
                      <Link href='./admin'><p className='flex m-5  font-bold hover:text-blue-600 '>{session?.user.user_name}</p></Link>
                        <button className=' hover:text-blue-600 font-bold  py-2 p-5 tracking-wider rounded-md 'onClick={() => signOut()}>
                          Logout
                        </button>
                    </div>
                   
                  ):(  <button className=' hover:text-blue-600 font-bold  py-2 p-5 tracking-wider rounded-md 'onClick={() => signIn()}>
                  Login
                 </button>)}
                 </div>
                <li className="">
                <button className=' bg-white hover:bg-blue-600 tracking-wider hover:text-white font-bold py-2 p-4 rounded-md'>
                  <Link href="/signup">
                    Signup
                  </Link>
                  </button>  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>

   
  )
}

export default AdminNavbar;
