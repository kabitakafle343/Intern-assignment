import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";

const Navbar = ({ query, setquery }) => {
    const [localQuery, setLocalQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setquery(localQuery);
        }, 1000);

        return () => clearTimeout(timer);
    }, [localQuery, setquery]);

    const handleChange = (e) => {
        e.preventDefault();
        setLocalQuery(e.target.value);
    }

    return (
        <div className="flex justify-center items-center h-20 mx-5">
            <form className="flex justify-center items-center relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-12 shadow-xl px-12 text-lg text-gray-700 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                    value={localQuery}
                    onChange={handleChange}
                />
                <span className="absolute left-4 text-gray-500">
                    <CiSearch size={24} />
                </span>
            </form>
        </div>
    );
}

export default Navbar;



