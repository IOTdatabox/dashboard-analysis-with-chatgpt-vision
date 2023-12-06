import { supabase } from '@/client';
import { useRouter } from 'next/router';

const ThankYou = () => {
  const router = useRouter();

  const email = router.query.email;
  console.log(email);

  return (
    <section>
      <div className="flex justify-center  mt-32">
        <h1 className="h-24 text-center text-white text-[80px] font-bold">
          THANK YOU!
        </h1>
      </div>
      <div className="flex justify-center  mt-36 md:mt-8">
        <p className="text-[#FAC3F8] text-center text-[32px] font-medium w-[100%] md:w-[60%]">
          An email will be sent to {email} in the next few minutes with a link to
          your personalized Dashboard feedback 😎
        </p>
      </div>
      <div className="mb-24 mt-12 flex justify-center">
        <div className=" text-center text-[#000] w-[100%] md:w-[32%]  rounded-[20px] grid grid-cols-1 lg:grid-cols-4 gap-1 p-5 lg:pl-0 lg:pr-0  lg:p-8 relative">
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
              CLICK THE LINK IN YOUR EMAIL TO <br /> GO TO YOUR DASHBOARD REPORT
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
    </section>
  );
};

export default ThankYou;
