const TimelineItem = ({ title, date, isFirst = false, isLast = false }) => {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          {!isFirst && <div className="w-px h-4 bg-gray-300"></div>}
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          {!isLast && <div className="w-px h-full bg-gray-300"></div>}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500">{date}</p>
        </div>
      </div>
    );
  };
  
  export default TimelineItem;