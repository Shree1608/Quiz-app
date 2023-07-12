
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import EditTopic from './editTopic';
import { Button, Modal,Text } from '@nextui-org/react';
import Link from 'next/link';
interface Topic {
  id : string;
  title : string;
}


const Add = () => {
  const [topic ,setTopic] = useState({title:""});
  const[allTopic , setallTopic] = useState<Topic[]>([])
  
  const [visible1, setVisible1] = React.useState(false);
  const handler = () => setVisible1(true);
  const closeHandler = () => {
    setVisible1(false);
    console.log("closed");
  };

  const handleDeleteTopic = async(topicId:string | undefined)=>{
    if( !topicId ) {
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:1337/topic/delete/${topicId}` ,{
        method :'DELETE' ,
        headers:{
          'Content-Type' : 'application/json'
        }
      });
      if(response.ok){
        setallTopic((prevTopics) => prevTopics.filter((topic) => topic.id !== topicId));
      }else{
        throw new Error('DELETE fails')
      }
    } catch (error) {
      console.log(error);
            
    }
  }
  
  useEffect(() => {
    fetchAllTopics();
  } ,[])
  const fetchAllTopics = async()=>{
    try {
      const response = await fetch('http://127.0.0.1:1337/topic/find' ,{
        method :'GET',
       headers :{
        'Content-Type' :'application/json'
       }
      })
      console.log(response);
      console.log(response.json);
      
      if(response.ok){
        const data = await response.json();
        const topics = data.topics
        const sortedTopics = topics.sort((a:Topic, b:Topic) => b.id.localeCompare(a.id));

        setallTopic(sortedTopics);
      }
    } catch (error) {
      console.log(error);
      
    }
  } 

 
  const handleAddTopic = async(e:React.MouseEvent<HTMLButtonElement>)=>{
   

  // Validate the title field
    if (topic.title.trim() === "") {
      alert("Title is required");
      return;
    }
    try {
      console.log(topic);
      
      const response = await fetch('http://127.0.0.1:1337/topic/add',{
        method:'POST',
        headers:{
          'Content-Type' :'application/json',
        },

        body :JSON.stringify({ ...topic})
      });
      if(response.ok){
        const content = await response.json();
        alert('topic added successfully')
        console.log(content);
        setallTopic((prevTopics) => [ ...prevTopics , content.topic])
      }else{
        if(response.status === 409){
          alert('title already exists')
        }else{
          throw new Error('add fails')
        }
      }
    } catch (error) {
      console.log(error);
      alert('fails to add topic')
      
    }
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const { name ,value} = e.target ;
      setTopic((prevTopic) =>({
        ...prevTopic,
        [name] : value
      }))
    
    
  }

  //count total topic 
  const totalTopics = allTopic.length
 
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
                    Total Topics
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-500">
                {totalTopics}
                </div>
            </div>
            {/* <div className="w-full px-4 py-6 lg:ml-5 md:ml-5 sm:ml-5 lg:mt-0 md:mt-0 sm:mt-0 mt-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total Topics
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-500">
                {totalTopics}
                </div>
            </div> */}
        
        </div>
    <div className="relative my-6">
        <input
          id="title"
          type="text"
          name="title"
         autoComplete='text'
          placeholder="Enter title of topic"
          className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-800 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={handleChange}
        />
        <label
          htmlFor="title"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-cyan-700 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Title
        </label>
      </div>
      <Button css={{backgroundColor :'$cyan700'}} shadow  onClick={handleAddTopic} >
        Add Topic
      </Button>

     
      <Table hoverable className='mt-5'>
      <Table.Head>
        <Table.HeadCell>
          Index
        </Table.HeadCell>
        <Table.HeadCell>
          Title
        </Table.HeadCell>
      
        <Table.HeadCell>
        
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Delete
          </span>
        </Table.HeadCell>
      
      </Table.Head>
      <Table.Body className="divide-y">
        {allTopic.map((topic ,index)=>(
        <Table.Row key={topic.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index+1}
          </Table.Cell>
          <Table.Cell>
           {topic.title}
          </Table.Cell>
          <Table.Cell>
          
                <EditTopic topicData ={topic}  />

          </Table.Cell>
          <Table.Cell>
      
            <Button auto css={{backgroundColor :'$red600'}}  onPress={handler}>
        Delete
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible1}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Are you sure
            <Text b size={18}>
              Delete this topic ??
            </Text>
          </Text>
        </Modal.Header>
        
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            No
          </Button>
          <Button auto css={{backgroundColor :'$cyan700'}} onPress={closeHandler} onClick={()=> handleDeleteTopic(topic.id)}  >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
          </Table.Cell>
        </Table.Row>

        ))}
      </Table.Body>
    </Table>

    </div>
    </div>
    </div>
  )
}

export default Add
