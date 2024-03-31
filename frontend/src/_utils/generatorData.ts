import { allOfStrategyData } from "@/_assets/data/strategy";

const generateData = (level: number, localId: number, storageType: string) => {
  const newStrategyData = allOfStrategyData[level]
    .filter((el) => el.local_id)
    .map((el) => {
      if (el.storage_type !== storageType) el.storage_type = storageType;
    });
};
