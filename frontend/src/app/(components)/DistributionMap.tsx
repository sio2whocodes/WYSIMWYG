import {
  EightBlock,
  ElevenBlock,
  FiveBlock,
  FourBlock,
  NineBlock,
  OneBlock,
  SevenBlock,
  SixBlock,
  TenBlock,
  ThreeBlock,
  TwelveBlock,
  TwoBlock,
} from "@/_assets/icons";
import SectionWrapper from "./common/SectionWrapper";
import CaptionProvider from "./common/Caption";
import { useStrategy } from "@/_recoil/_hooks/useStrategy";

const DistributionMap = () => {
  const { getStorageType } = useStrategy();
  return (
    <SectionWrapper title="Distribution Map">
      <div className="bg-gray-200 w-full relative">
        <img className="" src="/map_img.jpg" alt="map" />

        <div className="absolute top-[17%] left-[15%] w-[16%]">
          <CaptionProvider localId={1}>
            <OneBlock storageType={getStorageType(1)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[17%] left-[32%] w-[15%]">
          <CaptionProvider localId={2}>
            <TwoBlock storageType={getStorageType(2)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[35%] left-[14.5%] w-[10%]">
          <CaptionProvider localId={3}>
            <ThreeBlock storageType={getStorageType(3)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[35%] left-[25.5%] w-[13%]">
          <CaptionProvider localId={4}>
            <FourBlock storageType={getStorageType(4)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[33%] left-[39%] w-[23%]">
          <CaptionProvider localId={5}>
            <FiveBlock storageType={getStorageType(5)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[17%] left-[48%] w-[14%]">
          <CaptionProvider localId={6}>
            <SixBlock storageType={getStorageType(6)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[17%] left-[63%] w-[15%]">
          <CaptionProvider localId={7}>
            <SevenBlock storageType={getStorageType(7)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[34%] left-[63%] w-[14%]">
          <CaptionProvider localId={8}>
            <EightBlock storageType={getStorageType(8)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[56%] left-[15%] w-[16%]">
          <CaptionProvider localId={9}>
            <NineBlock storageType={getStorageType(9)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[56%] left-[32%] w-[15%]">
          <CaptionProvider localId={10}>
            <TenBlock storageType={getStorageType(10)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[62%] left-[48%] w-[14%]">
          <CaptionProvider localId={11}>
            <ElevenBlock storageType={getStorageType(11)} />
          </CaptionProvider>
        </div>
        <div className="absolute top-[61%] left-[63%] w-[15%]">
          <CaptionProvider localId={12}>
            <TwelveBlock storageType={getStorageType(12)} />
          </CaptionProvider>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DistributionMap;
