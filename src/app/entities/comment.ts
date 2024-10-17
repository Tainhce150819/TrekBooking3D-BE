interface IComment{
    commentId: number;
    bookingId: number;
    booking: {
        bookingId: number;
    };
    userId: number;
    user: {
        userId: number;
        email: string;
        userName: string;
        avatar: string;
    };
    hotelId: number;
    hotel: {
        hotelId: number;
        hotelName: string;
    };
    dateSubmitted: string|Date;
    message: string;
}