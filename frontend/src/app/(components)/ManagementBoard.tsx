import SectionWrapper from "./common/SectionWrapper";
import { useCustomizationMode } from "@/_recoil/_hooks/useCustomizationMode";
import { useStrategy } from "@/_recoil/_hooks/useStrategy";
import { useState } from "react";
import { motion } from "framer-motion";

const ManagementBoard = ({ handleSubmit }: { handleSubmit: () => void }) => {
  const { isCustomizationMode, setIsCustomizationMode } =
    useCustomizationMode();
  const { setStrategyByLevel } = useStrategy();
  const [level, setLevel] = useState(0);

  return (
    <SectionWrapper title="Dash Board">
      <div className="flex flex-col gap-2 pb-3">
        <div className="flex gap-2">
        </div>

        <div className="flex flex-col lg:items-center justify-between gap-10 md:flex-row">
          <div className="flex flex-col flex-1">
            <p className="text-[16px]">Distribution Level</p>
            <div className="flex gap-2">
            </div>
            <div>
              <input
                className="accent-[#5D63F1] [&::-webkit-slider-thumb]:bg-white w-full"
                type="range"
                min="0"
                max="5"
                defaultValue={0}
                onChange={(e) => {
                  setStrategyByLevel(Number(e.target.value));
                  setLevel(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex justify-between">
              {["Cloud", "Lv 1", "Lv 2", "Lv 3", "Lv 4", "Edge"].map(
                (el, i) => (
                  <p
                    className="text-[14px]"
                    style={
                      i === level ? { color: "#6B7280" } : { color: "#c5c5c5" }
                    }
                    key={i}
                  >
                    {el}
                  </p>
                )
              )}
            </div>
          </div>
          <motion.button
            className="bg-[#5D63F1] hover:bg-[#5D63F1]/50 text-white py-2 md:h-10 md:w-20 rounded-md"
            onClick={handleSubmit}
            whileTap={{ scale: 0.85 }}
          >
            Simulate
          </motion.button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ManagementBoard;
