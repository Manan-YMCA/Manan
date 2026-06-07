import { motion } from "framer-motion";
import React from "react";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillYoutube,
} from "react-icons/ai";
//import'./style.css';

const SocialLinks = (props) => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };

  return (
    <React.Fragment>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={list}
        className="flex w-[220px] justify-between "
      >
        <motion.a
          href="mailto:manantechnosurge@gmail.com"
          target="_blank"
          variants={item}
        >
          <AiFillMail
            size="30px"
            className="transform transition duration-500 hover:scale-[1.3] cursor-pointer"
          />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/manantechnosurge/"
          target="_blank"
          variants={item}
        >
          <AiFillInstagram
            size="30px"
            className="transform transition duration-500 hover:scale-[1.3] cursor-pointer"
          />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/company/manan-ymca"
          target="_blank"
          variants={item}
        >
          <AiFillLinkedin
            size="30px"
            className="transform transition duration-500 hover:scale-[1.3] cursor-pointer"
          />
        </motion.a>
        <motion.a
          href="https://www.youtube.com/channel/UC_wkbc5yiQyol-ONyVdcE4w"
          target="_blank"
          variants={item}
        >
          <AiFillYoutube
            size="30px"
            className="transform transition duration-500 hover:scale-[1.3] cursor-pointer"
          />
        </motion.a>
      </motion.ul>
    </React.Fragment>
  );
};

export default SocialLinks;
