import React from 'react'
import {Link} from "react-router-dom"
function Sigup() {
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center py-8'>
      <div className='max-w-sm w-full bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-white mb-6 text-center'>Sign Up</h1>
        <form className='space-y-4'>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Name</label>
            <input 
              className='input input-bordered w-full text-gray-900 bg-gray-200' 
              type='text' 
              placeholder='Your Name' 
            />
          </div>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Email</label>
            <input 
              className='input input-bordered w-full text-gray-900 bg-gray-200' 
              type='email' 
              placeholder='Your Email' 
            />
          </div>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Password</label>
            <input 
              className='input input-bordered w-full text-gray-900 bg-gray-200' 
              type='password' 
              placeholder='Your Password' 
            />
          </div>
          <button type='submit' className='btn btn-primary w-full mt-4'>Sign Up</button>
        </form>
        <div className='my-2'>
          <span>Have an account ?</span>
          <Link to="/sign-in" className='text-blue-400 ml-2'>Sing In</Link>
        </div>
      </div>
    </div>

  )
}

export default Sigup