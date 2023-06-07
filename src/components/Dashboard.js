import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth , signOut} from 'firebase/auth';
import { useEffect } from 'react';
const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {

    signOut(auth) //removing the token from local storage
            .then(() => {
                localStorage.removeItem('token')
                navigate('/');
            })
            .catch((e) => alert(e.message))
    
  }
  //when we r writing dashboard on tab it is redirecting us to dashboard which is not appropriate for that again we'll use useeffect
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  const auth = getAuth();
  const user = auth.currentUser;
  //after reloading the page name is not showing so we'll write some more functions to fix it
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className='m-5'>
              <p>{user && user.displayName}</p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                LogOut
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
