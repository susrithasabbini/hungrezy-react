import { motion, useAnimation } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaStar } from "react-icons/fa";
import logo from "./../../assets/logoAsset.png";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import StarRatings from "react-star-ratings";
import { IoIosSend } from "react-icons/io";
import { toast } from "sonner";

const Footer = () => {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    message: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/review/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      setForm({
        name: "",
        rating: 0,
        message: "",
      });
      onClose();
    } else {
      toast.error(data.message);
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const controls = useAnimation();
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  return (
    <motion.footer
      className="bg-gray-800 text-white py-24 pl-6 md:pl-0 mt-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          className="col-span-1 md:col-span-1 flex flex-col items-center"
          variants={containerVariants}
        >
          <motion.div
            className="flex items-center justify-center rounded-full h-16 w-16 mb-4"
            variants={socialIconVariants}
          >
            <motion.img src={logo} alt="logo" whileHover={{ scale: 1.1 }} />
          </motion.div>
          <motion.div className="text-center" variants={containerVariants}>
            <h2 className="font-bold text-3xl">Hungrezy</h2>
            <p className="text-md font-light my-2">Food Delivery App</p>
          </motion.div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="col-span-1 md:col-span-1"
          variants={containerVariants}
        >
          <div className="mb-4 font-light">
            <strong className="text-md font-semibold">Contact:</strong>{" "}
            hungrezy@gmail.com
          </div>
          <div className="mb-4">
            <strong>Location:</strong> 123 Main Street, Cityville
          </div>
          <div className="mb-4">
            <strong>Address:</strong> P.O. Box 456, Zip Code
          </div>
          <div className="mb-4">
            <strong>Timings:</strong> Mon-Fri: 9am-6pm
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="col-span-1 md:col-span-1"
          variants={containerVariants}
        >
          <div className="mb-4">Quick Links:</div>
          <motion.ul className="list-none" variants={containerVariants}>
            <li className="mb-2 hover:underline">
              <a href="/">Home</a>
            </li>
            <li className="mb-2 hover:underline">
              <a href="/restaurants">Menu</a>
            </li>
            <li className="mb-2 hover:underline">
              <a href="/about">About Us</a>
            </li>
            <li className="mb-2 hover:underline">
              <a href="/contact">Contact</a>
            </li>
          </motion.ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="col-span-1 md:col-span-1"
          variants={containerVariants}
        >
          <div className="mb-4">Connect with Us:</div>
          <motion.div
            className="flex items-center space-x-4"
            variants={socialIconVariants}
          >
            <motion.span whileHover={{ scale: 1.1 }}>
              <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
            </motion.span>
            <motion.span whileHover={{ scale: 1.1 }}>
              <FaInstagram className="text-2xl hover:text-pink-600 cursor-pointer" />
            </motion.span>
            <motion.span whileHover={{ scale: 1.1 }}>
              <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
            </motion.span>
          </motion.div>

          <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>Review</ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-y-6 pb-4"
                  onSubmit={handleSubmit}
                >
                  <motion.div variants={formVariants}>
                    <div className="form-floating">
                      <input
                        className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
                        id="name"
                        placeholder="Enter Name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="name" className="text-gray-500">
                        Name
                      </label>
                    </div>
                  </motion.div>

                  <StarRatings
                    rating={form.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="40px"
                    starSpacing="10px"
                    changeRating={(newRating) =>
                      setForm({ ...form, rating: newRating })
                    }
                    starHoverColor="orange"
                    name="rating"
                  />

                  <motion.div
                    variants={formVariants}
                    className="form-floating mt-2"
                  >
                    <div className="form-floating">
                      <input
                        className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
                        id="message"
                        placeholder="Enter Email"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        type="message"
                      />
                      <label htmlFor="message" className="text-gray-500">
                        Message
                      </label>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-fit mx-auto py-2 px-4 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
                    variants={formVariants}
                  >
                    <span className="align-baseline">Send</span>
                    <IoIosSend className="ml-2 w-8 h-8 align-baseline" />
                  </motion.button>
                </form>
              </ModalBody>
              <ModalCloseButton />
            </ModalContent>
          </Modal>

          <motion.button
            className="mt-8"
            variants={containerVariants}
            whileHover={{ scale: 1.1 }}
            onClick={onOpen}
          >
            <div className="flex gap-x-1 items-center">
              <FaStar className="text-2xl mr-2" />
              <span className="text-sm font-semibold">Review Us</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
