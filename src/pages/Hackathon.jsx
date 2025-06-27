import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faHeart,
  faPeopleGroup,
  faTrophy,
  faAward,
  faClock,
  faUserCheck,
  faComment,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommentSection from "../components/CommentSection";
import IconHeader from "../components/IconHeader";
import TimelineItem from "../components/TimelineItem";
import PrizeCard from "../components/PrizeCard";
import InfoCard from "../components/InfoCard";
import { HackContext } from "../../context/HackContext";

const Hackathon = () => {
  const { notify, userData } = useContext(HackContext);
  const { hackId } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [hackData, setHackData] = useState(null);
  const [isActive, setIsActive] = useState("");
  const [hackTimeline, setHackTimeline] = useState([]);
  const [isRegisteredToHack, SetisRegisteredToHack] = useState(false);

  const isHackActive = (data) => {
    const now = new Date();
    const currentTime = now.toISOString();
    if (currentTime > data.registrationDeadline) {
      setIsActive("Closed");
    } else {
      setIsActive("Active");
    }
  };

  const registerHandle = () => {
    const path = `/hackathons/${hackId}/register`;
    navigate(path);
  };

  const cancelRegister = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hack/cancel`,
        { hackId },
        {
          withCredentials: true,
        }
      );
      notify(res.data);
      SetisRegisteredToHack(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (isRegisteredToHack) {
      cancelRegister();
    } else {
      registerHandle();
    }
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/hack/getIndividualHack/${hackId}`
      );
      setHackData(data);
      setHackTimeline(data.timeline);
      isHackActive(data);

      const registeredUserId = localStorage.getItem("user-id");

      const userIds = data.users.map((user) => user.userId.toString());

      if (userIds.includes(registeredUserId)) {
        SetisRegisteredToHack(true);
      }
    } catch (error) {
      console.error("Error fetching hackathon data:", error);
    }
  };

  const getButtonLabel = () => {
    if (isActive === "Closed") return "Registration closed";
    if (isRegisteredToHack && isActive === "Active")
      return "Cancel Registration";
    return "Register Now";
  };

  const toggleSave = () => {
    setSaved(!saved);
  };
  useEffect(() => {
    getData();
  }, []);

  if (!hackData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4 md:px-2">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-[250px] md:h-[400px]">
          <img
            src={hackData.bannerImage}
            className="w-full h-full object-cover"
            alt="Hackathon banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-8">
            <div className="text-white">
              <span
                className={`${
                  isActive === "Active" ? "bg-blue-600" : "bg-red-500"
                } text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block`}
              >
                {isActive}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {hackData.title}
              </h1>
              <p className="text-blue-200 flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                {hackData.location === "Online"
                  ? "Online"
                  : hackData.customLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <IconHeader
                icon={faAward}
                color="blue"
                title="About the Hackathon"
              />
              <pre className="text-gray-600 font-sans leading-relaxed whitespace-pre-wrap break-words overflow-auto max-h-[600px] max-w-full">
                <code>{hackData.description}</code>
              </pre>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <IconHeader icon={faClock} color="purple" title="Timeline" />
              <div className="space-y-4">
                {hackTimeline.map((item, index) => (
                  <TimelineItem
                    key={item._id || index}
                    title={item.event}
                    date={new Date(item.date).toLocaleDateString()}
                    isFirst={index === 0}
                    isLast={index === hackTimeline.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Prizes Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <IconHeader
                icon={faTrophy}
                color="yellow"
                title="Prizes & Rewards"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hackData.prizes.map((prize, index) => (
                  <PrizeCard
                    key={prize._id || index}
                    place={`${prize.place} Place`}
                    amount={`$${prize.amount}`}
                    bonus={prize.description}
                    color={
                      index === 0 ? "yellow" : index === 1 ? "gray" : "amber"
                    }
                  />
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection isRegisteredToHack={isRegisteredToHack} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Register Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Free Entry</span>
                <button
                  onClick={toggleSave}
                  className={`${
                    saved ? "bg-red-100 text-red-600" : "bg-white text-blue-600"
                  } px-4 py-2 rounded-lg font-semibold transition-all`}
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  {saved ? "Saved" : "Save"}
                </button>
              </div>
              <button
                className={`
                  w-full py-3 px-6 rounded-lg
                  font-medium text-white
                  transition-colors duration-200
                  ${
                    isRegisteredToHack
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    isRegisteredToHack
                      ? "focus:ring-red-300"
                      : "focus:ring-blue-300"
                  }
                  disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:text-black disabled:font-bold
                  shadow-sm hover:shadow-md
                `}
                disabled={isActive == "Closed"}
                onClick={handleSubmit}
              >
                {getButtonLabel()}
              </button>
              <p className="text-blue-200 text-sm mt-3 text-center">
                Registration closes{" "}
                <span className="font-bold">
                  {new Date(hackData.registrationDeadline).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-5">
                <InfoCard
                  icon={faUserCheck}
                  iconColor="green"
                  title="Registered"
                  value="1,247"
                />
                <InfoCard
                  icon={faPeopleGroup}
                  iconColor="purple"
                  title="Participation"
                  value={hackData.teamSize}
                />
                <InfoCard
                  icon={faCalendar}
                  iconColor="blue"
                  title="Submission Deadline"
                  value={new Date(hackData.endDate).toLocaleDateString()}
                />
              </div>
            </div>

            {/* Eligibility Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3">Eligibility</h3>
              <ul className="space-y-2 text-gray-600">
                {hackData.eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3">Organized by</h3>
              <div className="flex items-center gap-3">
                <img
                  src={userData.profileImage}
                  alt="Organizer"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{hackData.organisedBy}</p>
                  <p className="text-gray-500 text-sm">Since 2018</p>
                </div>
              </div>
              <button className="w-full mt-4 border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-all">
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Register Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Free Entry</span>
              <button
                onClick={toggleSave}
                className={`${
                  saved ? "bg-red-100 text-red-600" : "bg-white text-blue-600"
                } px-4 py-2 rounded-lg font-semibold transition-all`}
              >
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                {saved ? "Saved" : "Save"}
              </button>
            </div>

            <button
              className={`
                  w-full py-3 px-6 rounded-lg
                  font-medium text-white
                  transition-colors duration-200
                  ${
                    isRegisteredToHack
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    isRegisteredToHack
                      ? "focus:ring-red-300"
                      : "focus:ring-blue-300"
                  }
                  shadow-sm hover:shadow-md
                `}
              onClick={handleSubmit}
            >
              {isRegisteredToHack ? "Cancel Registration" : "Register Now"}
            </button>
            <p className="text-blue-200 text-sm mt-3 text-center">
              Registration closes{" "}
              <span className="font-bold">
                {new Date(hackData.registrationDeadline).toLocaleDateString()}
              </span>
            </p>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <IconHeader
              icon={faAward}
              color="blue"
              title="About the Hackathon"
            />
            <p className="text-gray-600 leading-relaxed">
              {hackData.description}
            </p>
          </div>

          {/* Timeline Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <IconHeader icon={faClock} color="purple" title="Timeline" />
            <div className="space-y-4">
              {hackTimeline.map((item, index) => (
                <TimelineItem
                  key={item._id || index}
                  title={item.event}
                  date={new Date(item.date).toLocaleDateString()}
                  isFirst={index === 0}
                  isLast={index === hackTimeline.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Prizes Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <IconHeader
              icon={faTrophy}
              color="yellow"
              title="Prizes & Rewards"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hackData.prizes.map((prize, index) => (
                <PrizeCard
                  key={prize._id || index}
                  place={`${prize.place} Place`}
                  amount={`$${prize.amount}`}
                  bonus={prize.description}
                  color={
                    index === 0 ? "yellow" : index === 1 ? "gray" : "amber"
                  }
                />
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-5">
              <InfoCard
                icon={faUserCheck}
                iconColor="green"
                title="Registered"
                value="1,247"
              />
              <InfoCard
                icon={faPeopleGroup}
                iconColor="purple"
                title="Participation"
                value={hackData.teamSize}
              />
              <InfoCard
                icon={faCalendar}
                iconColor="blue"
                title="Submission Deadline"
                value={new Date(hackData.endDate).toLocaleDateString()}
              />
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-3">Eligibility</h3>
            <ul className="space-y-2 text-gray-600">
              {hackData.eligibility.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-3">Organized by</h3>
            <div className="flex items-center gap-3">
              <img
                src={userData.profileImage}
                alt="Organizer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{hackData.organisedBy}</p>
                <p className="text-gray-500 text-sm">Since 2018</p>
              </div>
            </div>
            <button className="w-full mt-4 border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-all">
              View Profile
            </button>
          </div>

          {/* Comments Section (Mobile - at the end) */}
          <CommentSection isRegisteredToHack={isRegisteredToHack} />
        </div>
      </div>
    </div>
  );
};

export default Hackathon;
