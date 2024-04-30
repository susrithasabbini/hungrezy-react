import { CiDeliveryTruck } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import pexels from "../../assets/pexelsAsset.png";
import uliana from "../../assets/ulianaAsset.png";
import jonathan from "../../assets/jonathanAsset.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Counter from "../Counter";

const Welcome = () => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  useEffect(() => {
    controls.start("visible");
    fetchOrders();
  }, [controls]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/order/count`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const { deliveredOrders } = result.data;
      setCount(deliveredOrders);
    } catch (error) {
      console.error("Error fetching orders count:", error);
    }
  };

  return (
    <motion.div
      className="lg:px-48 min-[100px]:px-16 px-16 pt-44 flex flex-col md:flex-row justify-between items-center"
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <motion.div className="w-full md:w-[42%] mb-8 md:mb-0">
        <motion.h2
          className="text-orange-500/90 font-semibold text-2xl min-[1100px]:text-3xl py-4"
          variants={variants}
        >
          WELCOME TO HUNGREZY
        </motion.h2>
        <motion.p
          className="text-3xl min-[1100px]:text-4xl font-medium"
          style={{ lineHeight: "1.2" }}
          variants={variants}
        >
          Giving your Hunger a new Option
        </motion.p>
        <motion.p
          className="mt-4 text-gray-600 font-normal text-base md:text-lg"
          variants={variants}
        >
          Explore a world of delicious options at Hungrezy. Our menu is crafted
          with love and passion to satisfy your cravings. Whether you&apos;re in
          the mood for savory dishes or sweet treats, we&apos;ve got you
          covered.
        </motion.p>
        <motion.div
          className="flex items-center mt-8 justify-between w-[90%] gap-5"
          variants={variants}
        >
          <motion.button
            type="button"
            className="md:py-3 md:px-4 py-3 px-2.5 w-40 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            variants={variants}
            onClick={() => navigate("/restaurants")}
          >
            <span className="align-baseline">Order Now</span>
            <FaArrowRight className="ml-2 align-baseline mt-1" />
          </motion.button>
          <motion.div
            className="text-md font-semibold text-gray-700 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            variants={variants}
          >
            <CiDeliveryTruck className="w-10 h-10" />
            <p className="flex flex-row text-sm items-center gap-x-2">
              Orders delivered{" "}
              <span className="font-bold">
                <Counter to={count} />
              </span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="relative flex-shrink-0" variants={variants}>
        <motion.img
          src={pexels}
          alt="pexels"
          className="w-60 lg:w-64 xl:w-96 md:w-72 max-[766px]:max-w-[18rem]"
          whileHover={{ scale: 1.05 }}
        />
        <motion.img
          src={jonathan}
          alt="jonathon"
          className="w-1/2 md:w-40 absolute -left-[4.5rem] -top-2.5 max-w-[15rem] md:max-w-full"
          whileHover={{ scale: 1.05 }}
        />
        <motion.img
          src={uliana}
          alt="pexels"
          className="w-1/2 md:w-40 absolute -left-[4.5rem] -bottom-2 max-w-[15rem] md:max-w-full"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
