import Image from 'next/image'
const Footer = () => {
  return (
    <>
    {/* ------------------------------------------------------------------------------------------ */}

    <form action="">
        <div
          className=" w-full bg-auto bg-no-repeat bg-center"
          style={{ background: "url(/image/question.png)",backgroundSize: "cover", height: "376px" }}
        >
          <div className="container text-center">
            <div className="pt-5">
              <p className="font-bold text-2xl text-white">
                DO YOU HAVE ANY QUESTION ?
              </p>
            </div>
            <div className="mt-4">
              <input
                className="h-10 pr-52 pl-3 rounded-xl placeholder-gray-500 border pright-repon"
                placeholder="Name"
                type="text"
              />
            </div>
            <div className="mt-4">
              <input
                className="h-10 pr-52 pl-3 rounded-xl placeholder-gray-500 border pright-repon"
                placeholder="Email"
                type="text"
              />
            </div>
            <div className="mt-4">
              <input
                className="h-10 pr-52 pl-3 rounded-xl placeholder-gray-500 border pright-repon"
                placeholder="Message"
                type="text"
              />
            </div>
            <div className="mt-3 ml-24">
              <button
                type="submit"
                className="w-28 h-10 rounded-xl text-white text-base cursor-pointer bg-sky-500 hover:bg-sky-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <footer className="bg-neutral-800">
        <div className="container grid content-center h-full py-8">
          <div className="w-full row">
            <div className=" grid justify-center col-md-4">
              <div>
                <p className="text-xl text-white font-bold">
                  ABOUT TREK BOOKING
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
            </div>
            <div className="  grid justify-center col-md-4">
              <div>
                <p className="text-xl text-white font-bold">
                  ABOUT TREK BOOKING
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
            </div>
            <div className=" grid justify-center col-md-4">
              <div>
                <p className="text-xl text-white font-bold">
                  ABOUT TREK BOOKING
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
              <div className="grid justify-center">
                <p className="text-base text-white ">
                  Lorem ipsum dolor sit amet{" "}
                </p>
              </div>
             <div className="">
                <Image src={"/image/bocongthuong.png"}
                width={180}
                height={67}
                alt=""></Image>
             </div>
            </div>
          </div>
        </div>
        <div className='w-full h-10 flex justify-center border-t'>
          <p className='text-white text-base pt-2'>Copyright © 2024 Trek Booking. All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
