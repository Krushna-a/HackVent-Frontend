import React, { useEffect, useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";

export const HackContext = createContext();

const HackContextProvider = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Online");
  const [customLocation, setCustomLocation] = useState("");
  const [organisedBy, setOrganisedBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [teamSize, setTeamSize] = useState("Individual");
  const [maxTeamSize, setMaxTeamSize] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [prizes, setPrizes] = useState([
    { place: "1st", amount: "", description: "" },
  ]);
  const [timeline, setTimeline] = useState([]);
  const [website, setWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [rules, setRules] = useState([""]);
  const [eligibility, setEligibility] = useState([""]);
  const [userData, setUserData] = useState({});

  const userProfile = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      {
        withCredentials: true,
      }
    );

    setUserData(data.data.profile);
  };

  useEffect(() => {
    userProfile();
  }, []);

  const notify = (msg) => toast(msg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    location,
    setLocation,
    customLocation,
    setCustomLocation,
    organisedBy,
    setOrganisedBy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    registrationDeadline,
    setRegistrationDeadline,
    teamSize,
    setTeamSize,
    maxTeamSize,
    setMaxTeamSize,
    bannerImage,
    setBannerImage,
    bannerPreview,
    setBannerPreview,
    prizes,
    setPrizes,
    timeline,
    setTimeline,
    website,
    setWebsite,
    contactEmail,
    setContactEmail,
    rules,
    setRules,
    eligibility,
    setEligibility,
    handleChange,
    ToastContainer,
    notify,
    userData
  };

  return (
    <HackContext.Provider value={value}>{props.children}</HackContext.Provider>
  );
};

export default HackContextProvider;
