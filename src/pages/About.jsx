import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import aboutBackground from "./../assets/aboutBackground.jpg";
import overlayImage from "./../assets/overlay.png";
import placeOrder from "./../assets/placeOrder.png";
import payment from "./../assets/payment.png";
import orderSent from "./../assets/orderSent.png";
import happyTummy from "./../assets/happy.png";
import Footer from "@/components/home/Footer";
import aboutImage from "./../assets/aboutImage.png";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  const stepContainerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.div
      className="w-full h-full relative"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background Image */}
      <motion.img
        src={aboutBackground}
        alt="contact background"
        className="w-full h-[60%] object-cover opacity-25"
      />
      {/* Overlay Image */}
      <motion.img
        src={overlayImage}
        alt="overlay image"
        className="absolute top-0 left-0 w-full h-[60%] object-cover"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute w-full top-[35%] left-[45%] z-50 h-[60%]"
        variants={contentVariants}
      >
        <div className="flex flex-col justify-center">
          <motion.h1 className="text-5xl font-light">About Us</motion.h1>
          <div className="flex items-center py-3 gap-2 mx-5">
            <p
              onClick={() => navigate("/")}
              className="hover:underline cursor-pointer hover:text-amber-500"
            >
              Home
            </p>
            <span>
              <FaChevronRight className="text-orange-500" />
            </span>
            <p>About</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="w-full py-20 flex lg:px-48 min-[100px]:px-16 px-16 justify-between gap-5">
        <motion.div
          className="flex-1 rounded-3xl h-[30rem] overflow-hidden"
          variants={contentVariants}
        >
          <img
            src={aboutImage}
            alt="about background"
            className="object-cover w-full h-full"
          />
        </motion.div>
        <motion.div className="flex-1 h-[30rem]" variants={contentVariants}>
          <h1 className="text-orange-500 font-bold text-lg my-3">
            ABOUT HUNGREZY
          </h1>
          <h1 className="text-5xl font-light my-3">
            Your favorite food delivery partner.
          </h1>
          <p className="text-base font-normal text-gray-700 my-5">
            A single window for ordering from a wide range of restaurants, we
            have our own exclusive fleet of delivery personnel to pickup orders
            from restaurants and deliver it to customers. Having our own fleet
            gives us the flexibility to offer customers a no minimum order
            policy on any restaurant and accept online payments for all partner
            restaurants that we work with. Our delivery personnel carry one
            order at a time which ensures we get reliable and fast deliveries.
          </p>
          <motion.button
            type="button"
            className="py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="align-baseline">Get Started</span>
            <FaArrowRight className="ml-2 align-baseline" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full py-20 bg-yellow-50 px-20"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <h1 className="text-lg font-bold text-center mb-8 text-orange-500">
          HOW DOES IT WORK
        </h1>
        <p className="text-center font-semibold text-4xl">
          Get Served in 4 Simple Steps.
        </p>

        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center mt-10"
          variants={stepContainerVariants}
        >
          <motion.div className="bg-white rounded-3xl shadow-md px-6 py-3 m-4 lg:w-1/4 md:w-1/2 w-full flex flex-col items-center h-80">
            <img src={placeOrder} alt="Place Order" className="h-24 w-24" />
            <h1 className="text-xl font-bold mt-2">1. Place Order</h1>
            <p className="text-center text-gray-600 w-40 mt-2">
              Place your order from your favorite restaurant.
            </p>
            <motion.button
              type="button"
              className="mt-3 py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="align-baseline">Popular Food</span>
              <FaArrowRight className="ml-2 align-baseline" />
            </motion.button>
          </motion.div>

          <motion.div className="bg-white rounded-3xl shadow-md px-6 py-3 h-80 m-4 lg:w-1/4 md:w-1/2 w-full flex flex-col items-center">
            <img src={payment} alt="Place Order" className="h-24 w-24" />
            <h1 className="text-xl font-bold mt-2">2. Payment</h1>
            <p className="text-center text-gray-600 w-40 mt-2">
              Pay for your order using any of our payment options.
            </p>
            <motion.button
              type="button"
              className="mt-3 py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="align-baseline">Payment FAQs</span>
              <FaArrowRight className="ml-2 align-baseline" />
            </motion.button>
          </motion.div>

          <motion.div className="bg-white rounded-3xl shadow-md px-6 py-3 h-80 m-4 lg:w-1/4 md:w-1/2 w-full flex flex-col items-center">
            <img src={orderSent} alt="Place Order" className="h-24 w-24" />
            <h1 className="text-xl font-bold mt-2">3. Order Sent</h1>
            <p className="text-center text-gray-600 w-40 mt-2">
              Your order is sent to the restaurant for preparation.
            </p>
            <motion.button
              type="button"
              className="mt-3 py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="align-baseline">Track Order</span>
              <FaArrowRight className="ml-2 align-baseline" />
            </motion.button>
          </motion.div>

          <motion.div className="bg-white rounded-3xl shadow-md px-6 py-3 h-80 m-4 lg:w-1/4 md:w-1/2 w-full flex flex-col items-center">
            <img src={happyTummy} alt="Place Order" className="h-24 w-24" />
            <h1 className="text-xl font-bold mt-2">4. Happy Tummy</h1>
            <p className="text-center text-gray-600 w-40 mt-2">
              Your order is delivered to your doorstep. Enjoy!
            </p>
            <motion.button
              type="button"
              className="mt-3 py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="align-baseline">Review Us</span>
              <FaArrowRight className="ml-2 align-baseline" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default About;
