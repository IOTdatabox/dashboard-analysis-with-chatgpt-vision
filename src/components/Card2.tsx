import Image from 'next/legacy/image';
import React from 'react';

const Card2 = ({ name, detail, occupation }: any) => {
  return (
    <div className='flex'>
      <div className="w-[423px] h-[230px] ml-[100px] mr-[22px]">
        <div className="w-[392px] h-48 flex-col justify-start items-start gap-[30px] inline-flex">
          <div className="flex">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '7px' }}
            >
              <g id="Iconly/Sharp/Bold/Star 12">
                <path
                  id="Fill 268"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1664 6.83479L8.99968 0.982544L6.83368 6.83479L0.982178 9.00004L6.83368 11.1653L8.99968 17.0175L11.1664 11.1653L17.0179 9.00004L11.1664 6.83479Z"
                  fill="#C2CDE7"
                />
              </g>
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '7px' }}
            >
              <g id="Iconly/Sharp/Bold/Star 12">
                <path
                  id="Fill 268"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1664 6.83479L8.99968 0.982544L6.83368 6.83479L0.982178 9.00004L6.83368 11.1653L8.99968 17.0175L11.1664 11.1653L17.0179 9.00004L11.1664 6.83479Z"
                  fill="#C2CDE7"
                />
              </g>
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '7px' }}
            >
              <g id="Iconly/Sharp/Bold/Star 12">
                <path
                  id="Fill 268"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1664 6.83479L8.99968 0.982544L6.83368 6.83479L0.982178 9.00004L6.83368 11.1653L8.99968 17.0175L11.1664 11.1653L17.0179 9.00004L11.1664 6.83479Z"
                  fill="#C2CDE7"
                />
              </g>
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '7px' }}
            >
              <g id="Iconly/Sharp/Bold/Star 12">
                <path
                  id="Fill 268"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1664 6.83479L8.99968 0.982544L6.83368 6.83479L0.982178 9.00004L6.83368 11.1653L8.99968 17.0175L11.1664 11.1653L17.0179 9.00004L11.1664 6.83479Z"
                  fill="#C2CDE7"
                />
              </g>
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Iconly/Sharp/Bold/Star 12">
                <path
                  id="Fill 268"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1664 6.83479L8.99968 0.982544L6.83368 6.83479L0.982178 9.00004L6.83368 11.1653L8.99968 17.0175L11.1664 11.1653L17.0179 9.00004L11.1664 6.83479Z"
                  fill="#C2CDE7"
                />
              </g>
            </svg>
          </div>
          <div className="w-[345px] text-slate-200 text-base leading-7 tracking-tight">
            {detail}
          </div>
          <div className="flex justify-evenly items-center">
            <div className="w-[54px] h-[54px] bg-red-400 rounded-[300px] flex-col justify-start items-start inline-flex">
              <img
                className="w-full h-full rounded-[300px] object-cover"
                src="/img/cardImg1.png"
              />
            </div>
            <div className="w-[165px] h-[50px] ml-5">
              <div className="text-slate-300 text-base font-semibold leading-7">
                {name}
              </div>
              <div className="text-slate-400 text-[13px] font-normal leading-normal">
                {occupation}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-px h-[156px] opacity-70 border border-gray-800" />
    </div>
  );
};

export default Card2;
