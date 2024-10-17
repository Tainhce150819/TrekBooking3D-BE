/* eslint-disable @next/next/no-img-element */
'use client'
import commentService from "@/app/services/commentService";
import rateService from "@/app/services/rateService";
import Link from "next/link";
import useSWR from "swr";
import "../../../../../../public/css/rate.css";
import { useEffect, useState } from "react";
import hotelService from "@/app/services/hotelService";
const ListRateOfHotel = ({ params }: { params: { hotelId: string } }) => {
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const { data: listRate, error } = useSWR("listRate", () =>
    rateService.getRatesByHotelId(Number(params.hotelId))
  );
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await hotelService.getHotelById(
          Number(params.hotelId)
        );
        setHotel(hotelData);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotel();
  }, [params.hotelId]);
  if (!listRate) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading rates</div>;
  }
  const renderStars = (rateValue: number) => {
    const stars = [];
    for (let i = 0; i < rateValue; i++) {
      stars.push(<img key={i} className="pr-1 inline-block" src="/image/star.png" alt="star" />);
    }
    return stars;
  };
  return (
    <div className="relative">
      <div className="search-add ">
      {hotel && (
          <div className="fix-name">
            <Link
              href="/supplier/hotel"
              style={{ color: "black", fontSize: "18px" }}
            >
              Hotel
            </Link>
            <span
              style={{
                color: "black",
                fontSize: "18px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              {" > "}
            </span>
            <Link
              href={`/supplier/hotel/room/${params.hotelId}`}
              style={{ color: "#4c7cab", fontSize: "18px" }}
            >
              {hotel.hotelName}
            </Link>
          </div>
        )}
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
                        RateId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        BookingId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Hotel Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Rate Value
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {listRate.length > 0 ? (
                      listRate.map((item: IRate, index) => {
                        // Parse the tourTime to a Date object if it's a string
                        // const commentTimeDate = new Date(item.dateSubmitted);
                        // const formattedCommentTime =
                        //   commentTimeDate.toLocaleDateString("en-US", {
                        //     year: "numeric",
                        //     month: "long",
                        //     day: "numeric",
                        //   });

                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 dark:border-white/10 text-center"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.rateId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.bookingId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.hotel.hotelName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.user.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                            <div className="flex justify-center">
                                {renderStars(item.rateValue)}
                              </div>
                            </td>
                            
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No rates found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListRateOfHotel;
