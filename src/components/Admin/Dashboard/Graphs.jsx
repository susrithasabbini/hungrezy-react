import { useEffect, useState } from "react";
import SparkChartComponent from "./SparkChartComponent";
import PieChartComponent from "./PieChartComponent";
import { toast } from "sonner";

const Graphs = ({ customers, restaurants, loading }) => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [customerPercentageChange, setCustomerPercentageChange] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [restauantsPercentageChange, setRestaurantsPercentageChange] =
    useState(0);
  const [customersData, setCustomersData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    fetchCustomersData();
    fetchRestaurantsData();
  }, []);

  const fetchCustomersData = async () => {
    let url = `${import.meta.env.VITE_HUNGREZY_API}/api/user/count`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setCustomersData(result.data.monthlyUsers);
    } catch (error) {
      toast.error("Failed to fetch customers data");
    }
  };

  const fetchRestaurantsData = async () => {
    let url = `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/count`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setRestaurantsData(result.data.monthlyRestaurants);
    } catch (error) {
      toast.error("Failed to fetch restaurants data");
    }
  };

  useEffect(() => {
    let total = 0;
    customersData.forEach((data) => {
      total += data.customers;
    });
    setTotalCustomers(total);
    const customerIndex = customersData.findIndex(
      (data) =>
        data.month === new Date().toLocaleString("default", { month: "long" })
    );
    if (customerIndex !== -1 && customerIndex > 0) {
      const previousMonthCustomers = customersData[customerIndex - 1].customers;
      const currentMonthCustomers = customersData[customerIndex].customers;
      if (currentMonthCustomers !== 0 && previousMonthCustomers !== 0) {
        const change = currentMonthCustomers - previousMonthCustomers;
        let percentage;
        if (currentMonthCustomers > previousMonthCustomers) {
          percentage = (change / currentMonthCustomers) * 100;
        } else {
          percentage = (change / previousMonthCustomers) * 100;
        }
        setCustomerPercentageChange(percentage.toFixed(2));
      } else {
        setCustomerPercentageChange(0); // Handle division by zero
      }
    }

    let totalRestaurants = 0;
    restaurantsData.forEach((data) => {
      totalRestaurants += data.restaurants;
    });

    setTotalRestaurants(totalRestaurants);

    const restaurantIndex = restaurantsData.findIndex(
      (data) =>
        data.month === new Date().toLocaleString("default", { month: "long" })
    );
    if (restaurantIndex !== -1 && restaurantIndex > 0) {
      const previousMonthRestaurants =
        restaurantsData[restaurantIndex - 1].restaurants;
      const currentMonthRestaurants =
        restaurantsData[restaurantIndex].restaurants;
      if (currentMonthRestaurants !== 0 && previousMonthRestaurants !== 0) {
        const change = currentMonthRestaurants - previousMonthRestaurants;
        let percentage;
        if (currentMonthRestaurants > previousMonthRestaurants) {
          percentage = (change / currentMonthRestaurants) * 100;
        } else {
          percentage = (change / previousMonthRestaurants) * 100;
        }
        setRestaurantsPercentageChange(percentage.toFixed(2));
      } else {
        setRestaurantsPercentageChange(0); // Handle division by zero
      }
    }
  }, [customersData, restaurantsData]);

  return (
    <div>
      <div className="flex my-10">
        <SparkChartComponent
          data={customersData}
          percentageChange={customerPercentageChange}
          total={totalCustomers}
          label={"customers"}
        />

        <SparkChartComponent
          data={restaurantsData}
          percentageChange={restauantsPercentageChange}
          total={totalRestaurants}
          label={"restaurants"}
        />
      </div>

      <div className="flex my-10">
        <PieChartComponent
          data={customers}
          label={"Customers"}
          loading={loading}
        />
        <PieChartComponent
          data={restaurants}
          label={"Restaurants"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Graphs;
