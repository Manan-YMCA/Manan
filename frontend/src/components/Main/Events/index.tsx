import React, { useEffect, useState } from "react";
import MastTitle from "../../Shared/MastTitle";
import EventCard from "./EventCard";
import { MdDateRange } from "react-icons/md";
import LoadingScreen from "../../Shared/LoadingScreen";
import { motion } from "framer-motion";
import api from "../../../services/api";
import { backendEnabled } from "../../../lib/runtime";
import { mockEvents } from "../../../lib/mock-data";

// import "./style.css";

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

const Events = () => {
  const [value, setValue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getEventDate = (event: any) => {
    if (event?.eventDateValue) {
      const parsedDate = new Date(`${event.eventDateValue}T00:00:00`);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    if (event?.date) {
      const parsedDate = new Date(event.date);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    const fallbackDate = new Date(event.timestamp);
    return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      if (!backendEnabled) {
        if (isMounted) {
          setValue(mockEvents);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await api.get("/events");
        if (isMounted) {
          setValue(response.data.data || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch events from backend.", error);
          setValue([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const yearArrayHandler = (array: any[]) => {
    const yearArray = array
      .map((item) => getEventDate(item)?.getFullYear() ?? null)
      .filter((year) => year !== null);
    const uniq = (items: number[]) => [...new Set(items)];
    return uniq(yearArray).sort((a, b) => b - a);
  };
  const eventsArrayHandler = (array: any[], year: number) => {
    const eventsArray = array
      .filter((data) => getEventDate(data)?.getFullYear() === year)
      .sort((a, b) => {
        return (getEventDate(a)?.getTime() || 0) - (getEventDate(b)?.getTime() || 0);
      });
    return eventsArray;
  };

  return (
    <React.Fragment>
      <MastTitle title="Events" />
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
              className=" grid grid-cols-1 lg:grid-cols-2 gap-x-[10rem] gap-y-[5rem] align-top"
            >
              {eventsArrayHandler(value, year)
                .reverse()
                .map((event: any) => (
                  <EventCard key={event.id} event={event} />
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

export default Events;
