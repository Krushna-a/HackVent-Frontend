import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  const handleExploreNavigate = (index) => {
    if (index == 0) {
      navigate("/hackathons");
    } else {
      navigate("/events");
    }
  };

  const handleHostNavigate = (index) => {
    if (index == 0) {
      navigate("/newHack");
    } else {
      navigate("/newEvent");
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row w-full gap-10 px-6 sm:px-20 py-10 sm:py-20 justify-center items-center"
      style={{ perspective: "1200px" }}
    >
      {[0, 1].map((index) => {
        const isActive = activeCard === index;
        const offset = index - activeCard;

        const rotateY = isActive ? 0 : offset < 0 ? 50 : -50;
        const translateX = offset * 20;
        const translateZ = isActive ? 0 : -150;
        const scale = isActive ? 1.1 : 0.95;

        return (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className="h-[350px] w-[280px] sm:h-[350px] sm:w-[250px] flex justify-center items-center border rounded-lg shadow-xl cursor-pointer transition-all duration-700 transform"
            style={{
              transform: `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
              `,
              zIndex: isActive ? 10 : 5,
              opacity: isActive ? 1 : 0.8,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex flex-col gap-4 items-center justify-between bg-white p-6 rounded-lg shadow-lg max-w-xs w-full mx-auto">
              <div
                className={`border px-3 py-1 absolute border-b-2 bg-red-300 rounded-full text-sm ${
                  index === 1 ? "block" : "hidden"
                }`}
              >
                Upcoming
              </div>
              <img
                src={
                  index === 0
                    ? "/hackathon.avif"
                    : "/event.jpg"
                }
                alt={index === 0 ? "Hackathons" : "Events"}
                className="h-28 w-28 sm:h-32 sm:w-32 object-cover rounded-full border-4 border-gray-300 shadow-md"
              />
              <div className="flex flex-col gap-3 items-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {index === 0 ? "Hackathons" : "Events"}
                </h3>
                <p className="text-sm text-gray-600 text-center px-2">
                  {index === 0
                    ? "Join hackathons to test your skills, build solutions, and connect with tech enthusiasts!"
                    : "Join tech events to learn, collaborate, and grow with innovators!"}
                </p>
                <div className="flex flex-col gap-2 w-full mt-2">
                  <button
                    className="w-full py-2 px-4 text-xs sm:text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full border border-indigo-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    onClick={() => handleExploreNavigate(index)}
                  >
                    Explore {index === 0 ? "Hackathons" : "Events"}
                  </button>
                  <button
                    className="w-full py-2 px-4 text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full border border-emerald-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 mt-2"
                    onClick={() => handleHostNavigate(index)}
                  >
                    Host {index === 0 ? "Hackathons" : "Events"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
