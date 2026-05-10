import React, { useEffect, useState } from "react";
import MastTitle from "../../Shared/MastTitle";
import MemberCard from "./MemberCard";
import { MdDateRange } from "react-icons/md";
import LoadingScreen from "../../Shared/LoadingScreen";
import { motion } from "framer-motion";
import api from "../../../services/api";
import { backendEnabled } from "../../../lib/runtime";
import { mockMembers } from "../../../lib/mock-data";

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

const Members = () => {
  const [value, setValue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getMemberYear = (member: any) => {
    if (member?.passOutYear) {
      return Number(member.passOutYear);
    }

    if (member?.batchDate) {
      const parsedDate = new Date(`${member.batchDate}T00:00:00`);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.getFullYear();
      }
    }

    const fallbackYear = Number(member?.admission);
    return Number.isNaN(fallbackYear) ? null : fallbackYear;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      if (!backendEnabled) {
        if (isMounted) {
          setValue(mockMembers);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await api.get("/members");
        if (isMounted) {
          setValue(response.data.data || []);
        }
      } catch {
        if (isMounted) {
          setValue(mockMembers);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const yearArrayHandler = (array: any[]) => {
    const yeararray = array
      .map((item) => getMemberYear(item))
      .filter((item) => item !== null);
    const uniq = (items: number[]) => [...new Set(items)];
    return uniq(yeararray).sort((a, b) => a - b);
  };
  const yearwiseMemberHandeler = (array: any[], year: number) => {
    return array.filter((item) => getMemberYear(item) === year);
  };

  return (
    <React.Fragment>
      <MastTitle title="Members" />
      {value.length > 0 && (
        <div>
          {yearArrayHandler(value)
            .reverse()
            .map((year) => (
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
                  className=" grid grid-cols-1 lg:grid-cols-2 gap-12 align-top"
                >
                  {yearwiseMemberHandeler(value, year).map(
                    (member: any, index: number) => {
                      let members;
                      if (member) {
                        members = <MemberCard member={member} key={member.id || index} />;
                      }
                      return members;
                    }
                  )}
                </motion.li>
              </motion.div>
            ))}
        </div>
      )}
      {!value && (
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>
      )}
    </React.Fragment>
  );
};

export default Members;
