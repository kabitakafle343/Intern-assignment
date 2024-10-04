import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar';
import { Link } from 'react-router-dom';

const Items = ({ data, setdata, query, setquery }) => {
  const [currentpage, setcurrentpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  
  const recordPerpage = 10;

  const lastIndex = currentpage * recordPerpage;
  const firstIndex = lastIndex - recordPerpage;

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const npages = Math.ceil(filteredData.length / recordPerpage);
  const num = [...Array(npages).keys()].map(n => n + 1); 

  const getData = async () => {
    setLoading(true);
    setError(null);  
    try {
      const items = await axios('https://jsonplaceholder.typicode.com/posts');
      setdata(items.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to fetch data. Please try again later.');  
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeNext = () => {
    if (currentpage < npages) {
      setcurrentpage(currentpage + 1);
    }
  };

  const changePrev = () => {
    if (currentpage > 1) {
      setcurrentpage(currentpage - 1);
    }
  };

  const changePage = (num) => {
    setcurrentpage(num);
  };

  return (
    <>
      <Navbar query={query} setquery={setquery} />

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className='flex flex-wrap justify-center 2xl:justify-start my-2 2xl:my-5 2xl:mx-20 overflow-x-hidden  mx-2 xl:pb-12  md:pb-28'>
          {filteredData.length > 0 ? (
            filteredData.slice(firstIndex, lastIndex).map((item) => (
              <div
                key={item.id}
                className='shadow-xl my-3 p-4 w-full sm:w-80 md:w-64 lg:w-80 flex flex-col justify-center gap-4 items-center mx-2'>
                <h1 className='text-center text-lg font-semibold'>
                  {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                </h1>
                <Link to={`/specificpage/${item.id}`}>
                  <button className='px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 w-25'>
                    view more
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className='text-center w-full text-2xl text-red-600'>Not found ..</p>
          )}
        </div>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <div className='2xl:fixed 2xl:bottom-6 2xl:left-0 2xl:right-0 flex justify-center mx-2 py-3   my-5 '>
          <button
            className='border-2 border-gray-500 rounded-lg p-1 mr-1 md:p-3 md:mr-3 active:bg-purple-600 transition-all duration-1000'
            onClick={changePrev}
            disabled={currentpage === 1}>
            Prev
          </button>

          {num.map((n) => (
            <button
              key={n}
              className={`border-2 border-gray-500 rounded-lg p-1  md:p-3 lg:p-4  mx-[2px] sm:mx-2 sm:p-2 ${
                currentpage === n ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => changePage(n)}>
              {n}
            </button>
          ))}

          <button
            className='border-2 border-gray-500 rounded-lg p-1 ml-1 md:p-3 md:ml-3 active:bg-slate-900 transition-all duration-1000'
            onClick={changeNext}
            disabled={currentpage === npages}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Items;


