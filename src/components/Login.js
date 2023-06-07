import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
//ab hume logout k baad hmesha dashboard hi dekhna hai ..kyuki upr daalke to koi bi update kar sakta hai..to ek baar andr anne k baad vhi rehna hai ussi ke lie hum useEffect use karte hai
//now in login page you'll always redirect to dashboard
useEffect(() => {
  const token = localStorage.getItem('token');

  if (token) {
    navigate('/dashboard');
  }
}, [navigate]);

const onLogin = () => {
        setLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                navigate('/dashboard');
            })
            .catch((e) => alert(e.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            EmailId
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Enter Your EmailId" value={email} onChange={e => setemail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************" value={password} onChange={e => setpassword(e.target.value)} />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onLogin}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            {loading ? 'Logging you in ...' : 'Login'}
                        </button>

                    </div>
                    <div className='m-5'>
                        <Link to='/signup'>
                            Don't have an account?
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
