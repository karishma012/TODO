import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
const ResetPassword = () => {
    const [resetEmail, setResetEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendResetEmail = () => {
        setLoading(true);
        const auth = getAuth();
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                alert('Password reset email sent. Please check your inbox.');
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                alert('An error occurred. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="block text-3xl text-yellow-700 font-bold mb-2 text-center underline justify-center">
                        Reset Password
                    </h1>
                    <div className="mb-4">
                        <label className="block text-xl text-pink-900 font-bold mb-2" htmlFor="reset-email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="reset-email"
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleSendResetEmail}
                            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-4 py-2 rounded"
                            type="button"
                        >
                            {loading ? 'Sending...' : 'Send Reset Email'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
