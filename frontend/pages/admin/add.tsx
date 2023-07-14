
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import EditTopic from './editTopic';
import { Button, Modal,Text } from '@nextui-org/react';
import Link from 'next/link';
import CommonDash from './commonDash';
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
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
    <CommonDash/>
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
