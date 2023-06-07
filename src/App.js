import { Routes, Route } from 'react-router-dom';

import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initilizeFirebase } from './utils/Firebase';

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
    <div className="App">


      <div className="container">
        <Routes>
          <Route path="/" element={< Login />} />

          <Route path="/signup" element={< Signup />} />
          <Route path="/dashboard" element={< Dashboard />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;
//import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// const Login = () => {
//     const [email, setemail] = useState('');
//     const [password, setpassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const onLogin = () => {
//         setLoading(true);
//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 localStorage.setItem('token', userCredential._tokenResponse.idToken);
//                 navigate('/dashboard');
//             })
//             .catch((e) => alert(e.message))
//             .finally(() => setLoading(false));
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="w-full max-w-xs">
//                 <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                             EmailId
//                         </label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="username" type="text" placeholder="Enter Your EmailId" value={email} onChange={e => setemail(e.target.value)} />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                             id="password" type="password" placeholder="******************" value={password} onChange={e => setpassword(e.target.value)} />
//                         <p className="text-red-500 text-xs italic">Please choose a password.</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button
//                             onClick={onLogin}
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
//                             {loading ? 'Logging you in ...' : 'Login'}
//                         </button>

//                     </div>
//                     <div className='m-5'>
//                         <Link to='/signup'>
//                             Don't have an account?
//                         </Link>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default Login
