import { FaArrowRight } from "react-icons/fa";
import notFoundImage from "../assets/404Image.png";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/home/Footer";

const PageNotFound = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <img className="w-[40%]" src={notFoundImage} alt="404" />
      <div className="w-full flex flex-col justify-between items-center gap-3">
        <h1 className="text-4xl font-bold">Page Not Found!</h1>
        <p className="text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
        <motion.button
          type="button"
          className="py-3 mb-11 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
          whileHover={{ scale: 1.05 }}
          variants={variants}
          onClick={() => navigate("/")}
        >
          <span className="align-baseline">Back to HomePage</span>
          <FaArrowRight className="ml-2 align-baseline" />
        </motion.button>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
