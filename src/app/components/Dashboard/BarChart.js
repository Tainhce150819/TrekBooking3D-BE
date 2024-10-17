import React, { useEffect, useRef, useState } from "react";
import orderHotelHeaderService from "@/app/services/orderHotelHeaderService";
import orderTourHeaderService from "@/app/services/orderTourHeaderService";

const BarChart = () => {
  const chartRef = useRef(null);
  const [timeRange, setTimeRange] = useState("week");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeekRevenueHotel, setCurrentWeekRevenueHotel] = useState([]);
  const [currentWeekRevenueTour, setCurrentWeekRevenueTour] = useState([]);
  const [currentMonthRevenueHotel, setCurrentMonthRevenueHotel] = useState([]);
  const [currentMonthRevenueTour, setCurrentMonthRevenueTour] = useState([]);
  const [currentQuarterRevenueHotel, setCurrentQuarterRevenueHotel] = useState(
    []
  );
  const [currentQuarterRevenueTour, setCurrentQuarterRevenueTour] = useState(
    []
  );
  useEffect(() => {
    const fetchWeekRevenue = async () => {
      try {
        const data1 =
          await orderHotelHeaderService.getCurrentWeekRevenueHotelBySupplierId();
        const data2 =
          await orderTourHeaderService.getCurrentWeekRevenueTourBySupplierId();
        setCurrentWeekRevenueHotel(data1 || []);
        setCurrentWeekRevenueTour(data2 || []);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMonthRevenue = async () => {
      try {
        const dataMonth =
          await orderHotelHeaderService.getCurrentMonthOfYearRevenueHotelBySupplierId();
        const dataMonth2 =
          await orderTourHeaderService.getCurrentMonthOfYearRevenueTourBySupplierId();
        setCurrentMonthRevenueHotel(dataMonth || []);
        setCurrentMonthRevenueTour(dataMonth2 || []);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchQuarterRevenue = async () => {
      try {
        const dataQuarter =
          await orderHotelHeaderService.getCurrentQuarterOfYearRevenueHotelBySupplierId();
        const dataQuarter2 =
          await orderTourHeaderService.getCurrentQuarterOfYearRevenueTourBySupplierId();
        setCurrentQuarterRevenueHotel(dataQuarter || []);
        setCurrentQuarterRevenueTour(dataQuarter2 || []);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekRevenue();
    fetchMonthRevenue();
    fetchQuarterRevenue();
  }, []);

  useEffect(() => {
    let formattedDataWeek = [["Day of Week", "Hotel", "Tour"]];
    let formattedDataMonth = [["Month of Year", "Hotel", "Tour"]];
    let formattedDataQuarter = [["Quarter of Year", "Hotel", "Tour"]];

    if (currentWeekRevenueHotel.length && currentWeekRevenueTour.length) {
      for (let i = 0; i < currentWeekRevenueHotel.length; i++) {
const hotelDate = new Date(currentWeekRevenueHotel[i].weekStartDate);
        if (!isNaN(hotelDate)) {
          const formattedDate = `${hotelDate.getFullYear()}-${(
            hotelDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${hotelDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          formattedDataWeek.push([
            formattedDate,
            currentWeekRevenueHotel[i].revenue,
            currentWeekRevenueTour[i].revenue,
          ]);
        }
      }
    }

    if (currentMonthRevenueHotel.length && currentMonthRevenueTour.length) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      for (let i = 0; i < currentMonthRevenueHotel.length; i++) {
        formattedDataMonth.push([
          monthNames[i],
          currentMonthRevenueHotel[i].revenue,
          currentMonthRevenueTour[i].revenue,
        ]);
      }
    }

    if (currentQuarterRevenueHotel.length && currentQuarterRevenueTour.length) {
      for (let i = 0; i < currentQuarterRevenueHotel.length; i++) {
        formattedDataQuarter.push([
          `Q${i + 1}`,
          currentQuarterRevenueHotel[i].revenue,
          currentQuarterRevenueTour[i].revenue,
        ]);
      }
    }

    switch (timeRange) {
      case "week":
        setChartData(formattedDataWeek);
        break;
      case "month":
        setChartData(formattedDataMonth);
        break;
      case "quarter":
        setChartData(formattedDataQuarter);
        break;
      default:
        setChartData(formattedDataWeek);
    }
  }, [
    timeRange,
    currentWeekRevenueHotel,
    currentWeekRevenueTour,
    currentMonthRevenueHotel,
    currentMonthRevenueTour,
    currentQuarterRevenueHotel,
    currentQuarterRevenueTour,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (timeRange === "week") {
          const data1 =
            await orderHotelHeaderService.getCurrentWeekRevenueHotelBySupplierId();
          const data2 =
            await orderTourHeaderService.getCurrentWeekRevenueTourBySupplierId();
          setCurrentWeekRevenueHotel(data1 || []);
          setCurrentWeekRevenueTour(data2 || []);
        } else if (timeRange === "month") {
          const dataMonth =
            await orderHotelHeaderService.getCurrentMonthOfYearRevenueHotelBySupplierId();
          const dataMonth2 =
            await orderTourHeaderService.getCurrentMonthOfYearRevenueTourBySupplierId();
          setCurrentMonthRevenueHotel(dataMonth || []);
          setCurrentMonthRevenueTour(dataMonth2 || []);
        } else if (timeRange === "quarter") {
          const dataQuarter =
            await orderHotelHeaderService.getCurrentQuarterOfYearRevenueHotelBySupplierId();
const dataQuarter2 =
            await orderTourHeaderService.getCurrentQuarterOfYearRevenueTourBySupplierId();
          setCurrentQuarterRevenueHotel(dataQuarter || []);
          setCurrentQuarterRevenueTour(dataQuarter2 || []);
        }
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  useEffect(() => {
    setTimeRange("week");
  }, []);

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        google.charts.load("current", { packages: ["bar"] });
        google.charts.setOnLoadCallback(drawChart);
      };
      script.onerror = () => {
        console.error("Failed to load Google Charts");
      };
      document.body.appendChild(script);
    };

    const drawChart = () => {
      const dataTable = google.visualization.arrayToDataTable(chartData);

      const options = {
        chart: {
          title: "Revenue of Hotel and Tour",
        },
      };

      const chart = new google.charts.Bar(chartRef.current);
      chart.draw(dataTable, google.charts.Bar.convertOptions(options));
    };

    if (!window.google) {
      loadGoogleCharts();
    } else {
      google.charts.load("current", { packages: ["bar"] });
      google.charts.setOnLoadCallback(drawChart);
    }
  }, [chartData, loading]);

  return (
    <div>
      <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="quarter">Quarter</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          ref={chartRef}
          id="columnchart_material"
          style={{ width: "100%", height: "500px" }}
        ></div>
      )}
    </div>
  );
};

export default BarChart;