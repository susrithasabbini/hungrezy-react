import { FaList, FaMotorcycle, FaSearch } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Working = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      className="lg:px-48 min-[100px]:px-16 lg:mt-64 mt-32 flex flex-col justify-between items-center bg-yellow-50 py-20 mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <h2 className="mx-auto font-semibold text-2xl text-orange-500">
        HOW DOES IT WORK
      </h2>
      <p className="mx-auto font-normal md:text-5xl my-3 text-2xl">
        Get served as an emperor.
      </p>
      <p className="mx-auto text-xl my-2 text-gray-600 font-light">
        We deliver to your doorstep.{" "}
        <span className="text-orange-500">Fast</span> and{" "}
        <span className="text-orange-500">Fresh</span>.
      </p>

      <motion.div
        className="flex flex-col md:flex-row gap-x-5 justify-between items-center w-full mt-10"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="w-24 h-24 bg-amber-500 rounded-full flex justify-center items-center">
            <FaSearch className="w-10 h-10 text-white" />
          </div>
          <p className="text-xl font-semibold mt-3">Search</p>
          <p className="text-gray-600 text-center font-light mt-2">
            Find restaurants that deliver to you by entering your address.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center mt-10 md:mt-0 cursor-pointer"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="w-24 h-24 bg-amber-500 rounded-full flex justify-center items-center">
            <FaList className="w-10 h-10 text-white" />
          </div>
          <p className="text-xl font-semibold mt-3">Choose</p>
          <p className="text-gray-600 text-center font-light mt-2">
            Browse hundreds of menus to find the food you like.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center mt-10 md:mt-0 cursor-pointer"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="w-24 h-24 bg-amber-500 rounded-full flex justify-center items-center">
            <FaMotorcycle className="w-10 h-10 text-white" />
          </div>
          <p className="text-xl font-semibold mt-3">Delivery</p>
          <p className="text-gray-600 text-center font-light mt-2">
            Your order will be delivered to you in no time.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Working;
