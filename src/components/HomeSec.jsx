import React, { useState, useEffect } from "react";

const HomeSec = ({ text, video,layout }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing
        setDisplayedText(text.slice(0, index + 1));
        setIndex((prev) => prev + 1);

        if (index + 1 === text.length) {
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setDisplayedText(text.slice(0, index - 1));
        setIndex((prev) => prev - 1);

        if (index === 0) {
          setIsDeleting(false);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index, isDeleting, text]);

  return (
    <div
      className={`w-full p-6 sm:p-10 flex flex-col ${layout} sm:flex-row items-center justify-center`}
    >
      <div className="w-full sm:w-1/2 flex justify-center">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-[500px] h-auto object-cover rounded-xl shadow-md"
        />
      </div>
      {/* Text Section */}
      <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start mt-8 sm:mt-0 px-4 sm:px-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold text-black mb-4">
          {displayedText}
          <span className="animate-blink">|</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          Explore events, join hackathons, and connect with campus!
        </p>
      </div>
    </div>
  );
};

export default HomeSec;
