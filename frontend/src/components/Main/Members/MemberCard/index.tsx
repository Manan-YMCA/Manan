import React from "react";
import { motion } from "framer-motion";

import "./style.css";

const MemberCard = (props) => {
  const {
    name,
    frameworks,
    languages,
    otherSkills,
    banner,
    pfp,
    socialLinks = [],
    role,
  } = props.member;
  return (
    <React.Fragment>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        viewport={{ once: true }}
        className="MemberCard"
      >
        <div className="CardDiv">
          <div className="BannerImageDiv">
            <img className="Image" src={banner || "/banner-manan.png"} alt="cover" />
          </div>
          <div className="DpImageDiv">
            <img className="DpImage" src={pfp || "/logo-manan.png"} alt="member" />
          </div>
          <div className="InfoDiv">
            <h2>{name}</h2>
            <h3>{role}</h3>
            <hr className="my-2 h-[2px]" />
            <div className="ExtraInfo">
              <p>
                <span>Languages :&nbsp;</span>
                {languages}
              </p>
            </div>
            <div className="ExtraInfo">
              <p>
                <span>Tech Stack :&nbsp;</span>
                {frameworks}
              </p>
            </div>
            <div className="ExtraInfo">
              <p>
                <span>Other skills :&nbsp;</span>
                {otherSkills}
              </p>
            </div>
            <div className="ExtraInfo">
              <p className="flex flex-wrap gap-2">
                <span>Profile links :</span>
                {socialLinks.map((link, index) => (
                  <div key={index}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default MemberCard;
