
import React from 'react'
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };
  return (
    <div>
      <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 
      rounded text-xl font-bold"
      onClick={handleGetStarted}>
        GET STARTED
      </button>
    </div>
  )
}

export default HomePage
