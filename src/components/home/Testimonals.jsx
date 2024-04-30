import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import testimonialsData from "./../../data/testimonals";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    fetchTopReviews();
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fetchTopReviews = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/review/top`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTestimonialsData(result.data);
    } catch (error) {
      console.error("Error fetching top reviews:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 2 } },
  };

  return (
    <motion.div
      className="lg:px-48 min-[100px]:px-10 pt-16 flex flex-col justify-between items-center"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <h2 className="mx-auto font-semibold text-lg text-orange-500">
        TESTIMONIALS
      </h2>
      <p className="mx-auto font-normal text-4xl md:text-7xl my-3">
        What our customers say
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10 justify-center mx-auto">
        {testimonialsData.map((testimonial, id) => (
          <motion.div
            key={id}
            className="md:w-[450px] w-[400px] bg-white rounded-lg shadow-md p-5 my-5 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <FaQuoteLeft className="w-10 h-10 text-orange-300 absolute -left-2 -top-2" />
            <FaQuoteRight className="w-10 h-10 text-orange-300 absolute -right-2 -bottom-2" />
            <p className="text-gray-800 text-center font-light mt-2">
              {testimonial.message}
            </p>
            <p className="text-gray-600 text-center font-semibold mt-2">
              - {testimonial.name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
