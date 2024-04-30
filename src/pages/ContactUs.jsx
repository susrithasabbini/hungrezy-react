import { FaAddressBook, FaChevronRight, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import contactBackground from "../assets/contactBackground.jpg";
import overlayImage from "../assets/overlay.png";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import Footer from "@/components/home/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../AuthContext";

const ContactUs = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/contact/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      setForm({
        name: "",
        email: "",
        message: "",
        subject: "",
      });
    } else {
      toast.error(data.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="w-full h-full relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Image */}
      <motion.img
        src={contactBackground}
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
          <motion.h1 className="text-5xl font-light">Our Contact</motion.h1>
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
            <p>Contact</p>
          </div>
        </div>
      </motion.div>
      <div className="lg:px-48 min-[100px]:px-16 px-16 py-20 flex lg:flex-row flex-col">
        <motion.div className="flex-1" variants={formVariants}>
          <h2 className="text-xl font-bold mb-4 text-orange-500">CONTACT</h2>
          <p className="text-5xl mb-4 font-semibold">Get In Touch With Us.</p>
          <p className="text-gray-600 mb-4 w-2/3">
            We are here to help you. If you have any queries, please feel free
            to contact us.
          </p>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <FaAddressBook className="text-2xl text-orange-500" />
                <p className="text-gray-600 font-semibold">Address:</p>
                <p className="text-gray-600 font-light">
                  P.O. Box 456, Zip Code
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-2xl text-orange-500" />
                <p className="text-gray-600 font-semibold">Location:</p>
                <p className="text-gray-600 font-light">
                  123 Main Street, Cityville
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <MdEmail className="text-2xl text-orange-500" />
                <p className="text-gray-600 font-semibold">Email:</p>
                <p className="text-gray-600 font-light">hungrezy@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaPhoneAlt className="text-2xl text-orange-500" />
                <p className="text-gray-600 font-semibold">Phone:</p>
                <p className="text-gray-600 font-light">+91 1234567890</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex-1" variants={formVariants}>
          <h2 className="text-xl font-bold mb-4 text-orange-500 lg:my-0 mt-16">
            MESSAGE
          </h2>
          <p className="text-5xl mb-4 font-semibold">Send Us A Message Now.</p>
          <p className="text-gray-600 mb-4 w-2/3">
            We are here to help you. If you have any queries, please feel free
            to contact us.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            <motion.div variants={formVariants} className="form-floating mt-2">
              <div className="form-floating">
                <input
                  className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email" className="text-gray-500">
                  Email
                </label>
              </div>
            </motion.div>

            {/* SELECT BOX
             */}

            <motion.div variants={formVariants} className="form-floating mt-2">
              <div className="form-floating">
                <select
                  className="form-select focus:shadow-none focus:border-amber-600 rounded-md"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="0">Select Subject</option>
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="subject" className="text-gray-500">
                  Subject
                </label>
              </div>
            </motion.div>

            {/* TextArea */}
            <motion.div variants={formVariants} className="form-floating mt-2">
              <div className="form-floating">
                <textarea
                  className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
                  id="message"
                  placeholder="Enter Message"
                  name="message"
                  type="text"
                  value={form.message}
                  onChange={handleChange}
                />
                <label htmlFor="message" className="text-gray-500">
                  Message
                </label>
              </div>
            </motion.div>
            <motion.button
              type="submit"
              className="w-56 mx-auto py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
              variants={formVariants}
            >
              <span className="align-baseline">Send Message</span>
              <IoIosSend className="ml-2 w-8 h-8 align-baseline" />
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default ContactUs;
