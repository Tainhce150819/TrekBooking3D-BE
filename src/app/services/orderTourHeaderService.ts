import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderTourHeaderService {
  getOrderTourHeaderByUserId(): Promise<IOrderTourHeader[]>;
  getOrderTourHeaderBySupplierId(): Promise<IOrderTourHeader[]>;
  getRevenueTourBySupplierId(): Promise<IOrderTourHeader[]>;
  countTotalOrderTourBySupplierId(): Promise<number>;
  getPercentChangeTourFromLastWeek():Promise<number>;
  getTotalRevenueTourBySupplierId(): Promise<number>;
  getPercentChangeRevenueTourFromLastWeek(): Promise<number>;
  getCurrentWeekRevenueTourBySupplierId(): Promise<IWeeklyRevenue>;
  getCurrentMonthOfYearRevenueTourBySupplierId(): Promise<IMonthlyRevenue>;
  getCurrentQuarterOfYearRevenueTourBySupplierId(): Promise<IQuarterlyRevenue>;
}

const orderTourHeaderService: IOrderTourHeaderService = {
  async getOrderTourHeaderByUserId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourHeaderByUserId`,
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
        throw new Error("Failed to fetch order tour headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order tour headers:", error);
      throw error;
    }
  },
  async getOrderTourHeaderBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourHeaderBySupplierId`,
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
        throw new Error("Failed to fetch order tour headers");
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching order tour headers:", error);
      throw error;
    }
  },


  async getRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getRevenueTourBySupplierId`,
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
  
  async countTotalOrderTourBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/countTotalOrderTourBySupplierId`,
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

  async getPercentChangeTourFromLastWeek() {
    try {
      const response = await fetch(
        `${BASE_URL}/getPercentChangeTourFromLastWeek`,
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
  

  async getTotalRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getTotalRevenueTourBySupplierId`,
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
  
  async getPercentChangeRevenueTourFromLastWeek() {
    try {
      const response = await fetch(
        `${BASE_URL}/getPercentChangeRevenueTourFromLastWeek`,
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
  async getCurrentWeekRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getCurrentWeekRevenueTourBySupplierId`,
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
  async getCurrentMonthOfYearRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getCurrentMonthOfYearRevenueTourBySupplierId`,
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
  async getCurrentQuarterOfYearRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getCurrentQuarterOfYearRevenueTourBySupplierId`,
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

export default orderTourHeaderService;
