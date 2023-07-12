import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Modal,Text } from '@nextui-org/react';
import { Table } from 'flowbite-react'


type FormValues = {
    topic: string;
    questionType: string;
    question: string;
    options: string[];
    answer: string;
  };


const addQue = () => {

const [topicid ,setTopicid] = useState<string[]>([]);
const [topics, setTopics] = useState<string[]>([]);
const [selectedTopicid , setSelectedTopicId]= useState<string>(' ');

const [formValues, setFormValues] = useState<FormValues>({
    topic : '',
    questionType: '',
    question: '',
    options: [],
    answer: '',
  });
  const [newOption, setNewOption] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://127.0.0.1:1337/topic/find', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
        console.log(data.topics);
        
        
        setTopics(data.topics.map((topic :any)=> topic.title))
        setTopicid(data.topics.map((topic:any)=> topic.id))
        
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTopics();
  }, []);


  
  


//     const { value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       options: [...prevValues.options, value],
//     }));
//   };
const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewOption(value);
  };
  const handleAddOption = () => {
    if (newOption.trim() !== '') {
        const updatedOption = [ ...formValues.options , newOption];
        if(updatedOption.length <= 4){

            setFormValues((prevValues) => ({
              ...prevValues,
              options: updatedOption,
            }));
            setNewOption('');
          }else {
            alert('Please provide four option')
          }
        }
  };
  
  // Handle form submission logic here
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedTopicid);
    console.log(formValues);

    const response = await fetch(`http://127.0.0.1:1337/question/add/${selectedTopicid}`,{
        method :'POST' ,
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ ...formValues})
    });
    console.log('jhjh' , response);
    
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
                            <button className=' pl-1'
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
                        Total Questions
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-500">
                    {/* {totalTopics} */}
                    </div>
                </div>
            
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 grid-cols-1 mb-6 lg:grid-cols-2">
                <form onSubmit={handleSubmit} className="">
                <div className="mb-4">
                    <label htmlFor="topic" className="block mb-2">
                    Topic:
                    </label>
                    <select
                        id="topic"
                        name="topic"
                        value={formValues.topic}
                        onChange={ (e)=>{
                            handleChange(e);
                            const selectedIndex = e.target.selectedIndex;
                            const selectedId = topicid[selectedIndex -1];
                            setSelectedTopicId(selectedId)
                        } }
                        className="w-full px-3 py-2 border border-gray-300 rounded relative  h-10 text-sm transition-all bg-white border-b outline-none appearance-none focus-visible:outline-none peer text-slate-500 autofill:bg-white focus:border-emerald-500 focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    >
                        <option value="" className={`hover:bg-cyan-600`}>Select topic</option>
                       {topics.map((topic , index)=>(
                        <option key={index} value={topic}>
                            {topic}
                        </option>
                       ))}
                    </select>

                   

                </div>

                <div className="mb-4">
                    <label htmlFor="questionType" className="block mb-2">
                    Question Type:
                    </label>
                    <div className="flex items-center">
                    <input
                        type="radio"
                        id="option"
                        name="questionType"
                        value="option"
                        checked={formValues.questionType === 'option'}
                        onChange={handleChange}
                        className="mr-2 boder-2 border-cyan-600 ring-cyan-600 checked:bg-cyan-600 checked:border-cyan-600 checked:ring-cyan-600 checked:hover:border-cyan-600 checked:focus:border-cyan-600 checked:hover:ring-cyan-500"
                    />
                    <label htmlFor="option" className="mr-4">
                        Option
                    </label>
                   
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="question" className="block mb-2  checked:border-cyan-600 focus:border-cyan-600">
                    Question:
                    </label>
                    <textarea
                    id="question"
                    name="question"
                    value={formValues.question}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded checked:border-cyan-600 focus:border-emerald-500 "
                    ></textarea>
                </div>

                {formValues.questionType === 'option' && (
                    <div className="mb-4">
                    <p className="mb-2">Options:</p>
                    <input
                        type="text"
                        placeholder="Enter option"
                        onChange={handleOptionChange}
                        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded  focus:border-emerald-500"
                    />
                    <button
                        type="button"
                        onClick={handleAddOption}
                      
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                        >
                        Add
                        </button>
                    {/* Render added options */}
                    {formValues.options.map((option, index) => (
                        <input
                        type="text"
                        key={index}
                        value={option}
                        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded checked:focus:border-emerald-500"
                        readOnly
                        />
                    ))}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="answer" className="block mb-2">
                    Answer:
                    </label>
                    <select
                    id="answer"
                    name="answer"
                    value={formValues.answer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-emerald-500 rounded  "
                    >
                    {formValues.questionType === 'option' &&(
                        <option value="" className=' hover:bg-cyan-600'>Select option</option>
                    )}
                    {formValues.questionType === 'option' && (
                        formValues.options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))
                    )}
                    </select>
                </div>

                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
                </form>

            </div>
            
        </div>
      </div>
    </div>
  )
}

export default addQue
