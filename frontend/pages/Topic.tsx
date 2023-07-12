import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card , Radio, Text } from "@nextui-org/react";

interface Topic {
  id:string;
  title:string
}
const Topics = () => {
    
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
    <>
      {
        selectedTopicid ? 
        (
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
         
        ):
        (

      <section className=" lg:pl-24 lg:pr-14 ">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="block mb-2 text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:ml-32 ">
          {topics.map(( data , index)=>(

          <div className=" py-5" key={index}>
            <Card onClick={()=>fetchAllTopics(data.id)}
              isPressable
              isHoverable
              variant="bordered"
              css={{ mw: "400px" }}
            >
                <Card.Body >
                  <Text>{data.title}</Text>
                </Card.Body>
            </Card>
            
          </div>
          ))}

          </div>
        </div>
      </section> 
        )
      }
    </>
  );
};

export default Topics;

