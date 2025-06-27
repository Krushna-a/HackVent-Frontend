import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const PrizeCard = ({ place, amount, bonus, color }) => {
  return (
    <div className={`bg-gradient-to-br from-${color}-100 to-${color}-50 p-5 rounded-xl border border-${color}-200`}>
      <div className={`text-${color}-600 mb-2`}>
        <FontAwesomeIcon icon={faTrophy} className="text-2xl" />
      </div>
      <h3 className="font-bold text-gray-800">{place}</h3>
      <p className={`text-2xl font-bold text-${color}-600`}>{amount}</p>
      <p className="text-gray-500 text-sm mt-1">{bonus}</p>
    </div>
  );
};

export default PrizeCard;