import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ icon, iconColor, title, value }) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`bg-${iconColor}-100 p-3 rounded-full`}>
        <FontAwesomeIcon icon={icon} className={`text-${iconColor}-600`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;