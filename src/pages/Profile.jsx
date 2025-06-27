import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faGraduationCap,
  faUser,
  faCalendar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProfileForm from "../components/ProfileForm";

import { HackContext } from "../../context/HackContext";
const Profile = () => {
  const { notify } = useContext(HackContext);
  const currentYear = new Date().getFullYear();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const modalRef = useRef(null);

  const [showEditForm, setShowEditForm] = useState(false);
  const userProfile = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      {
        withCredentials: true,
      }
    );

    setUserData(data.data.profile);
  };
  // yaha par handle submit me profile pic update ka function likhna h
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let profileData = {};
      if (profileImage) {
        profileData = {
          profileImage,
        };
      } else {
        profileData = {
          fullName,
          location,
          course,
          college,
          graduatingYear,
          courseDuration,
          gender,
          profileImage,
        };
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        profileData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notify(response.data.message || "Profile updated successfully");
      setIsOpen(false);
      userProfile();
    } catch (error) {
      console.error("Upload error:", error);
      notify(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    userProfile();
  }, [handleSubmit]);

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };
  return (
    <div className="w-full flex items-center my-5 md:my-10 flex-col gap-5 px-4 sm:px-0 pt-24">
      {/* Modal Backdrop */}
      {loading && (
        <div className="h-[130vh] w-full absolute top-0 backdrop-blur bg-white/30 transparent flex justify-center items-center z-30">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-l-transparent border-b-blue-500 border-r-blue-500 animate-spin"></div>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Upload File
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="block cursor-pointer">
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-blue-600">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    {profileImage && (
                      <p className="mt-2 text-sm text-gray-900">
                        Selected: {profileImage.name}
                      </p>
                    )}
                  </label>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!profileImage}
                    className={`px-4 py-2 text-white rounded-lg ${
                      profileImage
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-400 cursor-not-allowed"
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Profile Card */}
      <div className="relative group w-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl transform -rotate-1 group-hover:rotate-0 transition duration-300 z-1"></div>
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-8 flex flex-col items-center md:items-start">
              <div className="relative">
                <img
                  src={`${
                    userData.profileImage
                      ? userData.profileImage
                      : "/Default_pfp.jpg"
                  }`}
                  alt="Profile"
                  className="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                </div>
              </div>
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                onClick={() => setIsOpen(true)}
              >
                Change Photo
              </button>
            </div>
            <div className="p-6 md:p-8 flex-1">
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {userData.fullName}
                  </h2>
                  <p className="text-blue-600 font-medium">
                    {{
                      1: "1st",
                      2: "2nd",
                      3: "3rd",
                      4: "Final",
                    }[userData.graduatingYear - currentYear] || "-"}{" "}
                    Year Student
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <FontAwesomeIcon
                        icon={faBuildingColumns}
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-medium">{userData.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-medium">{userData.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                      <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Graduation Year</p>
                      <p className="font-medium">{userData.graduatingYear}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded-full text-pink-600">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{userData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="w-full max-w-4xl flex flex-row-reverse shadow-lg rounded-lg py-2">
        <button
          className="border bg-blue-700 px-6 py-1 sm:px-10 sm:py-2 m-2 rounded-full text-gray-200 font-bold text-base sm:text-lg hover:scale-105 transition-all ease-in duration-200"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          {showEditForm ? "Hide Edit Profile" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Form */}
      <ProfileForm showEditForm={showEditForm}></ProfileForm>
    </div>
  );
};

export default Profile;
