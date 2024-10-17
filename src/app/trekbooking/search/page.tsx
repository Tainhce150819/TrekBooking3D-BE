/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Searchcart from "../../components/searchcart";
import "../../../../public/css/search.css";
import { Oval } from "react-loader-spinner";
import commentService from "@/app/services/commentService";
import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import rateService from "@/app/services/rateService";
import Slider from "react-slick";
import hotelImageService from "@/app/services/hotelImageService";
import Link from "next/link";



const SearchPage = () => {
  const [hotelList, setHotelList] = useState<IHotel[]>([]);
  const [averageRatings, setAverageRatings] = useState<{ [key: number]: number }>({});
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [commentsCount, setCommentsCount] = useState<{ [key: number]: number }>({});
  const [hotelImages, setHotelImages] = useState<{ [key: number]: IHotelImage[] }>({});

  // Filter states
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Search states
  const [city, setCity] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cityParam = searchParams.get("city");
    const checkInDateParam = searchParams.get("checkInDate");
    const checkOutDateParam = searchParams.get("checkOutDate");

    setCity(cityParam);
    setCheckInDate(checkInDateParam);
    setCheckOutDate(checkOutDateParam);
  }, []);

  useEffect(() => {
    if (city && checkInDate && checkOutDate) {
      searchHotels(checkInDate, checkOutDate, city);
    }
  }, [city, checkInDate, checkOutDate]);

  const searchHotels = async (checkInDate: string, checkOutDate: string, city: string) => {
    try {
      setLoading(true);
      const hotelSchedule = await hotelService.searchHotelSchedule(checkInDate, checkOutDate, city);
      setHotelList(hotelSchedule);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error searching hotels:", error);
      setError(error instanceof Error ? error : new Error("An unexpected error occurred"));
    }
  };

  useEffect(() => {
    const fetchRates = async () => {
      const averages: { [key: number]: number } = {};
      for (const hotel of hotelList) {
        try {
          const rates = await rateService.getRatesByHotelId(hotel.hotelId);
          const averageRate = rates.reduce((sum, rate) => sum + rate.rateValue, 0) / rates.length;
          averages[hotel.hotelId] = Math.round(averageRate);
        } catch (error) {
          console.error(`Error fetching rates for hotel ${hotel.hotelId}:`, error);
          averages[hotel.hotelId] = 0;
        }
      }
      setAverageRatings(averages);
    };
    if (hotelList.length > 0) {
      fetchRates();
    }
  }, [hotelList]);

  useEffect(() => {
    const fetchHotelsAndRooms = async () => {
      setLoading(true);
      try {
        const rooms = await roomService.getRooms();
        setRoomList(rooms);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("An unexpected error occurred"));
        setLoading(false);
      }
    };
    fetchHotelsAndRooms();
  }, []);

  useEffect(() => {
    if (hotelList) {
      fetchHotelImages(hotelList);
    }
  }, [hotelList]);

  const fetchHotelImages = async (hotels: IHotel[]) => {
    const imagesMap: { [key: number]: IHotelImage[] } = {};
    for (const hotel of hotels) {
      const images: IHotelImage[] = await hotelImageService.getHotelImageByHotelId(hotel.hotelId);
      if (images.length > 0) {
        imagesMap[hotel.hotelId] = images;
      }
    }
    setHotelImages(imagesMap);
  };

  const fetchCommentsCount = useCallback(async () => {
    const counts: { [key: number]: number } = {};
    for (const hotel of hotelList) {
      try {
        const comments = await commentService.getCommentsByHotelId(hotel.hotelId);
        counts[hotel.hotelId] = comments.length;
      } catch (error) {
        console.error(`Error fetching comments for hotel ${hotel.hotelId}:`, error);
        counts[hotel.hotelId] = 0;
      }
    }
    setCommentsCount(counts);
  }, [hotelList]);

  useEffect(() => {
    if (hotelList.length > 0) {
      fetchCommentsCount();
    }
  }, [hotelList, fetchCommentsCount]);

  const getLowestPrice = useCallback((hotelId: number) => {
    const rooms = roomList.filter((room) => room.hotelId === hotelId);
    if (rooms.length > 0) {
      return Math.min(...rooms.map((room) => room.roomPrice));
    }
    return null;
  }, [roomList]);

  const getLowestPriceDiscount = useCallback((hotelId: number) => {
    const rooms = roomList.filter((room) => room.hotelId === hotelId);
    if (rooms.length > 0) {
      const lowestPrice = Math.min(
        ...rooms.map((room) => room.roomPrice - room.roomPrice * (room.discountPercent / 100))
      );
      return lowestPrice.toFixed(2);
    }
    return null;
  }, [roomList]);

  const getRoomsByHotelId = (hotelId: number) => {
    return roomList.filter((room) => room.hotelId === hotelId).slice(0, 2);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(prevSelected =>
      prevSelected.includes(rating)
        ? prevSelected.filter(item => item !== rating)
        : [...prevSelected, rating]
    );
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices(prevSelected =>
      prevSelected.includes(service)
        ? prevSelected.filter(item => item !== service)
        : [...prevSelected, service]
    );
  };

  const filterHotels = () => {
    return hotelList.filter((hotel) => {
      const matchesRating = selectedRating.length === 0 || selectedRating.includes(averageRatings[hotel.hotelId]);
      const matchesService = selectedServices.length === 0 || selectedServices.every(service => hotel.services.includes(service));
      return matchesRating && matchesService;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval height={80} width={80} color="#305A61" visible={true} ariaLabel="oval-loading" secondaryColor="#4f9a94" strokeWidth={2} strokeWidthSecondary={2} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    autoplay: false,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <div className="">
        <div className="img-bk-search">
          <Searchcart />
        </div>
        <div className="content-search backgr-home pb-12 pt-20">
          <div className="container">
            <div className="text-center">
              <p className="font-bold text-4xl">The Best Place For Vacation </p>
            </div>
            <div className="border mb-10 pt-6" style={{ borderRadius: "20px", boxShadow: "0 6px 6px #0000004d" }}>
              <div className="row mx-3">
                <div className="col-2">
                  <Link href={`/trekbooking/search_city?city=Cần Thơ`} className="text-white no-underline zoom-effect-container">
                    <div className="relative image-card">
                      <img className="border w-full" style={{ borderRadius: "20px", height: "231px" }} src="/image/cantho.png" alt="Can Tho" />
                      <div className="absolute z-10 w-full bottom-0 flex justify-center" style={{ backgroundColor: "rgb(31,28,23,0.3)", border: "0 0 1px 1px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                        <span className="text-white font-semibold text-base">Can Tho</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center my-3">
                    <Link className="no-underline text-white border px-3 font-medium text-sm" style={{ backgroundColor: "#305A61", borderRadius: "10px" }} href={`/trekbooking/search_city?city=Cần Thơ`}>
                      Find hotel
                    </Link>
                  </div>
                </div>
                <div className="col-2">
                  <Link href={`/trekbooking/search_city?city=Vũng Tàu`} className="text-white no-underline zoom-effect-container">
                    <div className="relative image-card">
                      <img className="border w-full" style={{ borderRadius: "20px", height: "231px" }} src="/image/vungtau.jpg" alt="Vung Tau" />
                      <div className="absolute z-10 w-full bottom-0 flex justify-center" style={{ backgroundColor: "rgb(31,28,23,0.3)", border: "0 0 1px 1px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                        <span className="text-white font-semibold text-base">Vung Tau</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center my-3">
                    <Link className="no-underline text-white border px-3 font-medium text-sm" style={{ backgroundColor: "#305A61", borderRadius: "10px" }} href={`/trekbooking/search_city?city=Vũng Tàu`}>
                      Find hotel
                    </Link>
                  </div>
                </div>
                <div className="col-2">
                  <Link href={`/trekbooking/search_city?city=Ninh Bình`} className="text-white no-underline zoom-effect-container">
                    <div className="relative image-card">
                      <img className="border w-full" style={{ borderRadius: "20px", height: "231px" }} src="/image/ninhbinh.jpg" alt="ninh binh" />
                      <div className="absolute z-10 w-full bottom-0 flex justify-center" style={{ backgroundColor: "rgb(31,28,23,0.3)", border: "0 0 1px 1px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                        <span className="text-white font-semibold text-base">Ninh Binh</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center my-3">
                    <Link className="no-underline text-white border px-3 font-medium text-sm" style={{ backgroundColor: "#305A61", borderRadius: "10px" }} href={`/trekbooking/search_city?city=Ninh Bình`}>
                      Find hotel
                    </Link>
                  </div>
                </div>
                <div className="col-2">
                  <Link href={`/trekbooking/search_city?city=Ho Chi Minh`} className="text-white no-underline zoom-effect-container">
                    <div className="relative image-card">
                      <img className="border w-full" style={{ borderRadius: "20px", height: "231px" }} src="/image/hcm.png" alt="da lat" />
                      <div className="absolute z-10 w-full bottom-0 flex justify-center" style={{ backgroundColor: "rgb(31,28,23,0.3)", border: "0 0 1px 1px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                        <span className="text-white font-semibold text-base">Ho Chi Minh</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center my-3">
                    <Link className="no-underline text-white border px-3 font-medium text-sm" style={{ backgroundColor: "#305A61", borderRadius: "10px" }} href={`/trekbooking/search_city?city=Ho Chi Minh`}>
                      Find hotel
                    </Link>
                  </div>
                </div>
                <div className="col-2">
                  <Link href={`/trekbooking/search_city?city=Hanoi`} className="text-white no-underline zoom-effect-container">
                    <div className="relative image-card">
                      <img className="border w-full" style={{ borderRadius: "20px", height: "231px" }} src="/image/hanoi.png" alt="da lat" />
                      <div className="absolute z-10 w-full bottom-0 flex justify-center" style={{ backgroundColor: "rgb(31,28,23,0.3)", border: "0 0 1px 1px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                        <span className="text-white font-semibold text-base">Ha Noi</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center my-3">
                    <Link className="no-underline text-white border px-3 font-medium text-sm" style={{ backgroundColor: "#305A61", borderRadius: "10px" }} href={`/trekbooking/search_city?city=Hanoi`}>
                      Find hotel
                    </Link>
                  </div>
                </div>
                <div className="col-2">
                  <Link href={`/trekbooking/search_city?city=Phan Thiết`} className="text-white no-underline zoom-effect-container">
                    <div className="relative image-card">
                      <img className="border w-full" style={{ borderRadius: "20px", height: "231px" }} src="/image/phanthiet.jpg" alt="phan thiet" />
                      <div className="absolute z-10 w-full bottom-0 flex justify-center" style={{ backgroundColor: "rgb(31,28,23,0.3)", border: "0 0 1px 1px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                        <span className="text-white font-semibold text-base">Phan Thiết</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center my-3">
                    <Link className="no-underline text-white border px-3 font-medium text-sm" style={{ backgroundColor: "#305A61", borderRadius: "10px" }} href={`/trekbooking/search_city?city=Phan Thiết`}>
                      Find hotel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="border-filter">
                  <p className="text-center text-2xl pb-8 font-bold color-black">Filters</p>
                  <div className="range">
                    <p className="font-bold color-black">Price Range</p>
                    <p className="color-black">0 US$ - 170 US$</p>
                    <div className="search-filter pb-4">
                      <img src="/image/searchfilter.png" alt="" />
                    </div>
                    <div className="start flex justify-between">
                      <p className="font-bold">Star Rating</p>
                      <img className="h-5 w-5 cursor-pointer" src="/image/down.png" alt="" />
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleRatingChange(1)} />
                      <img className="input-star" src="/image/star.png" alt="" />
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleRatingChange(2)} />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleRatingChange(3)} />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleRatingChange(4)} />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleRatingChange(5)} />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                      <img className="input-star" src="/image/star.png" alt="" />
                    </div>
                  </div>
                  <div className="pb-4">
                    <div className="start flex justify-between">
                      <p className="font-bold">Services</p>
                      <img className="h-5 w-5 cursor-pointer" src="/image/down.png" alt="" />
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleServiceChange("Parking")} />
                      <p className="text-faci">Parking</p>
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleServiceChange("Elevator")} />
                      <p className="text-faci">Elevator</p>
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleServiceChange("Restaurant")} />
                      <p className="text-faci">Restaurant</p>
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleServiceChange("Fitness")} />
                      <p className="text-faci">Fitness</p>
                    </div>
                    <div className="input-star flex pb-8">
                      <input type="checkbox" className="h-5" onChange={() => handleServiceChange("Wifi")} />
                      <p className="text-faci">Wifi</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-12">
                {filterHotels().length > 0 ? (
                  filterHotels().map((item: IHotel) => (
                    <div key={item.hotelId} className="row bg-white py-3 px-2 mb-4" style={{ borderRadius: "20px", boxShadow: "0 4px 4px 0 #7F7F7F" }}>
                      <div className="col-4">
                        <div className="">
                          <img className="w-full h-64" style={{ borderRadius: "10px" }} src={item.hotelAvatar} alt="" />
                        </div>
                        <div className="my-3">
                          {hotelImages[item.hotelId]?.length >= 2 ? (
                            <Slider {...settings}>
                              {hotelImages[item.hotelId]?.map((image) => (
                                <div key={image.hotelImageId}>
                                  <img className="w-full h-20 px-1" style={{ borderRadius: "10px" }} src={image.hotelImageURL} alt="hotel thumbnail" />
                                </div>
                              ))}
                            </Slider>
                          ) : (
                            <img className="w-full h-40 px-1" style={{ borderRadius: "10px" }} src={hotelImages[item.hotelId]?.[0].hotelImageURL} alt="room thumbnail" />
                          )}
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="px-3">
                          <span className="font-bold text-lg pt-2 color-black">{item.hotelName}</span>
                          <div className="review flex items-center py-3">
                            <span className="color-primary disnone">Hotels</span>
                            {averageRatings[item.hotelId] > 0 ? (
                              [...Array(averageRatings[item.hotelId])].map((_, index) => (
                                <img key={index} className="inline ml-2" src="/image/star.png" alt="" />
                              ))
                            ) : (
                              <span className="ml-2">No rating</span>
                            )}
                            <span style={{ color: "#8E8D8A" }} className="ml-3 disnone">
                              {commentsCount[item.hotelId] === 0 || commentsCount[item.hotelId] === 1
                                ? `${commentsCount[item.hotelId] || 0} review`
                                : `${commentsCount[item.hotelId] || 0} reviews`}
                            </span>
                          </div>
                          <div className="flex">
                            <img className="w-5 h-5" src="/image/map.png" alt="" />
                            <p className="ml-3 color-black">{item.hotelCity}</p>
                          </div>
                          <p className="font-bold color-primary">
                            {getRoomsByHotelId(item.hotelId).map((room) => (
                              <p key={room.roomId}>{room.roomName}</p>
                            ))}
                          </p>
                          <div className="flex">
                            <img className="w-3 h-3 mt-2" src="/image/check1.png" alt="" />
                            <p className="ml-2 color-black">Lorem ipsum dolor sit</p>
                          </div>
                          <div className="flex">
                            <img className="w-3 h-3 mt-2" src="/image/check1.png" alt="" />
                            <p className="ml-2 color-black">Lorem ipsum dolor sit</p>
                          </div>
                          <div className="flex">
                            <img className="w-3 h-3 mt-2" src="/image/check1.png" alt="" />
                            <p className="ml-2 color-black">Lorem ipsum dolor sit</p>
                          </div>
                          <div className="flex">
                            <img className="w-3 h-3 mt-2" src="/image/check1.png" alt="" />
                            <p className="ml-2 color-black">Lorem ipsum dolor sit</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3" style={{ borderRadius: "10px", backgroundColor: "#F5F5F5" }}>
                        <div className="text-center pt-14">
                          <p className="text-xl color-primary font-bold">Holiday sale</p>
                          <p className="font-bold decor text-2xl" style={{ color: "#8E8D8A" }}>
                            {getLowestPrice(item.hotelId) || "N/A"}US$
                          </p>
                          <p className="color-black font-bold text-2xl" style={{ color: "rgb(255, 94, 31)" }}>
                            {getLowestPriceDiscount(item.hotelId) || "N/A"}US$
                          </p>
                          <p style={{ color: "#8E8D8A" }}>Exclude taxes & fees</p>
                          <Link href={`/trekbooking/list_hotel/${item.hotelId}`} className="text-white font-medium py-2 px-6 text-lg border no-underline" style={{ backgroundColor: "#305A61", borderRadius: "20px" }}>
                            Book now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-center py-4 text-red-600 font-bold">No hotel found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
