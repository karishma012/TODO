import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const onSignup = () => {
        setloading(true);
        navigate('/login');
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, { displayName: name })
                    .then(() => {
                        // Use navigate function to navigate to the desired route
                    })
                    .catch((e) => alert(e.message))
                    .finally(() => setloading(false));
            });
    };

    return (
        <div>
            <div className="w-full h-screen flex justify-center items-center w-120">
                <div className="w-96 bg-white shadow-lg">
                    <div className="m-5">
                        <h1 className="block text-3xl text-yellow-700 font-bold mb-2 text-center underline justify-center">
                            SIGNUP
                        </h1>
                        <label className="block text-xl text-pink-900 font-bold mb-2">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            name="name"
                            type="name"
                            placeholder="Enter Your Name"
                            className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        />
                    </div>
                    <div className="m-5">
                        <label className="block text-xl text-pink-900 font-bold mb-2">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            name="email"
                            type="email"
                            placeholder="Enter Your EmailId"
                            className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        />
                    </div>
                    <div className="m-5">
                        <label className="block text-xl mb-2 text-pink-900 font-bold">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            name="password"
                            type="password"
                            placeholder="******************"
                            className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        />
                    </div>
                    <div className="m-5">
                        <button
                            onClick={onSignup}
                            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
                        >
                            {loading ? 'Creating user ...' : 'Signup'}
                        </button>
                    </div>
                    <div className="m-5">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
