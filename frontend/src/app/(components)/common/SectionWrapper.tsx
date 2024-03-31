const SectionWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="bg-white w-full h-full pt-1 pb-3 px-5 rounded-lg">
      <h3 className="font-semibold text-lg py-3">{title}</h3>
      {children}
    </section>
  );
};

export default SectionWrapper;
