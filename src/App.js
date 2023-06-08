import { Routes, Route } from 'react-router-dom';
import image from './components/todo.jpg';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initilizeFirebase } from './utils/Firebase';
import HomePage from './components/HomePage';

const mystyle = {
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${image})`,

}
initilizeFirebase();
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])
  return (
    <div className="bg-fixed bg-cover bg-center" style={mystyle}>


      <div className="container">
        <Routes>
          <Route path="/" element={< HomePage />} />
          <Route path="/login" element={< Login />} />

          <Route path="/signup" element={< Signup />} />
          <Route path="/dashboard" element={< Dashboard />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;
