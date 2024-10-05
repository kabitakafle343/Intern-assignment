import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Specificpage = () => {
    const { id } = useParams();
    const [data, setData] = useState({}); 

    const getData = async () => {
        try {
            const response = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setData(response.data); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []); 

    return (
        <>
       <div className='flex justify-center items-center w-full h-screen'>
            {data.title ? ( 
                <div className="rounded-lg  p-6 max-w-lg w-full">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">{data.title}</h1>
                    <p className="text-gray-600 mb-6">{data.body}</p>
                    <Link to='/' className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
                        Home
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin h-12 w-12 border-4 border-t-4 border-blue-600 border-t-transparent rounded-full"></div>
                    <p className="text-gray-600">Loading...</p> 
                </div>
            )}
            </div>
      
        </>
    );
}

export default Specificpage;

