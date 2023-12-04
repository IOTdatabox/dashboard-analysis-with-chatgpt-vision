import React from 'react';

const Results = () => {
  return (
    <div>
      <div className="container px-5 py-4  mx-auto  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-14 content-center">
        <div>
          <h1 className="h-20 text-white text-[40px] font-bold">
            Dashboard Design
          </h1>
          <div className="m-10">
            <img src="/img/background.jpg" alt="photo" />
            <h3 className="h-15 text-white text-[30px] font-bold my-5">
              Overall Score: <span className="text-[#86e33d]">7/10</span>
            </h3>
            <div className="w-full bg-[#587e44] rounded-full h-3.5 dark:bg-gray-700">
              <div className="bg-[#a1fd59] h-3.5 rounded-full w-[45%]"></div>
            </div>
            <h3 className="h-15 text-white text-[30px] font-bold my-5">
              Areas for Improvement:
            </h3>
            <div className="text-white flex flex-wrap px-5 w-full">
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Data Visualization Diversity
              </span>
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Information Density
              </span>
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Real-time Data Indicators
              </span>
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Interactive Elements
              </span>
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Data Contextualization
              </span>
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Responsive Design
              </span>
              <span className="bg-[#df6e6e] rounded-lg p-1 mr-3 mb-5">
                Actionable Insights
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="h-20 text-white text-[30px] font-bold">
            Rating Breakdown
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Results;
