import React, { useContext } from "react";
import { HackContext } from "../../../context/HackContext";
import { faTrophy, faAward, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hack3 = () => {
  const {
    prizes = [{ place: "1st", amount: "", description: "" }],
    setPrizes,
  } = useContext(HackContext);

  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...prizes];
    if (!updatedPrizes[index]) {
      updatedPrizes[index] = { place: "", amount: "", description: "" };
    }
    updatedPrizes[index] = {
      ...updatedPrizes[index],
      [field]: value,
    };
    setPrizes(updatedPrizes);
  };

  const addPrize = () => {
    setPrizes([...prizes, { place: "", amount: "", description: "" }]);
  };

  const removePrize = (index) => {
    if (prizes.length > 1) {
      const updatedPrizes = [...prizes];
      updatedPrizes.splice(index, 1);
      setPrizes(updatedPrizes);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Prizes*
        </label>
        <div className="space-y-4">
          {prizes.map((prize, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-700">
                  <FontAwesomeIcon
                    icon={faTrophy}
                    className="mr-2 text-yellow-500"
                  />
                  {prize.place || "New Prize"}
                </h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removePrize(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Place
                  </label>
                  <input
                    type="text"
                    value={prize.place}
                    onChange={(e) =>
                      handlePrizeChange(index, "place", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      value={prize.amount}
                      onChange={(e) =>
                        handlePrizeChange(index, "amount", e.target.value)
                      }
                      className="pl-7 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={prize.description}
                    onChange={(e) =>
                      handlePrizeChange(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPrize}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FontAwesomeIcon icon={faAward} className="mr-2" />
          Add Another Prize
        </button>
      </div>
    </div>
  );
};

export default Hack3;