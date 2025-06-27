import React, { useContext } from "react";
import { HackContext } from "../../../context/HackContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faTrophy,
  faAward,
  faClock,
  faPeopleGroup,
  faImage,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

const Hack4 = () => {
  const {
    title,
    description,
    location,
    customLocation,
    startDate,
    endDate,
    bannerPreview,
    registrationDeadline,
    teamSize,
    maxTeamSize,
    timeline,
    eligibility,
    website,
    contactEmail,
    rules,
    prizes,
  } = useContext(HackContext);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Title</h3>
            <p className="text-gray-600">{title}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Location</h3>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-blue-500" />
              {location === "Online" ? "Online" : customLocation}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Dates</h3>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 text-blue-500" />
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </p>
          </div>
          
          {bannerPreview && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Banner</h3>
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Registration Deadline</h3>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 text-blue-500" />
              {new Date(registrationDeadline).toLocaleDateString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Team Size</h3>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faPeopleGroup} className="mr-2 text-blue-500" />
              {teamSize === "Individual" ? "Individual" : `Team (max ${maxTeamSize})`}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Contact Email</h3>
            <p className="text-gray-600">{contactEmail}</p>
          </div>
          
          {website && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Website</h3>
              <p className="text-gray-600 flex items-center">
                <FontAwesomeIcon icon={faLink} className="mr-2 text-blue-500" />
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {website}
                </a>
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Eligibility</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {eligibility.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Timeline</h3>
          <div className="space-y-3">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{item.event}</p>
                  <p className="text-gray-600 flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-500" />
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Rules & Guidelines</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Prizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prizes.map((prize, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className={`mr-2 ${
                    index === 0
                      ? "text-yellow-500"
                      : index === 1
                      ? "text-gray-400"
                      : "text-amber-700"
                  }`}
                />
                <h3 className="font-medium text-gray-700">{prize.place}</h3>
              </div>
              <p className="text-gray-600 font-bold">${prize.amount}</p>
              <p className="text-gray-600 mt-1">{prize.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hack4;