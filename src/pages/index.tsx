import Image from 'next/image'
import { Inter } from 'next/font/google'
import InputForm from '@/components/InputForm'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="bg-[url('/img/background.jpg')] bg-cover bg-center w-screen h-screen">
      <InputForm />
    </div>
  )
}
