// src/components/Auth/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../api'; // Import axiosInstance

const SIGNUP_URL = "/signup"; // Ensure this is the correct endpoint

const Signup = () => {
    const navigateTo = useNavigate();
    const { setAuth } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [roles,setRole]=useState("user")
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axiosInstance.post(SIGNUP_URL, // Use axiosInstance
              { username, email, password,roles },
              
          );
          if(response.status==200){
          setAuth({username,email,password,roles})
          setUsername('');
          setEmail('');
          setRole('user')
          setPassword('');
          navigateTo("/");
          }
         
        } catch (error) {
            alert("Signup unsuccessful. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-gray-600 font-medium text-sm block mb-3">Username</label>
                        <input 
                            type="text"
                            className="border w-full p-2 mb-3 rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="text-gray-600 font-medium text-sm block mb-3">Email</label>
                        <input 
                            type="text"
                            name="email"
                            className="border w-full p-2 mb-3 rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="mb-6">
                            <label className="block mb-3 text-sm font-medium text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full py-2 pl-2 pr-10 border rounded-lg focus:outline-none focus:border-lime-600"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div>
                                <label className="text-gray-600 font-medium text-sm block mb-3">Role</label>
                        <select
                            name="role"
                            className="border w-full p-2 mb-3 rounded-lg focus:outline-none focus:border-lime-600"
                            value={roles}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                                </div>
                                <button
                                    type="button"
                                    className="absolute top-3 transform - right-3 text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" className="flex justify-center w-64 py-2 mb-3 text-white bg-green-800 rounded-lg hover:bg-green-700">Sign up</button>
                    </div>
                </form>
                <div className="flex justify-center">
                    <p>Already have an account?</p>
                    <h5 className="text-green-800 font-medium">
                        <Link to="/">Login</Link>
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Signup;
