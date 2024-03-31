import { defaultResultValue } from "@/_assets/data/defaultResultValue";
import { useStrategy } from "@/_recoil/_hooks/useStrategy";
import { ResultType } from "@/_types/data";
import { useState } from "react";

const usePostStrategy = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResultType>(defaultResultValue);

  const { strategy } = useStrategy();

  const postStrategyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/postStrategy", {
        method: "POST",
        body: JSON.stringify({
          strategy: strategy,
        }),
      });
      const result = await response.json();
      setData(result.data);
      setIsLoading(false);

      return data;
    } catch (error) {
      throw new Error("[싪패]");
    }
  };

  return { isLoading, postStrategyData, data };
};

export default usePostStrategy;
