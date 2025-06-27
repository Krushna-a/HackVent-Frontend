import React, { useEffect, useState } from "react";
import Hacks from "../components/Hacks";
import axios from "axios";

const Hackathons = () => {
  const [allHacks, setAllHacks] = useState([]);
  const getHacks = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/hack/getHackathon`
    );
    setAllHacks(response.data);
  };
  useEffect(() => {
    getHacks();
  }, []);
  return (
    <div className="w-[100vw] min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4 md:px-10 flex flex-col items-center gap-2 pt-28">
      {allHacks.map((hack) => (
        <Hacks hackathon={hack}></Hacks>
      ))}
    </div>
  );
};

export default Hackathons;
