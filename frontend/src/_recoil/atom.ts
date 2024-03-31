import { atom } from "recoil";

const STRATEGY = atom({
  key: "STRATEGY",
  default: [
    { local_id: 1, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 2, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 3, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 4, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 5, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 6, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 7, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 8, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 9, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 10, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 11, storage_type: "CLOUD", storage_id: 0 },
    { local_id: 12, storage_type: "CLOUD", storage_id: 0 },
  ],
});

const IS_CUSTOMIZATION_MODE = atom({
  key: "isCustomizationMode",
  default: true,
});

export { STRATEGY, IS_CUSTOMIZATION_MODE };
