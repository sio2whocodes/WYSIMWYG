const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full backdrop-blur-sm z-10 flex items-center justify-center">
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full text-[#5D63F1] border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
