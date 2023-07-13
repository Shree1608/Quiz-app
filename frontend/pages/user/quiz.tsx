import { Radio } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
interface Topic {
  id:string;
  title:string
}
const quiz = () => {
       
  const [topicid ,setTopicid] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicid , setSelectedTopicId]= useState<any>(undefined);

  useEffect(() => {
      const fetchTopics = async () => {
        try {
          const response = await fetch('http://127.0.0.1:1337/topic/find', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('jhgjhg' ,selectedTopicid);
          
          const data = await response.json();
          console.log(data.topics);
          setTopics(data.topics.map((topic :any)=> topic))
        } catch (error) {
          console.log(error);
        }
      };
      fetchTopics();
    }, []);
    
  
  const fetchAllTopics = async (titleId :string)=>{
        const response = await fetch(`http://127.0.0.1:1337/questions/${titleId}`,{
        method :'GET' ,
        headers :{
            'Content-Type' : 'application/json'
        },
      
    });
   
    
    const headings = await response.json()
    setSelectedTopicId(headings)
    console.log('jhjh' , headings);
       };
  return (
 
    <div>

    {selectedTopicid.Questions.map((topic:any ,index:any)=>(
      <div key={index}>
      <h1>{topic.title}</h1>
    {topic.question.map((que:any , index:any)=>(
        <div key={index}>

          <h1>{que.question}</h1>

          {/* {que.options.map((opt:any , index:any)=>( */}
          <div>
          <Radio.Group  defaultValue="">
            <Radio value="1">{que.options[0]}</Radio>
            <Radio value="2">{que.options[1]}</Radio>
            <Radio value="3">{que.options[2]}</Radio>
            <Radio value="4">{que.options[3]}</Radio>
          </Radio.Group>
          </div>
          {/* ))} */}
      </div>
    ))}
   </div>
    ))}
  </div>
  )
}

export default quiz
