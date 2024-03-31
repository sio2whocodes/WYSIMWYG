import { ResultType } from "@/_types/data";
import BlueLabelData from "./common/BlueLabelData";
import FormattedData from "./common/FormattedData";
import FormattedDataWithLabel from "./common/FormattedDataWithLabel";
import SectionWrapper from "./common/SectionWrapper";

const EstimatedPerformance = ({ data }: { data: ResultType }) => {
  return (
    <SectionWrapper title="Performance Simulation Result">
      <div className="flex flex-col gap-2">

        <BlueLabelData blueLabelText="Average response time">
          <div className="flex gap-7">
            <FormattedDataWithLabel
              label="total"
              data={data["01avg_response_time"] || 0}
              unit="ms"
            />
            <FormattedDataWithLabel
              label="in cloud"
              data={data["03avg_response_time_in_cloud"] || 0}
              unit="ms"
            />
            <FormattedDataWithLabel
              label="in edge"
              data={data["02avg_response_time_in_edge"] || 0}
              unit="ms"
            />
          </div>
        </BlueLabelData>

        <BlueLabelData blueLabelText="Response rate under 100ms">
          <div className="flex gap-7">
            <FormattedDataWithLabel
              label="total"
              data={data["06success_rate_in_downtime($s)"] || 0}
              unit="%"
            />
            <FormattedDataWithLabel
              label="in cloud"
              data={data["08success_rate_in_downtime($s) - cloud"] || 0}
              unit="%"
            />
            <FormattedDataWithLabel
              label="in edge"
              data={data["07success_rate_in_downtime($s) - edge"] || 0}
              unit="%"
            />
          </div>
        </BlueLabelData>

        <BlueLabelData blueLabelText="Min, max response time">
          <div className="flex gap-5">
            <FormattedDataWithLabel
              label="Min"
              data={data["04min_response_time"] || 0}
              unit="ms"
            />
            <FormattedDataWithLabel
              label="Max"
              data={data["05max_response_time"] || 0}
              unit="ms"
            />
          </div>
        </BlueLabelData>

        <BlueLabelData blueLabelText="The number of users who will benefit">
          <div className="flex items-center h-full">
            <FormattedData
              data={data["09range_of_benefit(edge)"] || 0}
              unit="users/2180 users"
            />
          </div>
        </BlueLabelData>

        <BlueLabelData blueLabelText="Latency difference from cloud-only strategy">
          <div className="flex items-center h-full">
            <FormattedData data={data["10latency_difference"] || 0} unit="ms improvement" />
          </div>
        </BlueLabelData>
      </div>
    </SectionWrapper>
  );
};

export default EstimatedPerformance;
