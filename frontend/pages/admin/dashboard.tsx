import React, { useEffect, useState } from 'react'
import Link from 'next/link';
const dashboard = () => {

    const[ totalTopics , setTotaltopics] = useState(0);
    useEffect(()=>{
        updateTotalTopics();
    },[]);
    const updateTotalTopics = async () => {
        try {
          const response = await fetch('http://127.0.0.1:1337/topic/count',{
            method:'GET',
            headers:{
                'Content-Type' :'application/json',
                // Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setTotaltopics(data.total);
            console.log(response);
          } else {
            console.error('Error occurred while fetching total tasks:', response);
            // Handle the error here, such as displaying an error message to the user
          }
        } catch (error) {
          console.error('error', error);
        }
      };

  return (
    <div>
       <div className="flex-row lg:flex my-12">
    <div className="flex flex-col w-full p-3 bg-white shadow lg:h-screen lg:w-72">
        <div className="space-y-3">
            <div className="flex items-center">
                <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                        />
                    </div>
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                        <Link
                            href='/admin/dashboard'
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="rounded-sm">
                        <Link
                            href="/admin/add"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <span>Add Topic</span>
                        </Link>
                    </li>
                    <li className="rounded-sm">
                        <Link
                            href='/admin/addQue'
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <img src="/4871545_pen_pencil_text_write_icon.svg" alt="" className=' h-5' />
                            <button className='pl-1'
                            // onClick={handleLogout}
                            >
                               Add Question</button>
                        </Link>
                    </li>
                    <li className="rounded-sm">
                        <Link
                            href=''
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            <button 
                            // onClick={handleLogout}
                            >
                               Logout</button>
                        </Link>
                    </li>
                    

                </ul>
            </div>
        </div>
    </div>
    <div className="container mx-auto lg:ml-10 mt-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 grid-cols-1 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total Topics
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                {totalTopics}
                </div>
                
            </div>
            <div className="w-full px-4 py-6 lg:ml-5 md:ml-5 sm:ml-5 lg:mt-0 md:mt-0 sm:mt-0 mt-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total Topics
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-500">
                {totalTopics}
                </div>
            </div>
        
        </div>
    </div>
    
</div>
    </div>

  )
}

export default dashboard
