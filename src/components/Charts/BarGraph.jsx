import { BarChart } from "@tremor/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

const valueFormatter = (number) =>
  `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function BarGraph() {
  const [chartdata, setChartData] = useState([]);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    let url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/order/restaurant/stats/${user._id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.log("Failed to fetch order stats");
        return null;
      }
      const result = await response.json();
      setChartData(result.data.quarterlyOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BarChart
      className="mt-2"
      data={chartdata}
      index="name"
      categories={["orders"]}
      colors={["orange-300"]}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
    />
  );
}
