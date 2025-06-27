import React from "react";
import { FaBuilding, FaCalendarAlt, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hacks = ({ hackathon }) => {
  const date = new Date(hackathon.registrationDeadline);
  return (
    <Link to={`/hackathons/${hackathon._id}`} >
      <div className="w-[80rem] p-5 flex flex-col sm:flex-row gap-8 border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
        {/* Image Section */}
        <img
          src={hackathon.bannerImage}
          alt={hackathon.title}
          className="h-48 w-full sm:w-64 object-cover rounded-2xl shadow-sm"
        />

        {/* Details Section */}
        <div className="flex flex-col justify-center w-full">
          <div>
            <h1 className="text-2xl font-bold text-black hover:text-[#42AE9A] mb-3">
              {hackathon.title}
            </h1>
          </div>

          <div className="text-gray-700 text-sm space-y-3">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-[#42AE9A]" />
              <p>
                <span className="font-semibold mr-2">Organized by:</span>
                {hackathon.organisedBy || "College"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#42AE9A]" />
              <p>
                <span className="font-semibold mr-2">Expires on:</span>
                {date.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaTrophy className="text-[#42AE9A]" />
              <p>
                <span className="font-semibold mr-2">Prize Money:</span>
                {hackathon.prizes.reduce(
                  (acc, item) => parseInt(item.amount) + acc,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Hacks;
