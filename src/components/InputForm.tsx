// InputForm.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface InputFormProps {
  // You can define additional props here if needed
}

const InputForm: React.FC<InputFormProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [warning, setWarning] = useState<string>('');
  const [imageBase64, setImageBase64] = useState('');
  const [showWarning, setShowWarning] = useState(false);


  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (showWarning) {
      timeoutId = setTimeout(() => {
        setShowWarning(false);
      }, 1500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showWarning]);
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFileInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Clear the current file selection
    const input = event.target as HTMLInputElement;
    input.value = '';
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("AAAAAAAAAAAAAAAA")
    if (!name || !email) {
      setWarning('Please enter your name and email address first.');
      setShowWarning(true);
      console.log("showWarning", showWarning)
      return;
    }
    
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    if (uploadedFile) {
      const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'png' && fileExtension !== 'jpg') {
        setWarning('Please select a PNG or JPG file.');
        setShowWarning(true);
        console.log("showWarning", showWarning)
        return;
      }
      
      setFile(uploadedFile);
      
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (typeof e.target?.result === 'string') {
            // Extract the Base64 encoded string by removing the data URL prefix
            const base64String = e.target.result.split(',')[1];
            setImageBase64(base64String);
            console.log("❤❤❤❤❤❤");
            const response = await fetch('/api/analysis-dashboard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ image: base64String }),
            });

            if (response.ok) {
              const data = await response.json();
              router.push({
                pathname: '/response',
                query: {
                  response: JSON.stringify(data),
                  image: base64String, // Pass the image Base64 string
                  email: email,
                  name: name
                },
              });
            } else {
              console.error('Failed to fetch API');
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form>
        <div>
          <label className="block mb-2 font-poppins text-PPoppinsTextSize font-medium text-gray-900 dark:text-white">Username</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-PPoppinsTextSize text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input type="text"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-PPoppinsTextSize font-poppins border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Viacheslav"
              value={name} onChange={handleNameChange} />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-PPoppinsTextSize font-poppins text-gray-900 dark:text-white">Your Email</label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-PPoppinsTextSize font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              value={email} onChange={handleEmailChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 font-poppins text-PPoppinsTextSize text-gray-500 dark:text-gray-400"><span className="font-semibold font-poppins text-PPoppinsTextSize">Click to upload</span> or drag and drop</p>
              <p className=" mx-5 text-sm text-gray-500 dark:text-gray-400">PNG or JPG or GIF (We recommend not uploading files that are too complex.)</p>
            </div>
            <input type="file" onChange={handleFileChange} onClick={handleFileInputClick} className="hidden" />
          </label>
        </div>

        {showWarning && (
          <div className={`p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 ${showWarning ? 'fade-in' : 'fade-out'}`} role="alert">
            <span className="font-medium">Info alert!</span> {warning}
          </div>
        )}


      </form>
    </div>
  );
};

export default InputForm;
