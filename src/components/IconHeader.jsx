import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconHeader = ({ icon, color, title }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className={`bg-${color}-100 p-3 rounded-full`}>
        <FontAwesomeIcon icon={icon} className={`text-${color}-600 text-xl`} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default IconHeader;