  "use client";
import React, { useEffect, useState } from "react";
import "../../../../public/css/voucher.css";

import useSWR from "swr";
import voucherWalletService from "@/app/services/voucherWalletService";
const VoucherWallet = () => {
  const { data: voucherWalletList, error } = useSWR("voucherWalletList", () =>
    voucherWalletService.getVoucherUsageHistoryByUserId()
  );

  if (!voucherWalletList) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading voucher wallet</div>;
  }
  return (
    <div>
      <div className="payment-wallet">
        <h3>Voucher wallet</h3>
      </div>
      <div className="backgr-home ">
        <div className="voucher p-6">
          {voucherWalletList.length > 0 ? (
            voucherWalletList.map((item, index) => (
              <div className="flex justify-center pb-4" key={index}>
                <div className="border-wallet flex justify-between font-semibold">
                  <div>
                    <p>Voucher Code: {item.voucher.voucherCode}</p>
                    <p className="mb-0">
                      Discount: {item.voucher.discountPercent} %
                    </p>
                  </div>
                  <div>
                    <p className="pb-repon">
                      Used Date:{" "}
                      {new Date(item.booking.checkInDate).toLocaleDateString()}{" "}
                      {new Date(item.booking.checkInDate).toLocaleTimeString()}
                    </p>
                    <p className="mb-0">
                      Hotel: {item.booking.hotel.hotelName}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="not-found-form flex justify-center items-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">
                  No Vouchers Wallet Found
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherWallet;
