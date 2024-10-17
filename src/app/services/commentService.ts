import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface ICommentService {
  getCommentsByHotelId(hotelId: number): Promise<IComment[]>;
}

const commentService: ICommentService = {
  async getCommentsByHotelId(hotelId) {
    console.log(hotelId);
    try {
      const response = await fetch(
        `${BASE_URL}/getCommentByHotelId/${hotelId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenUser")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comment list");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching comment list:", error);
      throw error;
    }
  },
};

export default commentService;
