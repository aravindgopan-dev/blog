import React, { useState } from 'react'
import { Link , useNavigate} from "react-router-dom"
function Sigup() {
  const [formData, setformData] = useState({})
  const [errorAlert, setError] = useState(null)
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();

  const handle = (e) => {
    setformData(prev => ({
      ...prev, [e.target.id]: e.target.value.trim()
    })
    )

  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      setError("please fill out all fields")
      return;
    }
    try {
      setloading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json();  // Corrected from res.JSON() to res.json()

      if (!res.ok) {
        setloading(false)
        setError(data.message);
      } else {

        setloading(false)
        setError(null); 
        navigate("/sign-in") 
        
      }
    } catch (err) {
      setloading(false)
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center py-8'>
      <div className='max-w-sm w-full bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-white mb-6 text-center'>Sign Up</h1>
        <form className='space-y-4' onSubmit={handlesubmit} >
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Name</label>
            <input
              className='input input-bordered w-full text-gray-900 bg-gray-200'
              type='text'
              id='username'
              placeholder='Your Name'
              onChange={handle}
            />
          </div>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Email</label>
            <input
              className='input input-bordered w-full text-gray-900 bg-gray-200'
              type='email'
              id='email'
              placeholder='Your Email'
              onChange={handle}
            />
          </div>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Password</label>
            <input
              className='input input-bordered w-full text-gray-900 bg-gray-200'
              type='password'
              placeholder='Your Password'
              id='password'
              onChange={handle}

            />
          </div>
          <button type='submit' className='btn btn-primary w-full mt-4' disabled={loading}>
            { loading?(<span class="loading loading-spinner loading-xs"></span>):
            ("Sign Up")}</button>
        </form>
        <div className='my-2'>
          <span>Have an account ?</span>
          <Link to="/sign-in" className='text-blue-400 ml-2'>Sign In</Link>
        </div>
        <div>
          {errorAlert ? (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorAlert}</span>
            </div>
          ) : null}

        </div>
      </div>
    </div>

  )
}

export default Sigup