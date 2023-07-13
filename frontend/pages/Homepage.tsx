import React from 'react'
import Image from 'next/image'
import { Button } from '@material-tailwind/react'
const features = [
    {
      name: 'Push to deploy.',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    },
    {
      name: 'SSL certificates.',
      description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      
    },
    {
      name: 'Database backups.',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
      
    },
  ]
const Homepage = () => {
  return (
    <div className=' lg:pl-20 lg:pr-20 '>
       <div className="overflow-hidden bg-white py-10 sm:py-20 lg:h-[75vh]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 ">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-cyan-600">Learn faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make skills and knowledge</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Quizzes for all
              Actionable insights. Smart proctoring. Choose a professional quiz maker app that covers all the bases.
              </p>
              <a href="/Topic">
              <Button variant="gradient" size="sm"  className="mt-6 bg-cyan-600 hover:bg-cyan-800 text-white rounded-lg">
            <span>
              Start Quiz

              </span>
          </Button>
              </a>
            </div>
          </div>
        <Image width={500} height={600} className='lg:ml-14 rounded-md shadow-xl shadow-gray-600  ' src="https://media.istockphoto.com/id/1398473177/photo/questionnaire-with-checkboxes-filling-survey-form-online-answer-questions.jpg?s=612x612&w=0&k=20&c=sgZY6ojUqB0goVyn_9fKLfeyZ6lyWjSb3-FQjgeUPec=" alt=''/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Homepage
