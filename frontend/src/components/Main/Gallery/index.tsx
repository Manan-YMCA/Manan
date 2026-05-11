import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import MastTitle from "../../Shared/MastTitle";
import { MdDateRange } from "react-icons/md";
import LoadingScreen from "../../Shared/LoadingScreen";
import { motion } from "framer-motion";
import api from "../../../services/api";
import { backendEnabled } from "../../../lib/runtime";
import { mockGallery } from "../../../lib/mock-data";

//import'./style.css';
const boxList = {
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

const Gallery = () => {
  const [value, setValue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGallery = async () => {
      if (!backendEnabled) {
        if (isMounted) {
          setValue(mockGallery);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await api.get("/gallery");
        if (isMounted) {
          setValue(response.data.data || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch gallery from backend.", error);
          setValue([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  const yearArrayHandler = (array: any[]) => {
    const yearArray = array.map((item) =>
      new Date(item.timestamp).getFullYear()
    );
    const uniq = (items: number[]) => [...new Set(items)];
    return uniq(yearArray).sort((a, b) => b - a);
  };
  const yearwiseGalleryHandler = (array: any[], year: number) => {
    return array.filter(
      (data) => new Date(data.timestamp).getFullYear() === year
    );
  };

  return (
    <React.Fragment>
      <MastTitle title="Gallery" />
      {value.length > 0 &&
        yearArrayHandler(value).map((year) => (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            viewport={{ once: true }}
            key={year}
            className="px-[0.5rem] md:px-[4rem] pt-[3rem] md:pt-[4rem] "
          >
            <div className="flex gap-2 items-center TextOrange text-[34px] mb-12 pl-4 border-l-8 border-[#FB5343] font-bold BackgroundBlur ">
              <MdDateRange />
              <p>{year}</p>
            </div>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxList}
              className=" grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {yearwiseGalleryHandler(value, year).map((gallery: any) => (
                <ImageCard key={gallery.id} gallery={gallery} />
              ))}
            </motion.li>
          </motion.div>
        ))}
      {loading && (
        <div className="h-screen">
          <LoadingScreen />
        </div>
      )}
    </React.Fragment>
  );
};

export default Gallery;
