/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
import Searchcart from "./searchcart";

const Homepage = () => {
  return (
    <>
      <div>
        <Searchcart />
        <div className="slider p-12 backgr-home">
          <h1 className="pb-4 pl-6 font-bold">Plenty of hotel selections</h1>
          <Carousel>
            <Carousel.Item>
              <div className="flex slider-home">
                <img
                  className="col-3"
                  src="/image/slider1.png"
                  alt="First slide"
                />
                <img
                  className="col-3"
                  src="/image/slider2.png"
                  alt="Second slide"
                />
                <img
                  className="col-3"
                  src="/image/slider3.png"
                  alt="Third slide"
                />
                <img
                  className="col-3"
                  src="/image/slider4.png"
                  alt="Fourth slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex slider-home">
                <img
                  className="col-3"
                  src="/image/slider4.png"
                  alt="First slide"
                />
                <img
                  className="col-3"
                  src="/image/slider3.png"
                  alt="Second slide"
                />
                <img
                  className="col-3"
                  src="/image/slider2.png"
                  alt="Third slide"
                />
                <img
                  className="col-3"
                  src="/image/slider1.png"
                  alt="Fourth slide"
                />
              </div>
            </Carousel.Item>
            {/* Define more Carousel.Items for additional slides */}
          </Carousel>
        </div>
        <div className="villas p-12 backgr-home">
          <h1 className="pb-4 pl-6 font-bold text-small">
            Explore various villas and apartments at Trek Booking
          </h1>
          <div className=" row">
            <div className="col col-6">
              <img className="w-100" src="/image/Villa.png" alt="" />
            </div>
            <div className="col col-6">
              <img className="w-100" src="/image/Apartments.png" alt="" />
            </div>
          </div>
        </div>
        <div className="content-page p-12 backgr-home relative">
          <h1 className="pb-4 pl-6 font-bold text-center">
            Lorem ipsum dolor sit
          </h1>
          <div className="line">
            <img src="/image/linecontent.png" alt="" />
          </div>
          <div className="cham">
            <img src="/image/cham.png" alt="" />
          </div>
          <div className="cham1">
            <img src="/image/cham.png" alt="" />
          </div>
          <div className="cham2">
            <img src="/image/cham.png" alt="" />
          </div>
          <div className="cham3">
            <img src="/image/cham.png" alt="" />
          </div>
          <div className="row reponsive-content pb-12">
            <div className="col col-lg-6 col-md-12  col-sm-12 col-12 img-reponsive-1024">
              <img src="/image/content1.png" alt="" />
            </div>

            <div className=" col col-lg-6 col-md-12 col-sm-12 col-12  text-content reponsive-content">
              <p className="text-blackish font-bold text-xl  text-content-wrap text-center-1024 width-70 float-right  magin-r-0">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <p className="text-center-1024 width-70 float-right  magin-r-0">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse sapien suscipit interdum purus malesuada tellus
                mauris. Turpis libero congue viverra faucibus pulvinar odio
                purus consectetur. Potenti mollis non odio suspendisse turpis
                egestas sit. Sit nisi dictum orci nulla risus platea suscipit.
              </p>
            </div>
          </div>

          <div className="row reponsive-content pb-12">
            <div className=" col col-lg-6 col-md-12 col-sm-12 col-12  text-content reponsive-content">
              <p className="text-blackish font-bold text-xl  text-content-wrap text-center-1024 width-70 float-left  magin-r-0">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <p className="text-center-1024 width-70 float-left  magin-r-0">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse sapien suscipit interdum purus malesuada tellus
                mauris. Turpis libero congue viverra faucibus pulvinar odio
                purus consectetur. Potenti mollis non odio suspendisse turpis
                egestas sit. Sit nisi dictum orci nulla risus platea suscipit.
              </p>
            </div>
            <div className="col col-lg-6 col-md-12  col-sm-12 col-12 img-reponsive-1024 image-repons">
              <img src="/image/content2.png" alt="" />
            </div>
          </div>

          <div className="row reponsive-content pb-12">
            <div className="col col-lg-6 col-md-12  col-sm-12 col-12 img-reponsive-1024">
              <img src="/image/content3.png" alt="" />
            </div>

            <div className=" col col-lg-6 col-md-12 col-sm-12 col-12  text-content reponsive-content">
              <p className="text-blackish font-bold text-xl  text-content-wrap text-center-1024 width-70 float-right  magin-r-0">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <p className="text-center-1024 width-70 float-right  magin-r-0">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse sapien suscipit interdum purus malesuada tellus
                mauris. Turpis libero congue viverra faucibus pulvinar odio
                purus consectetur. Potenti mollis non odio suspendisse turpis
                egestas sit. Sit nisi dictum orci nulla risus platea suscipit.
              </p>
            </div>
          </div>

          <div className="row reponsive-content pb-12">
            <div className=" col col-lg-6 col-md-12 col-sm-12 col-12  text-content reponsive-content">
              <p className="text-blackish font-bold text-xl  text-content-wrap text-center-1024 width-70 float-left  magin-r-0">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <p className="text-center-1024 width-70 float-left  magin-r-0">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse sapien suscipit interdum purus malesuada tellus
                mauris. Turpis libero congue viverra faucibus pulvinar odio
                purus consectetur. Potenti mollis non odio suspendisse turpis
                egestas sit. Sit nisi dictum orci nulla risus platea suscipit.
              </p>
            </div>
            <div className="col col-lg-6 col-md-12  col-sm-12 col-12 img-reponsive-1024 image-repons">
              <img src="/image/content4.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div
        className=" w-full bg-auto bg-no-repeat bg-center flex justify-center backgr-home"
        style={{
          background: "url(/image/bg_city_hall.png)",
          backgroundSize: "cover",
          height: "957px",
          position: "relative",
        }}
      >
        <div style={{}}></div>
        <div
          className="w-3/4 h text-center grid content-center"
          style={{ height: "957px" }}
        >
          <p className="text-white font-bold text-4xl">
            Lorem ipsum dolor sit amet consectetur. Donec lectus consequat
            posuere eleifend orci platea.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------ */}
      <div className=" backgr-home">
        <div className="container ">
          <div className="text-center pt-12">
            <p className="font-bold text-4xl text-black">
              Enhance your trip the way you like it
            </p>
          </div>
          <div className="w-3/5 text-center m-auto">
            <p className="text-base font-normal">
              Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
              suspendisse sapien suscipit interdum purus malesuada tellus
              mauris. Turpis libero congue viverra faucibus pulvinar odio purus
              consectetur. Potenti mollis non odio suspendisse turpis egestas
              sit. Sit nisi dictum orci nulla risus platea suscipit.
            </p>
          </div>

          <div className="row pt-5 ">
            <div className="col-md-4 col-4  grid items-center justify-items-center justify-center card1 cursor-pointer">
              <Image
                src={"/image/boat1.png"}
                className="card1"
                width={410}
                height={550}
                alt="thuyen"
              ></Image>
              <div className="mt-3">
                <p className="text-lg font-bold">Tours and Attraction</p>
              </div>
            </div>
            <div className="col-md-4 col-4  grid items-center justify-items-center justify-center card1 cursor-pointer">
              <Image
                src={"/image/floatingHomeStay.png"}
                className="card1"
                width={410}
                height={550}
                alt="nha tren song"
              ></Image>
              <div className="mt-3">
                <p className="text-lg font-bold">Fun Activities</p>
              </div>
            </div>
            <div className="col-md-4 col-4  grid items-center justify-items-center justify-center card1 cursor-pointer">
              <Image
                src={"/image/tuktuk.png"}
                className="card1"
                width={410}
                height={550}
                alt="xe tuk tuk"
              ></Image>
              <div className="mt-3">
                <p className="text-lg font-bold">Travel Insurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------ */}
      <div className="container my-24 ">
        <div className="mb-5">
          <p className="font-bold text-4xl">Why book with Trek Booking ?</p>
        </div>

        <div className="w-full row">
          <div className="col-md-4 h-full pb-4">
            <div className="h-full rounded-20">
              <p className="title-whatbook pl-4 mt-3 text-lg">
                Lorem ipsum dolor sit
              </p>
              <div className="w-3/4  pl-4 text-base pb-4">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse
              </div>
            </div>
          </div>
          <div className="col-md-4  h-full pb-4">
            <div className="h-full rounded-20">
              <p className="title-whatbook pl-4 mt-3 text-lg">
                Lorem ipsum dolor sit
              </p>
              <div className="w-3/4  pl-4 text-base pb-4">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse
              </div>
            </div>
          </div>
          <div className="col-md-4  h-full  pb-4">
            <div className="h-full rounded-20">
              <p className="title-whatbook pl-4 mt-3 text-lg">
                Lorem ipsum dolor sit
              </p>
              <div className="w-3/4  pl-4 text-base pb-4">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vulputate
                suspendisse
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------ */}
      <div className=" p-12 backgr-home">
        <h1 className="pb-4 pl-6 font-bold text-small">
          Rediscover yourself in Asia and beyond
        </h1>
        <div className=" row">
          <div className="col-lg-3 col-md-3 col-3 relative">
            <img src="/image/jappan.png" alt="" />
          </div>
          <div className="col-lg-3 col-md-3 col-3">
            <img src="/image/indonesia.png" alt="" />
            <img className="pt-8" src="/image/taiwan.png" alt="" />
          </div>
          <div className="col-lg-3 col-md-3 col-3">
            <img src="/image/vietnam.png" alt="" />
            <img className="pt-8" src="/image/china.png" alt="" />
          </div>
          <div className="col-lg-3 col-md-3 col-3">
            <img src="/image/korea.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
