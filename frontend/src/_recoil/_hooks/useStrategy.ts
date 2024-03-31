import { useRecoilState } from "recoil";
import { allOfStrategyData } from "@/_assets/data/strategy";
import { strategyState } from "../selector";
import { StrategyType } from "@/_types/data";

const useStrategy = () => {
  const [strategy, setStrategy] = useRecoilState(strategyState);

  const setStorageType = (localId: number, storageType: string) => {
    const custromStrategy: StrategyType[] = strategy.map((el) => {
      if (el.local_id === localId) {
        return { ...el, storage_type: storageType };
      } else {
        return { ...el };
      }
    });
    setStrategy(custromStrategy);
  };

  const setStrategyByLevel = (level: number) => {
    setStrategy(allOfStrategyData[level]);
  };

  const getStorageType = (localId: number) => {
    return strategy.find((el) => el.local_id === localId)?.storage_type || "";
  };

  const getStrategy = () => {
    return strategy;
  };

  return {
    strategy,
    setStrategy,
    setStrategyByLevel,
    getStorageType,
    setStorageType,
    getStrategy,
  };
};

export { useStrategy };
