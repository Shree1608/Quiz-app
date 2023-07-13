import React, { useEffect, useState } from 'react'
import { Button, Modal,Text } from '@nextui-org/react';
import { Table } from 'flowbite-react'
import Link from 'next/link';
import CommonDash from './commonDash';


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
        <CommonDash/>
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
