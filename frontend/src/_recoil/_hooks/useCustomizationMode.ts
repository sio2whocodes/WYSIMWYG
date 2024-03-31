import { useRecoilState } from "recoil";
import { isCustomizationModeState } from "../selector";

const useCustomizationMode = () => {
  const [isCustomizationMode, setIsCustomizationMode] = useRecoilState(
    isCustomizationModeState
  );

  return { isCustomizationMode, setIsCustomizationMode };
};

export { useCustomizationMode };
