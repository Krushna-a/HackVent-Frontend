import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HackContext } from "../../context/HackContext";

const ProfileForm = ({ showEditForm = true }) => {
  const navigate = useNavigate();
  const { notify } = useContext(HackContext);
  const [userData, setUserData] = useState({});
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");
  const [college, setCollege] = useState("");
  const [graduatingYear, setGraduatingYear] = useState("");
  const [courseDuration, setCourseDuration] = useState(Number("3"));
  const [gender, setGender] = useState("male");
  const { hackId } = useParams();

  const userProfile = async () => {
    const data = await axios.get("http://localhost:3000/api/user/profile", {
      withCredentials: true,
    });

    setUserData(data.data.profile);
    setFullName(data.data.profile.fullName);
    setLocation(data.data.profile.location);
    setCourse(data.data.profile.course);
    setCollege(data.data.profile.college);
    setGraduatingYear(data.data.profile.graduatingYear);
    setCourseDuration(Number(data.data.profile.courseDuration));
    setGender(data.data.profile.gender);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hackRes = null;
    if (hackId) {
      hackRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/hack/register`,
        { hackId },
        {
          withCredentials: true,
        }
      );

      navigate(`/hackathons/${hackId}`);
    }
    const profileData = {
      fullName,
      location,
      course,
      college,
      graduatingYear,
      courseDuration,
      gender,
    };

    const profileRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      profileData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // notify(`${hackRes.data.message || ""} ${profileRes.data.message || ""}`);
  };

  useEffect(() => {
    userProfile();
  }, []);
  return (
    <div className="w-full flex justify-center my-5 ">
      <form
        onSubmit={handleSubmit}
        className={`${
          showEditForm ? "block" : "hidden"
        } border bg-gray-100 w-full max-w-4xl flex flex-col gap-5 sm:gap-10 py-5 px-4 sm:px-10 md:px-20 shadow-lg rounded-lg`}
      >
        <div className="w-full flex justify-center py-2">
          <div className="text-xl sm:text-2xl font-bold underline text-blue-900">
            {hackId ? "User Details" : "My Profile"}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm sm:text-base">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="fullName"
            value={fullName || ""}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            placeholder="Enter full name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="course" className="text-sm sm:text-base">
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            placeholder="Enter course"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="college" className="text-sm sm:text-base">
            College/University
          </label>
          <input
            type="text"
            id="college"
            name="college"
            value={college || ""}
            onChange={(e) => setCollege(e.target.value)}
            className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            placeholder="Enter college name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="year" className="text-sm sm:text-base">
            Graduating Year
          </label>
          <input
            type="Number"
            id="year"
            name="graduatingYear"
            value={graduatingYear}
            onChange={(e) => setGraduatingYear(e.target.value)}
            className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            placeholder="example: 2028"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-20">
          <div className="w-full sm:w-1/2 flex flex-col gap-1">
            <label htmlFor="duration" className="text-sm sm:text-base">
              Course Duration
            </label>
            <select
              name="courseDuration"
              id="duration"
              value={courseDuration}
              onChange={(e) => setCourseDuration(Number(e.target.value))}
              className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            >
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-1">
            <label htmlFor="gender" className="text-sm sm:text-base">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm sm:text-base">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 text-sm sm:text-base rounded-md outline-none border-l-[5px] border-blue-500"
            placeholder="Enter location"
          />
        </div>
        <div className="flex gap-2 items-start px-2 bg-gray-200 rounded-sm text-gray-700 py-4">
          <input type="checkbox" name="" id="terms" className="mt-2" required />
          <label htmlFor="terms">
            By registering to this hakathon, you agree to share data mentioned
            in this form with the organizer of this hackathon and to the VENT
          </label>
        </div>

        <div className="w-full flex flex-row-reverse">
          <button className="border bg-blue-700 px-6 py-1 sm:px-10 sm:py-2 m-2 rounded-full text-gray-200 font-bold text-base sm:text-lg hover:scale-105 transition-all ease-in duration-200">
            {hackId ? "Next" : "Add Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
