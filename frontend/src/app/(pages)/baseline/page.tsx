"use client";

import usePostStrategy from "@/_api/usePostStrategy";
import { useStrategy } from "@/_recoil/_hooks/useStrategy";
import Entity from "@/app/(components)/Entity";
import TotalResult from "@/app/(components)/TotalResult";
import LevelOption from "@/app/(components)/baseline/LevelOption";
import Loading from "@/app/(components)/common/Loading";
import { useState } from "react";
import { motion } from "framer-motion";

const BaselinePage = () => {
  const [id, setId] = useState(0);
  const { setStrategyByLevel } = useStrategy();

  const { isLoading, postStrategyData, data } = usePostStrategy();

  return (
    <main className="flex flex-col sm:flex-row px-4 py-5 w-full gap-2">
      {isLoading && <Loading />}
      <div className="basis-[20%]">
        <Entity menu="baseline" />
      </div>
      <div className="flex flex-col gap-2 basis-[80%]">
        <div className="flex justify-end w-full py-4">
          <motion.button
            className="bg-[#5D63F1] hover:bg-[#5D63F1]/50 text-white py-2 h-10 w-20 rounded-md"
            onClick={postStrategyData}
            whileTap={{ scale: 0.85 }}
          >
            Done
          </motion.button>
        </div>
        <div className="flex flex-1 overflow-x-auto gap-2 sm:w-[80vw]">
          {CONTENT.map((el, i) => (
            <LevelOption
              key={i}
              index={i}
              en={el.en}
              kr={el.kr}
              checked={i === id}
              onChange={() => {
                setId(i);
                setStrategyByLevel(i);
              }}
            />
          ))}
        </div>
        <div className="basis-auto">
          <TotalResult data={data} />
        </div>
      </div>
    </main>
  );
};

export default BaselinePage;

const CONTENT = [
  {
    en: "All regions use\ncloud storage\nData Distribution",
    kr: "Using general cloud storage for all service regions\n\nLow latency and high throughput performance\n\nDesigned to deliver 99.99% availability",
  },
  {
    en: "Cloud usage 90%\nEdge usage 10%\nData Distribution",
    kr: "10% of the service area uses edge storage\n\nSpeed improved by 42.9% compared to cloud storage\n\nDesigned to deliver 99.95% availability",
  },
  {
    en: "Cloud usage 75%\nEdge usage 25%\nData Distribution",
    kr: "25% of the service area uses edge storage\n\nSpeed improved by 77.8% compared to cloud storage\n\nDesigned to deliver 99.95% availability",
  },
  {
    en: "Cloud usage 60%\nEdge usage 40%\nData Distribution",
    kr: "40% of the service area uses edge storage\n\nSpeed improved by 87.2% compared to cloud storage\n\nDesigned to deliver 99.95% availability",
  },
  {
    en: "Cloud usage 25%\nEdge usage 75%\nData Distribution",
    kr: "75% of the service area uses edge storage\n\nSpeed improved by 98.7% compared to cloud storage\n\nDesigned to deliver 99.95% availability",
  },
  {
    en: "All regions use\nedge storage\nData Distribution",
    kr: "All service regions use edge storage\n\nSpeed improved by 99% compared to cloud storage\n\nDesigned to deliver 99.95% availability",
  },
];
