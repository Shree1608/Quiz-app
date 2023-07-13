import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card , Grid, Radio, Text } from "@nextui-org/react";
import { Chip } from "@material-tailwind/react";

interface Topic {
  id:string;
  title:string
}
const Topics = () => {
  const [answerShow , setAnswerShow] = useState(false)  
  const [topicid ,setTopicid] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicid , setSelectedTopicId]= useState<any>(undefined);
  const [ newPage , setNewPage] = useState(1)

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
          <div className="flex flex-col  px-5 bg-white  m-28">
            <div className="w- px-4 py-5 bg-white rounded-lg shadow">

                  {selectedTopicid.Questions.map((topic:any ,index:any)=>(
                    <div key={index}>
                      <div className=" px-4 py-5 bg-white">
                          <div className="text-sm font-medium text-gray-500 truncate">
                              Topic title
                          </div>
                          <div className="mt-4 text-3xl font-semibold text-cyan-600">
                           {topic.title}
                          </div>

                      </div>
                <div className="px-4 py-5">

                  {topic.question.map((que:any , index:any)=>(
                      <div key={index}>
                        <h1 className=" text-2xl text-gray-600 ">{index+1} . {que.question}</h1>
                        <div className=" ml-10 mr-10 mt-4">
                        <div className="mb-4 ">
                          <label htmlFor="questionType" className="block mb-5">
                          Options:
                          </label>
                          <div className="flex items-center border-2 rounded-md p-2 ">
                          <input
                              type="radio"
                              id="option"
                              name="questionType"
                              value="option"
                              className="mr-2 boder-2 border-cyan-600 ring-cyan-600 checked:bg-cyan-600 checked:border-cyan-600 checked:ring-cyan-600 checked:hover:border-cyan-600 checked:focus:border-cyan-600 checked:hover:ring-cyan-500"
                          />
                          <label htmlFor="option" className="mr-4">
                              {que.options[0]}
                          </label>
                          </div>
                        </div>
                        <div className="mb-4 border-2 rounded-md p-2 ">
                          
                            <div className="flex items-center">
                            <input
                                type="radio"
                                id="option"
                                name="questionType"
                                value="option"
                                className="mr-2 boder-2 border-cyan-600 ring-cyan-600 checked:bg-cyan-600 checked:border-cyan-600 checked:ring-cyan-600 checked:hover:border-cyan-600 checked:focus:border-cyan-600 checked:hover:ring-cyan-500"
                            />
                            <label htmlFor="option" className="mr-4">
                                {que.options[1]}
                            </label>
                          
                            </div>
                        </div>
                        <div className="mb-4 border-2 rounded-md p-2 ">
                          
                            <div className="flex items-center">
                            <input
                                type="radio"
                                id="option"
                                name="questionType"
                                value="option"
                                className="mr-2 boder-2 border-cyan-600 ring-cyan-600 checked:bg-cyan-600 checked:border-cyan-600 checked:ring-cyan-600 checked:hover:border-cyan-600 checked:focus:border-cyan-600 checked:hover:ring-cyan-500"
                            />
                            <label htmlFor="option" className="mr-4">
                                {que.options[2]}
                            </label>
                          
                            </div>
                        </div>
                        <div className="mb-4 border-2 rounded-md p-2 ">
                          
                            <div className="flex items-center">
                            <input
                                type="radio"
                                id="option"
                                name="questionType"
                                value="option"
                                className="mr-2 boder-2 border-cyan-600 ring-cyan-600 checked:bg-cyan-600 checked:border-cyan-600 checked:ring-cyan-600 checked:hover:border-cyan-600 checked:focus:border-cyan-600 checked:hover:ring-cyan-500"
                            />
                            <label htmlFor="option" className="mr-4">
                                {que.options[3]}
                            </label>
                          
                            </div>
                        </div>
                        <div className=" mb-4  rounded-md p-2 ">
                          <div className=" flex items-center">
                            <button
                             onClick={ () => 
                              {if(answerShow == true){
                                setAnswerShow(false)
                              }else{
                                setAnswerShow(true)}
                              }}
                            className=" bg-cyan-600 text-white rounded-md p-1.5 text-sm font-semibold">Show Answer</button>
                            {answerShow && 
                            <span className=" pl-5">{que.answer}</span>
                            }
                          </div>
                        </div>
                        </div>

                      
                        {/* ))} */}
                    </div>
                  ))}
                </div>
                {/* <div className=" grid grid-cols-2 gap-6 ml-14 mr-14"> 
                  <button disabled className=" bg-cyan-600 text-white rounded-md p-2  text-sm font-semibold">Previous</button>
                  <button 
                  
                  className=" bg-cyan-600 text-white rounded-md p-2  text-sm font-semibold">Next</button>
                </div>                 */}
                </div>

                  ))}
            </div>
          </div>
         
        ):
        (

      <section className=" lg:pl-24 lg:pr-14 " id="Topics">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="block mb-2 text-lg font-semibold text-primary">
                  Our Topics
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent Topics
                </h2>
                <p className="text-base text-body-color">
                Quiz titles are the key to a successful quiz marketing funnel. 
                Think of quiz title like the cover of a book. 
                The right title can catch audience's attention and inspire (or challenge) them to learn more.
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

