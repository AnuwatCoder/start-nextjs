// components/Loading.jsx

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        {/* You can use CSS animations for a spinner */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
      <style jsx>{`
        .loader {
          position: relative;
          height: 64px;
          width: 64px;
        }
      `}</style>
    </div>
  );
};

export default Loading;
