/* eslint-disable @next/next/no-img-element */
"use client";
import hotelService from "@/app/services/hotelService";
import roomImageService from "@/app/services/roomImageService";
import roomService from "@/app/services/roomService";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import React from "react";
import Slider from "react-slick";
import {
  addToBookingCart,
  getBookingCartByUserId,
} from "@/app/services/bookingCartService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import commentService from "@/app/services/commentService";
import rateService from "@/app/services/rateService";
import { Oval } from "react-loader-spinner"; // Import spinner
import Cookies from "js-cookie";
import userService from "@/app/services/userService";
import hotelImageService from "@/app/services/hotelImageService";
import serviceOfRoom from "@/app/services/serviceOfRoom";

const formatRoomDescription = (description: string) => {
  return description.split(".").map((sentence, index) => {
    if (sentence.trim() === "") return null; // Skip empty strings resulting from splitting
    return (
      <div key={index} className="flex items-baseline pb-2">
        <img className="w-3 h-3 mr-2" src="/image/greenTick.png" alt="tick" />
        <span className="font-medium text-xs">{sentence.trim()}.</span>
      </div>
    );
  });
};
const fetchHotelImages = async (
  hotelId: number,
  setHotelImages: (images: string[]) => void
) => {
  const images = await hotelImageService.getHotelImageByHotelId(hotelId);
  const imageUrls = images.map((image: IHotelImage) => image.hotelImageURL);
  setHotelImages(imageUrls);
};
const DetailHotel = ({ params }: { params: { hotelId: string } }) => {
  const token = Cookies.get("tokenUser");
  const [hotelImages, setHotelImages] = useState<string[]>([]);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [rateList, setRateList] = useState<IRate[]>([]);
  const [combinedList, setCombinedList] = useState<
    (IComment & { rateValue?: number })[]
  >([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [roomImages, setRoomImages] = useState<{ [key: number]: IRoomImage[] }>(
    {}
  );
  const [roomServices, setRoomServices] = useState<{ [key: number]: IService[] }>(
    {}
  );

  useEffect(() => {
    const fetchUserData = async () => {
      // const token = Cookies.get("tokenUser");
      if (token) {
        try {
          const user = await userService.getUserById();
          setUserData(user);
        } catch (err) {
          console.error(err);
          // Xử lý lỗi nếu cần
        }
      }
    };
    fetchUserData();
  }, [token]);
  const averageRating = () => {
    if (combinedList.length === 0) return 0;

    const totalRates = combinedList.reduce(
      (acc, curr) => acc + (curr.rateValue || 0),
      0
    );
    return totalRates / combinedList.length;
  };
  const { data: hotel, error } = useSWR("detailHotel", () =>
    hotelService.getHotelById(Number(params.hotelId))
  );
  const { data: listRoom, isLoading } = useSWR("listRoom", () =>
    roomService.getRoomsByHotelId(Number(params.hotelId))
  );
  const { data: listComment } = useSWR("listComment", () =>
    commentService.getCommentsByHotelId(Number(params.hotelId))
  );
  const { data: listRate } = useSWR("listRate", () =>
    rateService.getRatesByHotelId(Number(params.hotelId))
  );
  const router = useRouter();
  useEffect(() => {
    if (listRoom) {
      setRoomList(listRoom);
      fetchRoomImages(listRoom);
      fetchRoomServices(listRoom);
    }
  }, [listRoom]);
  const fetchRoomServices = async (rooms: IRoom[]) => {
    const servicesMap: { [key: number]: IService[] } = {};
    for (const room of rooms) {
      const services: IService[] = await serviceOfRoom.getServiceByRoomId(room.roomId);
      if (services.length > 0) {
        servicesMap[room.roomId] = services;
      }
    }
    setRoomServices(servicesMap);
  };
  useEffect(() => {
    if (listComment) {
      setCommentList(listComment);
    }
  }, [listComment]);
  useEffect(() => {
    if (listRate) {
      setRateList(listRate);
    }
  }, [listRate]);
  useEffect(() => {
    if (listComment && listRate) {
      const combined = listComment.map((comment) => {
        const rate = listRate.find(
          (rate) => rate.bookingId === comment.bookingId
        );
        return {
          ...comment,
          rateValue: rate?.rateValue,
        };
      });
      setCombinedList(combined);
    }
  }, [listComment, listRate]);
  useEffect(() => {
    if (hotel) {
      fetchHotelImages(Number(params.hotelId), setHotelImages);
    }
  }, [hotel, params.hotelId]);
  // const userData = userService.getUserById();
  const fetchRoomImages = async (rooms: IRoom[]) => {
    const imagesMap: { [key: number]: IRoomImage[] } = {};
    for (const room of rooms) {
      const images: IRoomImage[] = await roomImageService.getRoomImageByRoomId(
        room.roomId
      );
      if (images.length > 0) {
        imagesMap[room.roomId] = images;
      }
    }
    setRoomImages(imagesMap);
  };
  //console.log(roomImages);
  const getLowestPrice = (hotelId: number) => {
    const rooms = roomList.filter((room) => room.hotelId === hotelId);
    if (rooms.length > 0) {
      return Math.min(...rooms.map((room) => room.roomPrice));
    }
    return null;
  };

  const renderGuests = (guestValue: number) => {
    const guests = [];
    for (let i = 0; i < guestValue; i++) {
      guests.push(
        <img key={i} className="w-4 h-4" src="/image/user.png" alt="guest" />
      );
    }
    return guests;
  };
  const renderStars = (rateValue: number) => {
    const stars = [];
    for (let i = 0; i < rateValue; i++) {
      stars.push(
        <img
          key={i}
          className="pr-1"
          src={i < rateValue ? "/image/start.png" : ""}
          alt="star"
        />
      );
    }
    return stars;
  };
  const handleAddToCart = async (room: IRoom) => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }
    const currentDate = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Kiểm tra ngày nhận phòng và trả phòng
    if (checkIn < currentDate) {
      toast.error(
        "Check-in date cannot be in the past and must be more than 1 day later"
      );
      return;
    }
    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    const stayDuration =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
    if (stayDuration > 30) {
      toast.error("Stay cannot be longer than 30 days");
      return;
    }
    if (stayDuration < 1) {
      toast.error("Stay duration must be at least 1 day");
      return;
    }
    if (!token) {
      toast.error("You must login to book the room!");
      setTimeout(() => {
        router.push(
          `/login_client?redirect=/trekbooking/list_hotel/${params.hotelId}`
        );
      }, 2000);

      return;
    }

    const existingCart = await getBookingCartByUserId();
    const roomExists = existingCart.some(
      (item: any) => item.roomId === room.roomId
    );
    if (roomExists) {
      toast.error("Room is already in the cart");
      return;
    }
    try {
      const bookingData = {
        bookingCartId: 0,
        userId: (await userData).userId, // Thay bằng giá trị thực tế
        hotelId: room.hotelId,
        roomId: room.roomId,
        checkInDate: new Date(checkInDate).toISOString(),
        checkOutDate: new Date(checkOutDate).toISOString(),
        totalPrice: room.roomPrice,
        roomQuantity: 1, // Thay bằng giá trị thực tế
        voucherCode: "not have", // Thay bằng giá trị thực tế
        userNote: "not have", // Thay bằng giá trị thực tế
      };

      const result = await addToBookingCart(bookingData);
      //toast.success()
      // router.push('/trekbooking/booking_infor');
      router.push(
        `/trekbooking/booking_infor?roomId=${room.roomId}&hotelId=${room.hotelId}`
      );
      console.log("Booking cart added:", result);
    } catch (error) {
      console.error("Error adding to booking cart:", error);
    }
  };
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  if (isLoading || !listRoom || !listComment || !combinedList) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#305A61"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4f9a94"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    autoplay: false,
    autoplaySpeed: 4000,
  };
  const settingsComment = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    autoplay: false,
    autoplaySpeed: 4000,
  };
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <div className="container">
        <div className="font-semibold text-xl mt-8" style={{ color: "#305A61" }}>
          <Link
            className="no-underline underline_hv"
            style={{ color: "#305A61" }}
            href="/"
          >
            Home
          </Link>{" "}
          <span>/</span>{" "}
          <Link
            className="no-underline underline_hv"
            style={{ color: "#305A61" }}
            href="/trekbooking/list_hotel"
          >
            Hotels
          </Link>{" "}
          <span>/</span> <span>{hotel?.hotelName}</span>
        </div>
      </div>
      <div className="container mt-2 mb-10">
        <div className="py-8 px-3">
          <div className="row">
            <div className="col-md-8">
              <p className="font-semibold text-3xl">{hotel?.hotelName}</p>
              <div className="flex items-center w-2/5 pb-3">
                <div>
                  <span
                    className="p-0 text-base font-normal"
                    style={{ color: "#305A61" }}
                  >
                    Hotels
                  </span>
                </div>
                <div className="flex h-3 ml-4">
                  {renderStars(averageRating())}
                </div>
                <div className="ml-4">
                  <img className="w-4" src="/image/map-ping.png" alt="" />
                </div>
                <div className="ml-4">
                  <span className="text-base font-normal">
                    {hotel?.hotelCity}
                  </span>
                </div>
              </div>
              <span className="text-base font-normal">
                {hotel?.hotelDistrict}
              </span>
            </div>

            <div className="col-md-4">
              <div
                className="grid justify-items-center content-center py-4 mb-4 border rounded-xl"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <div>
                  <span className="font-semibold">
                    Price/room/night starts from
                  </span>
                </div>
                <span className="font-bold text-2xl my-1">
                  ${getLowestPrice(Number(params.hotelId)) || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 max-[767px]:mb-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="">
                    <img
                      className="w-full"
                      src={hotel?.hotelAvatar}
                      style={{ borderRadius: "10px", height: "410px" }}
                      alt="Image 1"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="grid h-full grid-cols-2 gap-x-2 gap-y-2">
                    {hotelImages.map((image, index) => (
                      <div key={image} style={{ height: "200px" }}>
                        <img
                          src={image}
                          style={{ borderRadius: "10px" }}
                          className="w-full h-full"
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
              <a
                className="no-underline px-4 py-1 text-base font-medium text-white"
                style={{ borderRadius: "10px", backgroundColor: "#305A61" }}
                href="#"
              >
                Overview
              </a>
              <p className="font-bold pt-3">About Accommodation</p>
              <p> {hotel?.hotelFulDescription}</p>
            </div>

            <div className="col-md-4">
              <div
                className="grid justify-items-center content-center py-32 border"
                style={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}
              >
                <div>
                  <span className="font-bold text-xl">Reviews and ratings</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-xl pr-2 my-2">
                    {averageRating().toFixed(1)}
                  </span>
                  <div className="flex h-3">{renderStars(averageRating())}</div>
                </div>
                <span>Based on {combinedList.length} reviews</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-semibold text-3xl ">
            Rooms available at <span>{hotel?.hotelName}</span>
          </span>
          <div className="row pt-4 ">
            <div className="col-lg-2">
              <label
                className="font-bold pb-2 "
                style={{ color: "#ac7171" }}
                htmlFor="checkInDate"
              >
                Check-in Date:
              </label>
              <br></br>
              <input
                type="datetime-local"
                id="checkInDate"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
                className="hotel-date-input outline-none "
              />
            </div>
            <div className="col-lg-2 ml-4">
              <label
                className="font-bold pb-2"
                style={{ color: "#ac7171" }}
                htmlFor="checkOutDate"
              >
                Check-out Date:
              </label>
              <br></br>
              <input
                type="datetime-local"
                id="checkOutDate"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
                className="hotel-date-input outline-none "
              />
            </div>
          </div>
          {listRoom.length > 0 ? (
            listRoom.map((item: IRoom) => (
              <div
                key={item.roomId}
                className="border rounded-xl mt-3"
                style={{ boxShadow: "0 4px 4px 0 #7F7F7F" }}
              >
                <div className="mx-5 mt-4 mb-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-xl">
                      {item.roomName}
                    </span>
                    <Link
                      className="mr-8"
                      href={`/trekbooking/image360/${item.roomId}`}
                    >
                      <img
                        src="/image/view3D.png"
                        className="w-10 h-10"
                        alt="view 3D"
                      />
                    </Link>
                  </div>

                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      {roomImages[item.roomId]?.length >= 2 ? (
                        <Slider {...settings}>
                          {roomImages[item.roomId]?.map((image) => (
                            <div key={image.roomImageId} className="slide-flex" >
                              <img
                                className="w-5/6 h-60 rounded-lg"
                                src={image.roomImageURL}
                                alt="room thumbnail"
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <img
                          className="w-full h-60 border rounded-lg"
                          src={roomImages[item.roomId]?.[0].roomImageURL}
                          alt="room thumbnail"
                        />
                      )}
                    </div>

                    <div
                      className="col-lg-8 col-md-12 border "
                      style={{ borderRadius: "10px" }}
                    >
                      <div className="row">
                        <div className="col-4 border-r border-gray">
                          <p
                            className="text-center text-sm font-semibold pt-3"
                            style={{ color: "#305A61" }}
                          >
                            Room information
                          </p>
                          <div className="w-3/4 m-auto">
                            {formatRoomDescription(item.roomDescription)}
                          </div>
                        </div>
                        <div
                          className="col-4 border-r border-gray"
                          style={{ height: "290px" }}
                        >
                          <p
                            className="text-center text-sm font-semibold pt-3"
                            style={{ color: "#305A61" }}
                          >
                            Convenient
                          </p>
                          <div className="w-3/4 m-auto">
                            {roomServices[item.roomId]?.map((service) => (
                                <div className="flex items-center pb-3" key={service.serviceId}>
                                  <img
                                    className="w-3 h-3 mr-2"
                                    src={service.serviceImage || "/image/greenTick.png"}
                                    alt={service.serviceDescription}
                                  />
                                  <span className="font-medium text-xs">
                                    {service.serviceName}
                                  </span>
                                </div>
                              ))}
                            </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col-6">
                              <p
                                className="text-center text-sm font-semibold pt-3"
                                style={{ color: "#305A61" }}
                              >
                                Guest(s)
                              </p>
                              <div className="flex flex-wrap items-center pb-1 w-3/4 mx-auto">
                                {/* Hiển thị số lượng khách */}
                                {Array.from({
                                  length: item.roomCapacity,
                                }).map((_, i) => (
                                  <img
                                    key={i}
                                    className="w-4 h-4 m-1"
                                    src="/image/user.png"
                                    alt="guest"
                                  />
                                ))}
                              </div>
                            </div>
                            <div
                              className="col-lg-6 col-md-6"
                              style={{
                                height: "290px",
                                border: "1px solid #D9D9D9",
                                borderRadius: "10px",
                                backgroundColor: "#F5F5F5",
                              }}
                            >
                              <div className="grid justify-items-center">
                                <span
                                  className="text-center text-sm font-semibold pb-3 pt-3"
                                  style={{ color: "#305A61" }}
                                >
                                  Price
                                </span>
                                <span
                                  className=" text-center text-xl font-bold pb-3 line-through"
                                  style={{ color: "#8E8D8A" }}
                                >
                                  {item.roomPrice}$
                                </span>
                                <span
                                  className="text-center text-xl font-bold pb-3"
                                  style={{ color: "rgb(255, 94, 31)" }}
                                >
                                  {(item.roomPrice -
                                    (item.roomPrice * item.discountPercent) /
                                      100).toFixed(2)}
                                  $
                                </span>
                                <span
                                  className="text-center text-xs font-light pb-3"
                                  style={{ color: "#8E8D8A" }}
                                >
                                  Exclude taxes & fees
                                </span>

                                <div className="pb-1">
                                  <Link
                                    href=""
                                    className="px-2 py-1  text-white no-underline font-medium text-xs "
                                    style={{
                                      backgroundColor: "#305A61",
                                      borderRadius: "10px",
                                    }}
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    Choose
                                  </Link>
                                </div>

                                <div className="pt-3">
                                  <Link
                                    href=""
                                    className="px-1 py-1  text-white no-underline font-medium text-xs"
                                    style={{
                                      backgroundColor: "#305A61",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    View Detail
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center py-4 text-red-600 font-bold">
                No rooms found
              </p>
            </div>
          )}
        </div>

        <p className="font-semibold text-3xl my-8">Reviews</p>

        <div className="row mb-5">
        <Slider {...settingsComment}>
            {combinedList.length > 0 ? (
              combinedList.map((item, index) => {
                const isExpanded = expandedIndex === index;
                const message = item.message;
                const maxChars = 25; // Giới hạn số ký tự

                return (
                  <div key={index} className="py-5 px-3">
                    <div
                      className="border"
                      style={{
                        boxShadow: "0 4px 4px 0 #7F7F7F",
                        borderRadius: "20px",
                      }}
                    >
                      <div className=" w-4/5 mx-auto mt-4 mb-10">
                        <div className="flex justify-items-center">
                          <img
                            src={item.user.avatar || "/image/user.png"}
                            alt="user"
                            className="rounded-full border w-16 h-16"
                          />
                          <div className="pl-4">
                            <span className="font-semibold text-lg">
                              {item.user.userName}
                            </span>
                            <p className="font-normal text-base">
                              {new Date(
                                item.dateSubmitted
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex h-3 my-3">
                          {renderStars(item.rateValue || 0)}
                        </div>
                        <div className="comment-transition" style={{ maxHeight: isExpanded ? '500px' : '50px'}}>
                          <span className="font-medium break-words">
                            {isExpanded || message.length <= maxChars
                              ? message
                              : `${message.substring(0, maxChars)}...`}
                            {message.length > maxChars && (
                              <span
                                onClick={() => toggleExpand(index)}
                                className="font-bold cursor-pointer"
                                style={{color: "rgb(48, 90, 97)"}}
                              >
                                {isExpanded ? "  See Less" : "  See More"}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <p className="text-center py-4 text-red-600 font-bold">
                  No comment found
                </p>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default DetailHotel;
