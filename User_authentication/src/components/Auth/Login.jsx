import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../api';

const LOGIN_URL = "/login";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(LOGIN_URL, { username, password });
      if (response.status === 200) {
        const { accessToken, user } = response.data;
        setAuth({ username, role: user.roles,accessToken });
        setUsername('');
        setPassword('');
        console.log(accessToken);
        navigate(user.roles === 'admin' ? '/admin' : '/user');
      } else {
        // Handle non-200 responses if needed
      }
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        alert(message || "Login unsuccessful. Please try again.");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 pl-2 pr-10 border rounded-lg focus:outline-none focus:border-lime-600"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </button>
              <div className='flex justify-end text-green-800 font-medium'>
                <h5 className='underline'>
                  <Link to="/forgetpassword">Forget password?</Link>
                </h5>
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className="flex justify-center w-64 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          
          <div className='pt-9 flex justify-center'>
            <p>Don't have an account?</p>
            <div>
              <h5 className='text-green-800 font-semibold'>
                <Link to="/signup">SignUp</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
