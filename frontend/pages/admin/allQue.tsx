import React, { useEffect, useState } from 'react'
import { Button, Modal,Text } from '@nextui-org/react';
import { Table } from 'flowbite-react'
import Link from 'next/link';


const allQue = () => {
    const [visible1, setVisible1] = React.useState(false);
    const handler = () => setVisible1(true);
    const closeHandler = () => {
      setVisible1(false);
      console.log("closed");
    };
  
    const [que, setQue] = useState<any[]>([]);
   

 
 

    useEffect(() =>{
        const fetchQuestions = async()=>{
            try {
                const response = await fetch(`http://127.0.0.1:1337/questions/all`,{
                    method:'GET',
                    headers:{
                        'Content-Type' : 'application/json'
                    }
                });
                const data = await response.json()
                console.log('fdf',data.all);
                setQue(data.all)
            } catch (error) {
                
            }
        };
        fetchQuestions();
    },[])
  return (
    <div>
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
                        Total Question
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-500">
                    {/* {totalTopics} */}
                    </div>
                </div>
                
            </div>
            <Table hoverable className='mt-5'>
      <Table.Head>
        <Table.HeadCell>
          Index
        </Table.HeadCell>
        <Table.HeadCell>
          Topic
        </Table.HeadCell>
        <Table.HeadCell>
          Question
        </Table.HeadCell>
        <Table.HeadCell>
          options
        </Table.HeadCell>
        
        <Table.HeadCell>
        answer
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
        {que.map((form ,index)=>(
        <Table.Row key={form.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index+1}
          </Table.Cell>
          <Table.Cell>
           {form.topic.title}
          </Table.Cell>
          <Table.Cell>
          {form.question}
          </Table.Cell>
          <Table.Cell>
              <ul className=' list-decimal'>
                {form.options.map((option:any , index:number)=>(
                    <li key={index} >{option}</li>
                ))}
              </ul>
          </Table.Cell>
          <Table.Cell>
            {form.answer}
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
          <Button auto flat color="error" 
          onPress={closeHandler}>
            No
          </Button>
          <Button auto css={{backgroundColor :'$cyan700'}} onPress={closeHandler} 
        //   onClick={()=> handleDeleteTopic(form.id)} 
           >
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
    </div>
  )
}

export default allQue
