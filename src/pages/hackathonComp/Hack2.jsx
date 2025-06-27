import React, { useContext } from "react";
import { HackContext } from "../../../context/HackContext";
import {
  faMinus,
  faPlus,
  faClock,
  faCalendar,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hack2 = () => {
  const {
    registrationDeadline,
    setRegistrationDeadline,
    teamSize,
    setTeamSize,
    maxTeamSize,
    setMaxTeamSize,
    timeline,
    setTimeline,
    eligibility,
    setEligibility,
    website,
    setWebsite,
    contactEmail,
    setContactEmail,
    rules,
    setRules,
  } = useContext(HackContext);

  const handleTimelineChange = (index, field, value) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index] = {
      ...updatedTimeline[index],
      [field]: value,
    };
    setTimeline(updatedTimeline);
  };

  const handleRuleChange = (index, value) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const addRule = () => {
    setRules([...rules, ""]);
  };

  const removeRule = (index) => {
    if (rules.length > 1) {
      const updatedRules = [...rules];
      updatedRules.splice(index, 1);
      setRules(updatedRules);
    }
  };

  const handleEligibilityChange = (index, value) => {
    const updatedEligibility = [...eligibility];
    updatedEligibility[index] = value;
    setEligibility(updatedEligibility);
  };

  const addEligibility = () => {
    setEligibility([...eligibility, ""]);
  };

  const removeEligibility = (index) => {
    if (eligibility.length > 1) {
      const updatedEligibility = [...eligibility];
      updatedEligibility.splice(index, 1);
      setEligibility(updatedEligibility);
    }
  };

  const addTimelineEvent = () => {
    setTimeline([...timeline, { event: "", date: "" }]);
  };

  const removeTimelineEvent = (index) => {
    if (timeline.length > 0) {
      const updatedTimeline = [...timeline];
      updatedTimeline.splice(index, 1);
      setTimeline(updatedTimeline);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Registration Deadline*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faCalendar} className="text-gray-400" />
          </div>
          <input
            type="date"
            name="registrationDeadline"
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Team Size*
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="teamSize"
              value="Individual"
              checked={teamSize === "Individual"}
              onChange={(e) => setTeamSize(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Individual</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="teamSize"
              value="Team"
              checked={teamSize === "Team"}
              onChange={(e) => setTeamSize(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Team</span>
          </label>
        </div>
        {teamSize === "Team" && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Team Size*
            </label>
            <input
              type="number"
              name="maxTeamSize"
              value={maxTeamSize}
              onChange={(e) => setMaxTeamSize(e.target.value)}
              min="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eligibility*
        </label>
        <div className="space-y-2">
          {eligibility.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleEligibilityChange(index, e.target.value)
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eligibility requirement"
                required
              />
              {eligibility.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEligibility(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEligibility}
            className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add Eligibility
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timeline*
        </label>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Event name"
                  value={item.event}
                  onChange={(e) =>
                    handleTimelineChange(index, "event", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={item.date}
                  onChange={(e) =>
                    handleTimelineChange(index, "date", e.target.value)
                  }
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {timeline.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeTimelineEvent(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTimelineEvent}
            className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add Timeline Event
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faLink} className="text-gray-400" />
          </div>
          <input
            type="url"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://"
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email*
        </label>
        <input
          type="email"
          name="contactEmail"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rules & Guidelines*
        </label>
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={rule}
                onChange={(e) => handleRuleChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a rule"
                required
              />
              {rules.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRule(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addRule}
            className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hack2;