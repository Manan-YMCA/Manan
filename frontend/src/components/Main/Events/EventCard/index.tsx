import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import "./style.css";

const boxItem = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
  transition: { ease: "easeOut", duration: 0.5 },
};

const EventCard = (props) => {
  const { name, desc, date, eventImage, detailsLink } = props.event;
  return (
    <div className="flex items-start justify-center w-full">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        viewport={{ once: true }}
        className="EventCard"
      >
        <div className="ImageDiv">
          <img src={eventImage} alt="" />
        </div>
        <div className="InfoDiv">
          <div className="Title">{name}</div>
          <div className="Date">{date}</div>
          <div className="Information">
            <ReactMarkdown>{desc}</ReactMarkdown>
          </div>
          {detailsLink && (
            <div className="pt-4">
              <a
                href={detailsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-[#FB5343] px-4 py-2 text-sm font-semibold text-[#FB5343] transition-colors hover:bg-[#FB5343] hover:text-white"
              >
                Add Details
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EventCard;
