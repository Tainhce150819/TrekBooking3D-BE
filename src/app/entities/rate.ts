interface IRate{
    rateId: number;
    rateValue: number;
    bookingId: number;
    booking: {
        bookingId: number;
    };
    userId: number;
    user: {
        userId: number;
        email: string;
        userName: string;
    };
    hotelId: number;
    hotel: {
        hotelId: number;
        hotelName: string;
    };
}