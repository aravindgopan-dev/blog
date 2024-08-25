import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess, signInStart, signInFailure } from '../user/userSlice.js'
import { useSelector, useDispatch } from 'react-redux'




function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handle = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };
  const { loading, error: errorAlert } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      dispatch(signInFailure("Enter valid Email and Password")); // Corrected
      return;
    }

    try {
      dispatch(signInStart()); // Corrected
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message || 'Failed to sign in. Please try again.')); // Corrected
      } else {
        dispatch(signInSuccess(data)); // Corrected
        navigate("/"); // Correct usage of navigate
      }
    } catch (error) {
      dispatch(signInFailure('Failed to sign in. Please try again.')); // Corrected
    }
  };


  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center py-8'>
      <div className='max-w-sm w-full bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-white mb-6 text-center'>Sign In</h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Email</label>
            <input
              className='input input-bordered w-full text-gray-900 bg-gray-200'
              type='email'
              id='email'
              placeholder='Your email'
              value={form.email} // Bind input value to form state
              onChange={handle}
            />
          </div>

          <div>
            <label className='block text-gray-300 text-sm font-medium mb-1'>Password</label>
            <input
              className='input input-bordered w-full text-gray-900 bg-gray-200'
              type='password'
              id='password'
              placeholder='Your Password'
              value={form.password} // Bind input value to form state
              onChange={handle}
            />
          </div>
          <button type='submit' className='btn btn-primary w-full mt-4' disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-xs"></span> : "Sign In"}
          </button>
        </form>
        <div className='my-2'>
          <span>Don't have an account?</span>
          <Link to="/sign-up" className='text-blue-400 ml-2'>Sign Up</Link>
        </div>
        {errorAlert && (
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
        )}
      </div>
    </div>
  );
}

export default Signin;
