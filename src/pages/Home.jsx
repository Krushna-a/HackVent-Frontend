import React from "react";
import { useState, useEffect } from "react";
import DragCarousel from "../components/DragCarousel";
import HomeSec from "../components/HomeSec";
import Cards from "../components/Cards";
 
const Home = () => {
  const slides = [
    {
      url: "/hackathon3.png",
      text: "Bridging Students to Opportunities",
    },
    {
      url: "/hackathon.png",
      text: "VENT where Students Meet Opportunities",
    },
    {
      url: "/concert2.png",
      text: "Events and Fun — All Near You",
    },
  ];
  

  return (
    <div className="flex flex-col gap-10">
      <DragCarousel slides={slides}></DragCarousel>
      <HomeSec text={"Bridging Students and Opportunities"} video={"/Web developer team working together.mp4"} layout={"flex-row"}></HomeSec>
      <Cards></Cards>
      <HomeSec text={"From Classrooms to Concerts || Find Your Next Adventure!"} video={"/Rockstar Playing guitar on concert.mp4"} layout={"sm:flex-row-reverse"}></HomeSec>
    </div>
  );
};

export default Home;
