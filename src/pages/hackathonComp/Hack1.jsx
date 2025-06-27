import React, { useContext } from "react";
import { HackContext } from "../../../context/HackContext";
import { faImage, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hack1 = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    location,
    setLocation,
    customLocation,
    setCustomLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    bannerImage,
    setBannerImage,
    bannerPreview,
    setBannerPreview,
    organisedBy,
    setOrganisedBy
  } = useContext(HackContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(file);
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hackathon Title*
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description*
        </label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location*
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="location"
              value="Online"
              checked={location === "Online"}
              onChange={(e) => setLocation(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Online</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="location"
              value="In-Person"
              checked={location === "In-Person"}
              onChange={(e) => setLocation(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">In-Person</span>
          </label>
        </div>
        {location === "In-Person" && (
          <input
            type="text"
            name="customLocation"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            placeholder="Enter location address"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faCalendar} className="text-gray-400" />
            </div>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faCalendar} className="text-gray-400" />
            </div>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between pt-4">
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Image*
          </label>
          <div className="mt-1 flex items-center">
            <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
              <FontAwesomeIcon icon={faImage} className="mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
                required
              />
            </label>
            <span className="ml-4 text-sm text-gray-500">
              {bannerImage ? bannerImage.name : "No file chosen"}
            </span>
          </div>
          {bannerPreview && (
            <div className="mt-4">
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="organisedBy" className="font-semibold text-gray-600">Organised By</label>
          <input type="text" id="organisedBy" onChange={(e)=>setOrganisedBy(e.target.value)}  className="border rounded-lg p-3 border-gray-300 "/>
        </div>
      </div>
    </div>
  );
};

export default Hack1;
