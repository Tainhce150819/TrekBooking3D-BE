// components/PieChart.js
import orderTourDetailService from "@/app/services/orderTourDetailService";
import { useEffect, useRef, useState } from "react";

const PieChartGG = () => {
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
          data = await orderTourDetailService.getTop5TourInWeek();
        } else if (timeRange === "total") {
          data = await orderTourDetailService.getTop5TourOrders();
        }

        const formattedData = [
          ["Tour", "Order Count"],
          ...data.map((item) => [item.tourName, item.orderCount]),
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
        title: `Top 5 most ordered tours (${timeRange})`,
        pieHole: 0.4,
      };

      const chart = new google.visualization.PieChart(chartRef.current);
      chart.draw(data, options);
    };

    loadGoogleCharts();
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
          id="piechart"
          style={{ width: "100%", height: "400px" }}
        ></div>
      )}
    </div>
  );
};

export default PieChartGG;