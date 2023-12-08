import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import Spinner from './spinner/Spinner';

const Hero2 = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    const file = acceptedFiles[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result?.toString());
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc('');
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [firstAnswer, setFirstAnswer] = useState('');
  const [secondAnswerOptions, setSecondAnswerOptions] = useState<string[]>([]);
  const [thirdAnswerOptions, setThirdAnswerOptions] = useState<string[]>([]);

  const [imageSrc, setImageSrc] = useState<string | null | undefined>('');
  const [id, setId] = useState({ user: { id: '' } });
  const [createdAt, setCreatedAt] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {}, [thirdAnswerOptions]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const data = localStorage.getItem('token');
      const parsedData = JSON.parse(data || '');
      setCreatedAt(parsedData.user.created_at);
      setToken(parsedData);
      setId(parsedData);
    }
  }, []);

  const router = useRouter();

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  function isTimeDifference12Hours(
    timeStr1: string | number | Date,
    timeStr2: string | number | Date
  ) {
    // Convert input time strings to Date objects
    const time1: any = new Date(timeStr1);
    const time2: any = new Date(timeStr2);

    // Calculate the difference in time in milliseconds
    const timeDifference = Math.abs(time1 - time2);
    console.log(timeDifference, 'timeDifference');

    // Define the threshold for 12 hours in milliseconds
    const twelveHours = 12 * 60 * 60 * 1000;
    console.log(twelveHours, 'twelveHours');

    // Check if the difference is exactly 12 hours
    const result = timeDifference > twelveHours;

    return result;
  }

  const onSubmitBtnClicked = async () => {

    const nameInput = document.getElementById('name') as HTMLInputElement;
      const name = nameInput.value.trim();
      if (
        name === '' ||
        !isValidEmail(email) ||
        imageSrc == null ||
        imageSrc == undefined ||
        imageSrc == ''
      ) {
        toast('Please fill up all form data', { type: 'error' });
        return;
      }

      setTimeout(() => {
        toast('An Email will be Sent in the next few minutes!', {
          type: 'success',
        });
        setIsLoading(false);
        router.push(`/thankyou?email=${email}`);
      }, 4000);

      setIsLoading(true);
      const base64String = imageSrc?.split(',')[1];

      const userId = id.user.id;
  
      const data = localStorage.getItem('token');
      const parsedData = JSON.parse(data || '');
      const userInfo = parsedData.user.user_metadata;

      const response = await fetch('/api/process-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64String,
          email: email,
          userId: userId,
          userName: name
        }),
      });

      console.log(response, 'openai-response');

      try {
        if (response.ok) {
          const data = await response.json();
          setFirstAnswer(data.data.firstAnswer);

          console.log(data.data.firstAnswer);

          setSecondAnswerOptions(data.data.secondAnswer.slice(1).split('*'));
          setThirdAnswerOptions(data.data.thirdAnswer.slice(1).split('*'));
          console.log(data);
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          console.log(errorData);
          toast('Error inside response!', { type: 'error' });
          console.error('Failed to fetch API');
          setIsLoading(false); // Stop loading in case of error
        }
      } catch (error) {
        toast('Internal Server Error!', { type: 'error' });
        console.error('Error:', error);
        setIsLoading(false); // Stop loading in case of error
      }
      
    // const currTime = new Date().toUTCString();

    // const result = isTimeDifference12Hours(createdAt, currTime);
    // console.log(result, 'result');

    // if (result) {
    //   toast('Your trial period is over. Please buy subscription to continue', {
    //     type: 'error',
    //   });
    // } else {
    //   const nameInput = document.getElementById('name') as HTMLInputElement;
    //   const name = nameInput.value.trim();
    //   if (
    //     name === '' ||
    //     !isValidEmail(email) ||
    //     imageSrc == null ||
    //     imageSrc == undefined ||
    //     imageSrc == ''
    //   ) {
    //     toast('Please fill up all form data', { type: 'error' });
    //     return;
    //   }

    //   setTimeout(() => {
    //     toast('An Email will be Sent in the next few minutes!', {
    //       type: 'success',
    //     });
    //     setIsLoading(false);
    //     router.push(`/thankyou?email=${email}`);
    //   }, 4000);

    //   setIsLoading(true);
    //   const base64String = imageSrc?.split(',')[1];

    //   const userId = id.user.id;

    //   const response = await fetch('/api/process-api', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       image: base64String,
    //       email: email,
    //       userId: userId,
    //     }),
    //   });

    //   console.log(response, 'openai-response');

    //   try {
    //     if (response.ok) {
    //       const data = await response.json();
    //       setFirstAnswer(data.data.firstAnswer);

    //       console.log(data.data.firstAnswer);

    //       setSecondAnswerOptions(data.data.secondAnswer.slice(1).split('*'));
    //       setThirdAnswerOptions(data.data.thirdAnswer.slice(1).split('*'));
    //       console.log(data);
    //       setIsLoading(false);
    //     } else {
    //       const errorData = await response.json();
    //       console.log(errorData);
    //       toast('Error inside response!', { type: 'error' });
    //       console.error('Failed to fetch API');
    //       setIsLoading(false); // Stop loading in case of error
    //     }
    //   } catch (error) {
    //     toast('Internal Server Error!', { type: 'error' });
    //     console.error('Error:', error);
    //     setIsLoading(false); // Stop loading in case of error
    //   }
    // }
  };

  return (
    <section className="text-gray-600 body-font  bg-[#414557] ">
      {isLoading && <Spinner />}
      <div className="container px-5 py-4  mx-auto  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-14 content-center">
        <div className="text-[#FFF]  rounded-lg overflow-hidden  lg:p-10 flex items-center justify-center  ">
          <div className="w-[100%]">
            <h1 className="text-white text-lg hero-title lg:w-2/3 ">
              Instant Dashboard Feedback
            </h1>
            <p className="hero-subtitle py-4">
              Another Pair of Eyes In Minutes
            </p>

            <div className=" text-center text-[#000] w-[100%]  rounded-[20px] grid grid-cols-1 lg:grid-cols-4 gap-1 p-5 lg:pl-0 lg:pr-0  lg:p-8 relative">
              <div className="text-center flex flex-col items-center">
                <img
                  src="/img/hero/1.png"
                  alt="phone"
                  className="h-[108px] w-[147px]"
                />
                <div>
                  <p className="mt-2 ml-8 text-center text-[#CB6699] text-2xl font-semibold font-['Poppins']">
                    UPLOAD
                  </p>
                  <p className="mt-2 ml-8 text-center text-white text-sm font-normal">
                    DRAG & DROP DASHBOARD SCREENSHOT
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-col items-center  mt-5 lg:mt-0">
                <img
                  src="/img/hero/2.png"
                  alt="phone"
                  className="h-[108px] w-[147px]"
                />
                <p className="mt-2 ml-8 text-center text-[#AB6FCF] text-2xl font-semibold font-['Poppins']">
                  EMAIL
                </p>
                <p className="mt-2 ml-8 text-center text-white text-sm font-normal">
                  CHECK YOUR <br /> EMAIL
                </p>
              </div>
              <div className="text-center flex flex-col items-center mt-5 lg:mt-0">
                <img
                  src="/img/hero/3.png"
                  alt="phone"
                  className="h-[108px] w-[147px]"
                />
                <p className="mt-2 ml-8 text-center text-[#6699CC] text-2xl font-semibold font-['Poppins']">
                  LINK
                </p>
                <p className="mt-2 ml-8 text-center text-white text-sm font-normal">
                  CLICK THE LINK IN YOUR EMAIL TO <br /> GO TO YOUR DASHBOARD
                  REPORT
                </p>
              </div>
              <div className="text-center flex flex-col items-center mt-5 lg:mt-0">
                <img
                  src="/img/hero/4.png"
                  alt="phone"
                  className="h-[108px] w-[147px]"
                />
                <p className="mt-2 ml-8 text-center text-[#35CCCD] text-2xl font-semibold font-['Poppins']">
                  REPORT
                </p>
                <p className="mt-2 ml-8 text-center text-white text-sm font-normal">
                  VIEW & <br /> ANALYZE YOUR PERSONALIZED DASHBOARD REPORT
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#FFF]  rounded-lg overflow-hidden  lg:p-10 flex  justify-center  ">
          <div className="w-[100%]">
            <h2 className="text-center text-[#ABEB78] text-4xl font-bold">
              GET STARTED NOW! ⬇️
            </h2>
            <div className="mt-5">
              <label
                htmlFor="name"
                className="block mb-2 text-white text-lg font-normal"
              >
                NAME
              </label>
              <input
                id="name"
                type="name"
                onChange={onNameChanged}
                className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2"
                placeholder="John doe"
              />
              <label
                htmlFor="email"
                className="block mb-2 mt-3 text-white text-lg font-normal"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={onEmailChanged}
                className="bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2"
                placeholder="email@hotmail.com"
              />

              <div className="mt-10 text-center">
                <div
                  {...getRootProps()}
                  className="w-auto h-[220px] bg-zinc-300 bg-opacity-0 rounded-[1px] border-2 border-white border-dashed flex   place-items-center items-center justify-center text-center text-white font-bold overflow-hidden"
                >
                  <input {...getInputProps()} />
                  {imageSrc && <img src={imageSrc} alt="Uploaded" />}
                  {!imageSrc &&
                    (isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <div className="text-[#FAC3F8] md:text-2xl text-[20px] font-medium">
                        DRAG + DROP YOUR FILE HERE
                      </div>
                    ))}
                </div>
                <div className="w-[75.06px] h-[78px] relative">
                </div>

                <div>
                  <button
                    onClick={() => {
                      token
                        ? onSubmitBtnClicked()
                        : (router.push('/login'), toast('To Analyze, Please Login First!', { type: 'error' }));
                    }}
                    className="w-[210px] h-14 bg-[#C742C1] rounded-[10px] text-white text-lg font-bold "
                  >
                    ANALYZE NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
