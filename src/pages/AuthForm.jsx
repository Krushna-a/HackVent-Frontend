import React, { useState, useEffect, useRef,useContext } from "react";
import axios from "axios";
import { HackContext } from "../../context/HackContext";
const AuthForm = () => {
  const { notify } = useContext(HackContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const [activeField, setActiveField] = useState(null);
  const formRef = useRef();

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveField(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setActiveField(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginCredentials = { username, password };
    const registerationCredentials = { username, email, password };
    if (isLogin) {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        loginCredentials,
        { withCredentials: true }
      );
      notify(response.data.message)
      localStorage.setItem("user-id", response.data.user.id);
    } else {
      const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/user/register`,
        registerationCredentials,
        { withCredentials: true }
      );
      notify(response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-md py-8 sm:py-10 px-6 sm:px-8 shadow-md rounded-lg border border-gray-100 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {isLogin ? "Log In" : "Register"}
        </h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-6"
        >
          {/* Username Field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className={`transition-all duration-200 ${
                activeField === "username"
                  ? "text-sm text-gray-600 -translate-y-2"
                  : "text-base sm:text-lg text-gray-800"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => handleFocus("username")}
              placeholder="Enter Username"
              className="border-b-2 outline-none border-gray-400 p-2 text-md focus:border-blue-600 transition-colors duration-200"
              required
            />
          </div>

          {/* Email Field */}
          {!isLogin ? (
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className={`transition-all duration-200 ${
                  activeField === "email"
                    ? "text-sm text-gray-600 -translate-y-2"
                    : "text-base sm:text-lg text-gray-800"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus("email")}
                placeholder="Enter email"
                className="border-b-2 outline-none border-gray-400 p-2 text-md focus:border-blue-600 transition-colors duration-200"
                required
              />
            </div>
          ) : (
            <div></div>
          )}

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className={`transition-all duration-200 ${
                activeField === "password"
                  ? "text-sm text-gray-600 -translate-y-2"
                  : "text-base sm:text-lg text-gray-800"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
              placeholder="Enter password"
              className="border-b-2 outline-none border-gray-400 p-2 text-md focus:border-blue-600 transition-colors duration-200"
              required
              minLength="6"
            />
          </div>

          <button
            onClick={(e) => handleSubmit(e)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            {isLogin ? "Log In" : "Register"}
          </button>
        </form>

        <div className="text-center text-sm sm:text-base text-gray-600 mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleAuthMode}
            className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
