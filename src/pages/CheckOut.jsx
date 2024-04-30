import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import checkout from "./../assets/checkout.png";
import overlayImage from "./../assets/overlay.png";
import CheckOutForm from "@/components/checkout/CheckOutForm";
import CheckOutCart from "@/components/checkout/CheckOutCart";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.5 } },
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
      <motion.img
        src={checkout}
        alt="contact background"
        className="w-full h-[60%] object-cover opacity-25"
      />
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
          <motion.h1 className="text-5xl font-light">Check Out</motion.h1>
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
            <p>Check Out</p>
          </div>
        </div>
      </motion.div>

      <div className="lg:px-48 min-[100px]:px-16 px-16 py-20 flex lg:flex-row flex-col w-full h-full justify-between gap-20">
        <CheckOutCart />
        <CheckOutForm />
      </div>
    </motion.div>
  );
};

export default CheckOut;
