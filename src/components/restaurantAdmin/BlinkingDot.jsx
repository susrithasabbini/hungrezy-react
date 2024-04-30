import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";

const BlinkingDot = ({ newOrders }) => {
  return (
    <motion.div
      className={`ml-auto text-lg text-red-500`}
      animate={{
        opacity: newOrders > 0 ? [1, 0, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    >
      <GoDotFill />
    </motion.div>
  );
};

export default BlinkingDot;
