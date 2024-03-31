import FormattedData from "./FormattedData";

const BlueLabelData = ({
  blueLabelText,
  children,
}: {
  blueLabelText: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[17px] text-[#5D63F1] font-semibold">
        {blueLabelText}
      </label>
      <div className="h-[50px]">{children}</div>
    </div>
  );
};

export default BlueLabelData;
