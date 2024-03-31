import { CAPTION_INFO } from "@/_assets/data/caption";
import { useCustomizationMode } from "@/_recoil/_hooks/useCustomizationMode";
import { useStrategy } from "@/_recoil/_hooks/useStrategy";
import { motion } from "framer-motion";
import { useState } from "react";

const Caption = ({ localId }: { localId: number }) => {
  const { isCustomizationMode } = useCustomizationMode();
  const { getStorageType, setStorageType } = useStrategy();

  return (
    <div className="p-3 flex flex-col gap-1 absolute left-10 top-10 bg-white/80 rounded-lg shadow-lg flex-nowrap cursor-pointer">
      <div className="flex gap-2 border-b pb-2 border-gray-300 items-center">
        <p className="font-semibold whitespace-nowrap text-[14px]">
          Storage Type
        </p>
        {isCustomizationMode ? (
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <input
                className="checked:bg-slate-500"
                type="radio"
                value={getStorageType(localId)}
                checked={getStorageType(localId) === "CLOUD"}
                onChange={() => {
                  setStorageType(localId, "CLOUD");
                }}
              />
              <label className="text-[13px]">Cloud</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                className="checked:bg-slate-500"
                type="radio"
                value={getStorageType(localId)}
                checked={getStorageType(localId) === "EDGE"}
                onChange={() => {
                  setStorageType(localId, "EDGE");
                }}
              />
              <label className="text-[13px]">Edge</label>
            </div>
          </div>
        ) : (
          <>
            <label className="text-[12px]">{getStorageType(localId)}</label>
          </>
        )}
      </div>
      <div className="flex gap-1">
        <p className="font-semibold whitespace-nowrap text-[13px]">
          Region ID:
        </p>
        <p className="text-[13px]">{`${CAPTION_INFO[localId - 1].local_id}`}</p>
      </div>
      <div className="flex gap-1">
        <p className="font-semibold whitespace-nowrap text-[13px]">
          Storage ID:
        </p>
        <p className="text-[13px]">
          {getStorageType(localId) === "CLOUD"
            ? "0"
            : CAPTION_INFO[localId - 1].local_id}
        </p>
      </div>
      <div className="flex gap-1">
        <p className="font-semibold whitespace-nowrap text-[13px]">
          Data size:
        </p>
        <p className="text-[13px]">{`${
          CAPTION_INFO[localId - 1].data_size
        } GB`}</p>
      </div>
      <div className="flex gap-1">
        <p className="font-semibold whitespace-nowrap text-[13px]">
          Number of users:
        </p>
        <p className="text-[13px]">{`${
          CAPTION_INFO[localId - 1].population
        }`}</p>
      </div>
    </div>
  );
};

const CaptionProvider = ({
  localId,
  children,
}: {
  localId: number;
  children: React.ReactNode;
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      className="relative"
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => setIsHover(false)}
      whileHover={{ scale: 1.2, zIndex: 10 }}
    >
      {children}
      {isHover && <Caption localId={localId} />}
    </motion.div>
  );
};

export default CaptionProvider;
export { Caption };
