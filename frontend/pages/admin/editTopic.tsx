import React, { useEffect, useState } from 'react'
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";


interface EditProps {
  topicData : {
   id:string
    title :string
  }
}
const EditTopic = ({topicData} : EditProps) => {
  const [visible, setVisible] = React.useState(false);
  const [topic ,setTopic] = useState({title:""});
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  useEffect(() => {
    // Update the topic state when topicData prop changes
    setTopic(topicData);
  }, [topicData]);
  const handleEditTopic = async(e:React.MouseEvent<HTMLButtonElement>)=>{
  // Validate the title field
    if (topic.title.trim() === "") {
      alert("Title is required");
      return;
    }
    try {
      console.log(topic);
      
      const response = await fetch(`http://127.0.0.1:1337/topic/edit/${topicData.id}`,{
        method:'PATCH',
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
  return (
    <div>
       <Button auto css={{backgroundColor :'$cyan700'}}  onPress={handler}>
        Edit
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
     
      <div className="relative my-6">
        <input
          id="title"
          type="text"
          name="title"
          value={topic.title}
          placeholder="your name"
          className="peer relative h-10 w-full rounded border focus:border-cyan-600 border-cyan-500 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500     invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={handleChange}
        />
        <label
          htmlFor="id-01"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-cyan-700 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Your name
        </label>
      </div>
  

          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto css={{backgroundColor :'$cyan700'}}  onPress={handleEditTopic as any}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditTopic
