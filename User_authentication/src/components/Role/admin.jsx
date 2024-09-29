import React from "react";

const Admin = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to the Admin Dashboard 🚀
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                    Manage your application and monitor your data with ease. 🛠️
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
                        View Reports 📊
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition">
                        Manage Users 👥
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
