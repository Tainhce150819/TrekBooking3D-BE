import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderHotelHeaderService {
  getOrderHotelHeaderByUserId(): Promise<IOrderHotelHeader[]>;
  getOrderHotelHeaderBySupplierId(): Promise<IOrderHotelHeader[]>;
  getRevenueYearBySupplierId(): Promise<IAnnualRevenue[]>;
  countTotalOrderHotelBySupplierId(): Promise<number>;
  getPercentChangeFromLastWeek(): Promise<number>;
  getTotalRevenueHotelBySupplierId(): Promise<number>;
  getPercentChangeRevenueFromLastWeek(): Promise<number>;
  getCurrentWeekRevenueHotelBySupplierId(): Promise<IWeeklyRevenue>;
  getCurrentMonthOfYearRevenueHotelBySupplierId(): Promise<IMonthlyRevenue>;
  getCurrentQuarterOfYearRevenueHotelBySupplierId(): Promise<IQuarterlyRevenue>;
}

const orderHotelHeaderService: IOrderHotelHeaderService = {
  async getOrderHotelHeaderByUserId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderHotelHeaderByUserId`,
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
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getOrderHotelHeaderBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderHotelHeaderBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getRevenueYearBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getRevenueYearBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async countTotalOrderHotelBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/countTotalOrderHotelBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  
  
  async getPercentChangeFromLastWeek() {
    try {
      const response = await fetch(
        `${BASE_URL}/getPercentChangeFromLastWeek`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  
  async getTotalRevenueHotelBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getTotalRevenueHotelBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  
  async getPercentChangeRevenueFromLastWeek() {
    try {
      const response = await fetch(
        `${BASE_URL}/getPercentChangeRevenueFromLastWeek`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },

  async getCurrentWeekRevenueHotelBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getCurrentWeekRevenueHotelBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getCurrentMonthOfYearRevenueHotelBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getCurrentMonthOfYearRevenueHotelBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getCurrentQuarterOfYearRevenueHotelBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getCurrentQuarterOfYearRevenueHotelBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
};

export default orderHotelHeaderService;
