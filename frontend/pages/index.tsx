import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from './Nav'
import Homepage from './Homepage'
import Topics from './Topic'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div>

    <Nav/>
    <Homepage/>
   
   </div>
  )
}
