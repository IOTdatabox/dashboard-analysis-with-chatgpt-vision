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

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      try {
        const { data, error } = await supabase
          .from('results')
          .select()
          .eq('token', token);

        if (error) {
          throw error;
        }
        setData(data);
        // console.log(data);
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

  const improve = JSON.parse(data[0].improvements || '[]');
  const improve1 = improve[0];

  const parsedData = JSON.parse(improve1 || '[]');

  const positives = JSON.parse(data[0].positives || '[]');
  const parsedPositives = positives[0];

  const parsedPositivesData = JSON.parse(parsedPositives || '[]');

  const rating = JSON.parse(data[0].rating || '[]');

  const data2 = rating.map((item: { score: any }) => item.score);

  const numericData = data2.map(Number);

  // Calculate the average
  const sum = numericData.reduce((acc: any, value: any) => acc + value, 0);
  const average = sum / numericData.length;

  // Map the average to a scale out of 10
  const averageOutOf10 = (average / 10) * 10;

  return (
    <div className="container px-5 py-4  mx-auto">
      {isLoading && <Spinner />}
      <div className="  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-14 content-center">
        {/* image section */}
        <div>
          <h1 className="text-white text-[50px] font-bold mb-5">
            Dashboard Design
          </h1>
          <div className="pl-4">
            <div className="w-[679px] h-[398px]">
              <img
                src={
                  data[0].image
                    ? `data:image;base64,${data[0].image}`
                    : '/img/background.jpg'
                }
                alt="photo"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="h-15 text-white text-[32px] font-extrabold my-5">
              Overall Score:{' '}
              <span className="text-lime-400 text-[34px]">
                {Math.round(averageOutOf10) || 0}/10
              </span>
            </h3>
            <div className="w-full bg-[#A1FD5966] rounded-full h-3.5 dark:bg-gray-700">
              <div
                className="bg-[#A1FC58] h-3.5 rounded-full"
                style={{ width: Math.round(averageOutOf10) * 10 + '%' }}
              ></div>
            </div>
            <h3 className="h-15 text-white text-[32px] font-extrabold my-5">
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
            </div>
          </div>
        </div>

        {/* Rating breakdown */}
        <div>
          <h3 className="text-white text-[32px] font-extrabold">
            Rating Breakdown
          </h3>
          {rating.map((item: any, i: any) => (
            <div key={item.title} className="mb-5">
              <div className="flex justify-between mb-2">
                <div className="text-white text-lg font-medium">
                  {item.title}
                </div>
                <div className="text-lime-200 text-lg font-normal">
                  {item.score}/10
                </div>
              </div>
              <div
                className="w-full bg-[#564060] rounded-full h-3 dark:bg-gray-700 mb-2"
                style={{
                  backgroundColor:
                    i == 0
                      ? '#DA7ED642'
                      : i == 1
                      ? '#E68D4C7A'
                      : i == 2
                      ? '#F7F97C66'
                      : i == 3
                      ? '#79C9EC8C'
                      : i == 4
                      ? '#97EC6F42'
                      : '#000000',
                }}
              >
                <div
                  className="h-3 rounded-full "
                  style={{
                    width: Math.round(item.score) * 10 + '%',
                    backgroundColor:
                      i == 0
                        ? '#da7ed6'
                        : i == 1
                        ? '#E68C4B'
                        : i == 2
                        ? '#F6F97C'
                        : i == 3
                        ? '#78C9EB'
                        : i == 4
                        ? '#96EC6E'
                        : '#000000',
                  }}
                ></div>
              </div>
              <p className="text-zinc-100 text-base font-light">
                {item.Description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Good Feedback */}
      <div className="bg-gray-700 p-5">
        <div className="ml-10">
          <h3 className="text-lime-300 text-[32px] font-extrabold my-5">
            Good Feedback
          </h3>
        </div>
        {parsedPositivesData.map((item: any, index: any) => (
          <div key={index} className="ml-16 mb-10">
            <h2 className="text-stone-50 text-[22px] font-medium">
              {index + 1}. {item.title}
            </h2>
            <p className="text-zinc-100 text-lg font-light pl-5 mt-5">
              {item.Description}
            </p>
          </div>
        ))}
      </div>

      {/* Areas for improvement */}
      <div className="mt-10 ml-10">
        <h3 className="h-15 text-[#f9a9a9] text-[30px] font-bold my-5">
          Areas for Improvement
        </h3>
        {parsedData.map((item: any, index: any) => (
          <div key={index} className="ml-5 mb-10">
            <h2 className="text-stone-50 text-[22px] font-medium">
              {index + 1}. {item.title}
            </h2>
            <p className="text-zinc-100 text-lg font-light pl-5 mt-5">
              {item.Description}
            </p>
            <p className="pl-5 mt-5">
              <span className="text-red-400 text-lg font-medium mr-3">
                Possible Solution:
              </span>
              <span className="text-zinc-100 text-lg font-light">
                {item.PossibleSolution}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
