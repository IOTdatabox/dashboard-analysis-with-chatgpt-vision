import React, {useState} from 'react';
import { supabase } from '../client';
import Link from 'next/link';

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (event: any) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name] : event.target.value
      }
    })
  }

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      if (error) throw error
      alert('Check your email for verification link')
      console.log(data);
    } catch(error) {
      alert(error)
    }
  }

  return (
    <div className="max-w-screen-md mx-auto mt-40">
      <div className="text-[#FFF]  rounded-lg overflow-hidden lg:p-10 flex justify-center items-center ">
        <div className="w-[100%]">
          <h2 className="text-center text-[#ABEB78] text-4xl font-bold">
            SIGN UP
          </h2>
          <div className="mt-5">
            <label
              htmlFor="name"
              className="block mb-2 mt-3 text-white text-lg font-normal"
            >
              NAME
            </label>
            <input
              id="name"
              name='name'
              type="text"
              onChange={handleChange}
              className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2"
              placeholder="name"
            />
            <label
              htmlFor="email"
              className="block mb-2 mt-3 text-white text-lg font-normal"
            >
              EMAIL
            </label>
            <input
              id="email"
              name='email'
              type="email"
              onChange={handleChange}
              className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2"
              placeholder="email@hotmail.com"
            />
            <label
              htmlFor="name"
              className="block mb-2 text-white text-lg font-normal"
            >
              PASSWORD
            </label>
            <input
              id="password"
              name='password'
              type="password"
              onChange={handleChange}
              className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-4"
              placeholder="*******"
            />

            <div className=' flex justify-between'>
            <button onClick={() => handleSubmit()} className="w-[150px] h-10 bg-[#C742C1] rounded-[10px] text-white text-lg font-bold ">
              SIGN UP
            </button>

            <Link href='/login'>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
