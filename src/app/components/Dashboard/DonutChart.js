import orderHotelDetailService from "@/app/services/orderHotelDetailService";
import { useEffect, useRef, useState } from "react";

const DonutChart = () => {
  const chartRef = useRef(null);
  const [timeRange, setTimeRange] = useState("week");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (timeRange === "week") {
          data = await orderHotelDetailService.getTop5RoomInWeek();
        } else if (timeRange === "total") {
          data = await orderHotelDetailService.getTop5RoomOrders();
        }

        const formattedData = [
          ["Room", "Order Count"],
          ...data.map((item) => [
            `${item.roomName || item.name} - ${item.hotelName}`,
            item.orderCount,
          ]),
        ];
        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
      };
      document.body.appendChild(script);
    };

    const drawChart = () => {
      if (loading || chartData.length === 0) return;
      const data = google.visualization.arrayToDataTable(chartData);
      const options = {
        title: `Top 5 most ordered rooms (${timeRange})`,
        pieHole: 0.4,
      };
      const chart = new google.visualization.PieChart(chartRef.current);
      chart.draw(data, options);
    };

    if (!window.google) {
      loadGoogleCharts();
    } else {
      drawChart();
    }
  }, [chartData, loading, timeRange]);

  return (
    <div>
      <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
        <option value="week">Week</option>
        <option value="total">Total</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          ref={chartRef}
          id="donutchart"
          style={{ width: "100%", height: "400px" }}
        ></div>
      )}
    </div>
  );
};

export default DonutChart;