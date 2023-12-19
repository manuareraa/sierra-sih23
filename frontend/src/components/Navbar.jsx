import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import OneNavbar from "./navbars/OneNavbar";
import TwoNavbar from "./navbars/TwoNavbar";
import ThreeNavbar from "./navbars/ThreeNavbar";
import FourNavbar from "./navbars/FourNavbar";
import FiveNavbar from "./navbars/FiveNavbar";
import SixNavbar from "./navbars/SixNavbar";
import ZeroNavbar from "./navbars/ZeroNavbar";

import sierraIcon from "../assets/img/Shc.png";

function Navbar(props) {
  const navigate = useNavigate();
  const { appState, mode, setMode } = useAppContext();
  return (
    <>
      <div className="flex flex-row items-center justify-between p-6 shadow-lg gap-x-8 hover:cursor-pointer">
        {/* logo container */}
        <div
          className="flex flex-col "
          onClick={() => {
            setMode(0);
            navigate("/");
          }}
        >
          <div className="flex flex-row items-center gap-x-4">
            {/* <img src={sierraIcon} className="w-12 h-16"></img> */}
            <div>
              <p className="text-6xl font-extrabold">Sierra</p>
            </div>
          </div>

          <div>
            <p className="text-sm">Enhanced Education Portal</p>
          </div>
        </div>

        {/* menu container */}
        <div className="flex flex-row items-center gap-x-4">
          {mode === 1 ? (
            <>
              {/* government authority portal */}
              <OneNavbar />
            </>
          ) : mode === 2 ? (
            <>
              {/* teacher's profile */}
              <TwoNavbar />
            </>
          ) : mode === 3 ? (
            <>
              {/* student's profile */}
              <ThreeNavbar />
            </>
          ) : mode === 4 ? (
            <>
              {/* enhanced learning platform */}
              <FourNavbar />
            </>
          ) : mode === 5 ? (
            <>
              {/* teacher's planning and content creation platform */}
              <FiveNavbar />
            </>
          ) : mode === 6 ? (
            <>
              {/* teachers resources sharing platform */}
              <SixNavbar />
            </>
          ) : mode === 7 ? (
            <>
              {/* smart iot integration */}
              <OneNavbar />
            </>
          ) : (
            <ZeroNavbar />
          )}
          <Button
            className="text-white bg-black"
            onPress={() => {
              if (mode === 7) {
                setMode(1);
                navigate("/mode/one/recruit");
              } else {
                setMode(mode + 1);
                if (mode + 1 === 2) {
                  navigate("/mode/two/login");
                } else if (mode + 1 === 3) {
                  navigate("/mode/three/student/view/9/55176147");
                } else if (mode + 1 === 4) {
                  navigate("/mode/four/learning-platform/home");
                } else if (mode + 1 === 5) {
                  navigate("/mode/five/content-platform/create");
                } else if (mode + 1 === 6) {
                  navigate("/mode/five/content-platform/search");
                } else if (mode + 1 === 7) {
                  navigate("/iot");
                } else if (mode + 1 === 1) {
                  navigate("/mode/one/recruit");
                }
              }
            }}
          >
            Switch Mode ({mode})
          </Button>
        </div>
      </div>

      {mode === 1 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">Government Authority Portal</p>
        </div>
      ) : mode === 2 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">Teacher's Profile</p>
        </div>
      ) : mode === 3 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">Student's Profile</p>
        </div>
      ) : mode === 4 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">Enhanced Learning Platform</p>
        </div>
      ) : mode === 5 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">
            Teacher's Planning and Content Creation Platform
          </p>
        </div>
      ) : mode === 6 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">
            Teachers Resources Sharing Platform
          </p>
        </div>
      ) : mode === 7 ? (
        <div className="flex flex-col items-center justify-center w-full py-1 bg-black">
          <p className="text-sm text-white">Smart IoT Integration</p>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
