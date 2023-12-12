import React, { useEffect, useState } from 'react';
import { supabase } from '@/client';
import { useRouter } from 'next/router';
import Spinner from './spinner/Spinner';

const Results = () => {
  const router = useRouter();
  const [data, setData] = useState<any>([{}]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (token: any) => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('results')
          .select()
          .eq('token', token);

        if (error) {
          throw error;
        }
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const token = router.query.token;

    if (token) {
      fetchData(token);
    }
  }, [router.query.token]);

  const improve = JSON.parse(data[0]?.improvements || '[]');
  const improve1 = improve[0];

  const parsedData = JSON.parse(improve1 || '[]');

  const positives = JSON.parse(data[0]?.positives || '[]');
  const parsedPositives = positives[0];

  const parsedPositivesData = JSON.parse(parsedPositives || '[]');

  const rating = JSON.parse(data[0]?.rating || '[]');

  const data2 = rating.map((item: { score: any }) => item.score);

  const numericData = data2.map(Number);

  // Calculate the average
  const sum = numericData.reduce((acc: any, value: any) => acc + value, 0);
  const average = sum / numericData.length;

  // Map the average to a scale out of 10
  const averageOutOf10 = (average / 10) * 10;

  return (
    <section className="container max-w-[90rem] mx-auto text-gray-600 body-font bg-gray-950">
      {isLoading && <Spinner />}

      <div className="w-[90%] md:w-[60%] lg:w-[50%] h-auto mx-auto p-2 bg-rose-600 bg-opacity-10 rounded-lg border border-rose-600 my-7">
        <p className="text-center text-white text-base font-normal leading-tight">
          This page will be deleted once you leave this page - Create an account
          to save feedback
        </p>
      </div>
      <h1 className="w-[80%] md:w-[40%] lg:w-[37%] mx-auto text-transparent bg-gradient-to-r from-[#EBF1FF] to-[#B3C0DE] bg-clip-text text-[58px] md:text-[60px] font-bold leading-[76.80px]">
        Name Dashboard
      </h1>
      {/* image section */}
      <div className="w-[80%] h-[448px] mx-auto rounded-lg mt-16 mb-16">
        <img
          src={
            data[0]?.image
              ? `data:image;base64,${data[0]?.image}`
              : '/img/background.jpg'
          }
          alt="photo"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* <h3 className="h-15 text-white text-[32px] font-extrabold my-5">
              Overall Score:{' '}
              <span className="text-lime-400 text-[34px]">
                {Math.round(averageOutOf10) || 0}/10
              </span>
            </h3>
            <div className="w-full bg-[rgba(161,253,89,0.259)] rounded-full h-3.5 dark:bg-gray-700">
              <div
                className="bg-[#A1FC58] h-3.5 rounded-full"
                style={{ width: Math.round(averageOutOf10) * 10 + '%' }}
              ></div>
            </div> */}
      {/* <h3 className="h-15 text-white text-[32px] font-extrabold my-5">
              Areas for Improvement:
            </h3>

            <div className="text-stone-50 text-lg font-medium flex flex-wrap w-full">
              {parsedData.map((item: any) => (
                <span
                  key={item.title}
                  className="bg-red-400 rounded-[10px] p-1 px-2 mr-3 mb-5"
                >
                  {item.title}
                </span>
              ))}
            </div> */}

      {/* Rating breakdown */}
      <div>
        <h3 className="w-[30%] text-transparent bg-gradient-to-r from-[#EBF1FF] to-[#B3C0DE] bg-clip-text text-[32px] font-extrabold mb-8">
          Rating Breakdown
        </h3>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rating.map((item: any, i: any) => (
            <li className="col-span-1 p-4 bg-neutral-900 rounded-2xl border border-gray-900 justify-start items-center gap-4 inline-flex">
              <div className="p-2 bg-white bg-opacity-10 rounded-xl justify-start items-start gap-2 flex">
                <div className="w-10 h-10 justify-center items-center flex">
                  <div className="w-10 h-10 relative"></div>
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch justify-between items-center inline-block lg:inline-flex">
                  <div className="grow shrink basis-0 text-white text-base font-medium">
                    {item.title}
                  </div>
                  <div className="rounded justify-start items-center gap-2 flex">
                    <div className="w-[142px] h-3 relative">
                      <div className="w-[142px] h-3 left-0 top-0 absolute bg-gray-800 rounded" />
                      <div
                        className="h-3 left-0 top-0 absolute bg-emerald-600 rounded"
                        style={{ width: Math.round(item.score) * 10 + '%' }}
                      />
                    </div>
                    <div className="text-white text-base font-medium">
                      {item.score}/10
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-slate-200 text-base font-normal leading-7">
                  {item.Description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Good Feedback */}
      <div className="w-full px-4 py-6 bg-white bg-opacity-5 rounded-2xl flex-col justify-start items-start gap-8 inline-flex mt-16">
        <h3 className="w-[70%] md:w-[30%] text-transparent bg-gradient-to-r from-[#EBF1FF] to-[#B3C0DE] bg-clip-text text-[32px] font-extrabold">
          Good Feedback
        </h3>

        {parsedPositivesData.map((item: any, index: any) => (
          <div className="w-full h-auto p-4 rounded-2xl border border-gray-900 justify-start items-center gap-4 inline-flex">
            <div className="w-[52px] h-[52px] p-2 bg-white bg-opacity-10 rounded-xl justify-center items-center gap-2 flex">
              <div className="text-slate-300 text-xl font-normal leading-9">
                {index + 1}
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="grow shrink basis-0 text-white text-lg font-bold">
                  {item.title}
                </div>
              </div>
              <div className="self-stretch text-slate-300 text-base font-normal leading-7">
                {item.Description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Areas for improvement */}
      <div className="mt-16 pb-16">
        <h3 className="w-[70%] md:w-[30%] text-transparent bg-gradient-to-r from-[#EBF1FF] to-[#B3C0DE] bg-clip-text text-[32px] font-extrabold mb-8">
          Areas for Improvement
        </h3>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {parsedData.map((item: any, index: any) => (
            <li
              className={`col-span-1 p-4 bg-neutral-900 rounded-2xl border border-gray-900 justify-start items-center gap-4 inline-flex ${index === parsedData.length - 1 ? 'w-[204%]' : ''}`}
            >
              <div className="w-[52px] h-[52px] p-2 bg-white bg-opacity-10 rounded-xl justify-center items-center gap-2 flex">
                <div className="text-slate-300 text-xl font-normal leading-9">
                  {index + 1}
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch h-auto flex-col justify-start items-start flex">
                  <div className="self-stretch justify-between items-center inline-flex">
                    <div className="grow shrink basis-0 text-white text-lg font-bold">
                      {item.title}
                    </div>
                  </div>
                  <div className="self-stretch text-slate-300 text-base font-normal leading-7">
                    {item.Description}
                  </div>
                </div>
                <div className="self-stretch justify-between items-start inline-flex">
                  <div className="grow shrink basis-0">
                    <span className="text-emerald-600 text-base font-normal leading-7">
                      Possible Solution:{' '}
                    </span>
                    <span className="text-slate-300 text-base font-normal leading-7">
                      {item.PossibleSolution}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Results;
