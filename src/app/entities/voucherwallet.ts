interface IVoucherWallet{
    userVoucherId: number;
    userId: number;
    user: {
        userId: number;
        email: string;
        userName: string;
    };
    bookingId: number;
    booking: {
        hotelId: number;
        hotel:{
            hotelId: number;
            hotelName: string;
        }
        checkInDate: string|Date;
    };
    voucherId: number;
    voucher: {
        voucherId: number;
        voucherCode: string;
        discountPercent: number;
    };
}