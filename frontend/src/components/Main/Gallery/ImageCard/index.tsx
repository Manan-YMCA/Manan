import React from "react";
import { motion } from "framer-motion";

import "./style.css";

const ImageCard = (props) => {
  const { name, desc, image } = props.gallery;
  return (
    <React.Fragment>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        viewport={{ once: true }}
        className="ImageCardDiv"
      >
        <div className="content">
          <div className="content-overlay"></div>
          <img
            className="content-image"
            alt="manan"
            src={image}
          />
          <div className="content-details fadeIn-bottom">
            <h3 className="content-title">{name}</h3>
            <p className="content-text">{desc}</p>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default ImageCard;
