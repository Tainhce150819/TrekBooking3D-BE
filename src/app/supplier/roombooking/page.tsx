/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookingDetail from "./booking_detail";
import orderHotelHeaderService from "@/app/services/orderHotelHeaderService";
import orderHotelDetailService from "@/app/services/orderHotelDetailService";
import useSWR from "swr";

const BookingListOfSupplier = () => {  
  const [showModalBookingDetail, setShowModalBookingDetail] =
    useState<boolean>(false);
  const [orderHotelHeaders, setOrderHotelHeaders] = useState<
    IOrderHotelHeader[]
  >([]);
  const [orderHotelHeader, setOrderHotelHeader] =
    useState<IOrderHotelHeader | null>(null);
  const [orderHotelDetail, setOrderHotelDetail] =
    useState<IOrderHotelDetail | null>(null);
  const [hotelDetails, setHotelDetails] = useState<{
    [key: number]: IOrderHotelDetail[];
  }>({});
  const fetcher = async () => {
    const headers =
      await orderHotelHeaderService.getOrderHotelHeaderBySupplierId();
    setOrderHotelHeaders(headers);
    const detailPromises = headers.map((header) =>
      orderHotelDetailService.getOrderHotelDetailByOrderHotelHeaderId(header.id)
    );

    const detailsArray = (await Promise.all(detailPromises))
      .filter(Boolean)
      .flat();
    const detailsMap: { [key: number]: IOrderHotelDetail[] } = {};

    detailsArray.forEach((detail) => {
      if (!detailsMap[detail.orderHotelHeaderlId]) {
        detailsMap[detail.orderHotelHeaderlId] = [];
      }
      detailsMap[detail.orderHotelHeaderlId].push(detail);
    });
    setHotelDetails(detailsMap);
    return { headers, details: detailsMap };
  };

  const { data, error } = useSWR("orderHotelData", fetcher);
  console.log(data);
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const { headers, details } = data;
  return (
    <div className="relative">
      <div className="search-add ">
        <div className="search-hotel flex">
          <input
            type="text"
            placeholder="Search........."
            className="input-hotel pl-3"
          />
          <img src="/image/search.png" alt="" />
        </div>
      </div>
      <div className="table-hotel pt-8">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white border-solid">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bk-top-table">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-4">
                        BookingId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Full Name
                      </th>                      
                      
                      <th scope="col" className="px-6 py-4">
                        Check-in Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Check-out Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Process
                      </th>
                      <th scope="col" className="px-6 py-4">
                        View Detail
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {orderHotelHeaders.length > 0 ? (
                      orderHotelHeaders.map((header) => {
                        const detail = details[header.id] || [];
                        const checkInDate = new Date(header.checkInDate);
                        const checkOutDate = new Date(header.checkOutDate);
                        const formattedCheckInTime =
                          checkInDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          });
                        const formattedCheckOutTime =
                          checkOutDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          });
                        return (
                          <tr
                            key={header.id}
                            className="border-b border-neutral-200 dark:border-white/10 text-center"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.fullName}
                            </td>                            
                            
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {formattedCheckInTime}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {formattedCheckOutTime}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.totalPrice}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                header.process ? "color-active" : "color-stop"
                              }`}
                            >
                              {header.process ? "Success" : "Pending..."}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex justify-center">
                                <img
                                  className="w-5 h-5 cursor-pointer"
                                  src="/image/viewdetail.png"
                                  alt="View Detail"
                                  onClick={() => {
                                    setOrderHotelHeader(header);
                                    setOrderHotelDetail(details[header.id][0]);
                                    setShowModalBookingDetail(true);
                                  }}
                                />
                              </div>
                            </td>                            
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={12}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>                
                <BookingDetail
                  showModalBookingDetail={showModalBookingDetail}
                  setShowModalBookingDetail={setShowModalBookingDetail}
                  orderHotelHeader={orderHotelHeader}
                  setOrderHotelHeader={setOrderHotelHeaders}
                  orderHotelDetail={orderHotelDetail}
                  setOrderHotelDetail={setOrderHotelDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingListOfSupplier;