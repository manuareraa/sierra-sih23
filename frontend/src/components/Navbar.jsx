import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import OneNavbar from "./navbars/OneNavbar";
import TwoNavbar from "./navbars/TwoNavbar";
import ThreeNavbar from "./navbars/ThreeNavbar";

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
          <div>
            <p className="text-3xl">Sierra</p>
          </div>
          <div>
            <p className="text-xs">Enhanced Edu Portal</p>
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
              <OneNavbar />
            </>
          ) : mode === 5 ? (
            <>
              {/* teacher's planning and content creation platform */}
              <OneNavbar />
            </>
          ) : mode === 6 ? (
            <>
              {/* teachers resources sharing platform */}
              <OneNavbar />
            </>
          ) : mode === 7 ? (
            <>
              {/* smart iot integration */}
              <OneNavbar />
            </>
          ) : null}
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
                  navigate("/");
                } else if (mode + 1 === 4) {
                  navigate("/mode/four/learning-platform/home");
                } else if (mode + 1 === 5) {
                  navigate("/planning");
                } else if (mode + 1 === 6) {
                  navigate("/resources");
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
