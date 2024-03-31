"use client";

import Entity from "../(components)/Entity";
import ManagementBoard from "../(components)/ManagementBoard";
import DistributionMap from "../(components)/DistributionMap";
import EstimatedCosts from "../(components)/EstimatedCosts";
import EstimatedPerformance from "../(components)/EstimatedPerformance";
import TotalResult from "../(components)/TotalResult";
import Loading from "../(components)/common/Loading";
import usePostStrategy from "@/_api/usePostStrategy";

export default function Home() {
  const { isLoading, postStrategyData, data } = usePostStrategy();

  return (
    <main className="flex flex-col sm:flex-row px-4 py-5 w-full gap-2">
      {isLoading && <Loading />}
      <div className="basis-[20%]">
        <Entity menu="user" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="basis-auto">
          <ManagementBoard handleSubmit={postStrategyData} />
        </div>
        <div className="flex-col lg:flex-row gap-2 flex">
          <div className="lg:basis-[70%] flex flex-col gap-2 ">
            <div className="basis-auto">
              <DistributionMap />
            </div>
            <div className="">
              <TotalResult data={data} />
            </div>
          </div>
          <div className="flex lg:flex-col gap-2 lg:basis-[30%]">
            <div className="basis-auto">
              <EstimatedCosts data={data} />
            </div>
            <div className="basis-2/3">
              <EstimatedPerformance data={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
