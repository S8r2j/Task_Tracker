import Link from 'next/link'
import React from 'react'

function completesignup() {
  return (
    <>
    <div className=' mt-20'>
      <h1 className=' text-fuchsia-600 text-3xl p-3 text-center '>Thankyou for Signup </h1>
      <Link href="./admin">
      <button className="bg-red-500 hover:bg-red-600 text-1xl text-white font-semibold py-4 px-4 rounded-md mx-auto flex justify-center w-1/2 mt-10 ">Continue making your own site</button>
      </Link>
    </div>
    </>
  )
}

export default completesignup
