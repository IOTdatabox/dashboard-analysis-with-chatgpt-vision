import React, { useState } from 'react';
import { supabase } from '../client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companySize: '',
  });

  const [termsChecked, setTermsChecked] = useState(false);

  const router = useRouter();

  const handleChange = (event: any) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const email = isValidEmail(formData.email);

  const dataStore = async (userName: any, userEmail: any, companySize: any) => {
    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          name: userName,
          email: userEmail,
          companySize: companySize,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error.message);
      return;
    }
  };

  const handleSubmit = async () => {
    try {
      //name
      if (formData.name.trim() === '') {
        toast('Name cannot be empty!', { type: 'error' });
        return;
      }
      //email
      if (formData.email.trim() === '') {
        toast('Email cannot be empty!', { type: 'error' });
        return;
      } else if (!email) {
        toast('Please enter valid email!', { type: 'error' });
        return;
      }
      //companySize
      if (formData.companySize.trim() === '') {
        toast('Please select a company size!', { type: 'error' });
        return;
      }
      //password
      if (formData.password.trim() === '') {
        toast('Password cannot be empty!', { type: 'error' });
        return;
      }
      //checked
      if (!termsChecked) {
        toast('Please accept the Terms & Conditions!', { type: 'error' });
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            companySize: formData.companySize,
          },
        },
      });
      if (error) throw error;
      alert('Check your email for verification link');
      router.push('/');
      const userDetails = await dataStore(
        data.user?.user_metadata.name,
        data.user?.email,
        data.user?.user_metadata.companySize
      );
    } catch (error) {
      alert(error);
    }
  };

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
              name="name"
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
              name="email"
              type="email"
              onChange={handleChange}
              className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2"
              placeholder="email@hotmail.com"
            />
            <label
              htmlFor="companySize"
              className="block mb-2 mt-3 text-white text-lg font-normal"
            >
              COMPANY SIZE
            </label>
            <select
              id="companySize"
              name="companySize"
              onChange={handleChange}
              className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2"
            >
              <option value="">Select Company Size</option>
              <option value="Just me">Just me</option>
              <option value="2 to 5">2 to 5</option>
              <option value="5 to 10">5 to 10</option>
              <option value="11 to 25">11 to 25</option>
              <option value="26 to 50">26 to 50</option>
              <option value="51 to 200">51 to 200</option>
              <option value="201 to 1,000">201 to 1,000</option>
              <option value="1000+">1000+</option>
            </select>
            <label
              htmlFor="name"
              className="block mb-2 text-white text-lg font-normal"
            >
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-4"
              placeholder="*******"
            />
            <div className="flex items-center mb-5">
              <label htmlFor="termsCheckbox" className="text-white mr-2">
                I have read the Terms & Conditions
              </label>
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={termsChecked}
                onChange={handleCheckboxChange}
              />
            </div>

            <div className=" flex justify-between">
              <button
                onClick={() => handleSubmit()}
                className="w-[150px] h-10 bg-[#C742C1] rounded-[10px] text-white text-lg font-bold "
              >
                SIGN UP
              </button>

              <Link href="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
