import FormattedData from "./FormattedData";

const FormattedDataWithLabel = ({
  label,
  data,
  unit,
}: {
  label: string;
  data: number;
  unit: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center basis-[33%]">
      <label className="text-[14px] text-gray-500">{label}</label>
      <FormattedData data={data} unit={unit} />
    </div>
  );
};

export default FormattedDataWithLabel;
