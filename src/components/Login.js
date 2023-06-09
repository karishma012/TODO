import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = () => {
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

  const handleForgotPassword = () => {
    navigate('/ResetPassword');
  };

  const handleSendResetEmail = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert('Password reset email sent. Please check your inbox.');
        setResetEmail('');
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="block text-3xl text-yellow-700 font-bold mb-2 text-center underline justify-center">
            Login
          </h1>
          <div className="mb-4">
            <label className="block text-xl text-pink-900 font-bold mb-2" htmlFor="email">
              EmailId
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter Your EmailId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl text-pink-900 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
              type="button"
            >
              {loading ? 'Logging you in ...' : 'Login'}
            </button>
          </div>
          <div className="mb-4">
            <button onClick={handleForgotPassword} className="text-blue-500 hover:text-blue-800" type="button">
              Forgot Password?
            </button>
          </div>
          <div className="m-5 text-sm text-pink-900 font-bold">
            <Link to="/signup">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
