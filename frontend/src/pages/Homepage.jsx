import React from "react";
import heroImg from "../assets/img/class.jpg";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { LANGUAGES } from "../translation/languages";
import { useTranslation } from "react-i18next";

import ukEduIcon from "../assets/img/uke.png";
import uT from "../assets/img/UT.png";

function Homepage(props) {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-4 bg- custom-hero-bg">
      {/* hero container */}
      <div className="flex flex-col items-center w-full my-16 gap-x-48 mx-28 h-fit ">
        {/* first container */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          <img src={uT} className="w-[60px] h-[50px]"></img>
          {/* <p className="font-extrabold text-white text-[150px]">उत्तराखण्ड</p> */}
          {/* <p className="font-extrabold text-white text-[100px]">Uttarakhand</p> */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-white">
              {t("Government of Uttarakhand")}
            </p>
            <p className="text-white">({t("School Education Department")})</p>
          </div>
        </div>

        {/* second container */}
        <div className="flex flex-col gap-y- text-white font-extrabold text-[100px] leading-none h-fit text-center mt-8">
          <span>{t("Where Every Student")}</span>
          <span>{t("Thrives")}</span>
          <div className="flex flex-row items-start justify-center w-full mt-8 gap-x-16">
            <div className="flex flex-col">
              <Button
                className="text-white bg-blue-500 rounded-full shadow-xl w-72"
                onPress={() => {
                  navigate("/mode/two/login");
                }}
              >
                {t("Teacher Login")}
              </Button>
              <p
                className="text-sm font-light underline hover:cursor-pointer"
                onClick={() => {
                  navigate("/mode/one/recruit");
                }}
              >
                Onboard Teachers
              </p>
            </div>
            <Button
              className="rounded-full shadow-xl w-72"
              onPress={() => {
                navigate("/mode/three/login");
              }}
            >
              {t("Student Login")}
            </Button>
          </div>
        </div>
      </div>

      {/* bottom container */}
      <div className="flex flex-row items-center justify-center w-full mt-12 gap-x-8">
        {/* certificate verification */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-white">
            Enables teachers to create contents
          </p>
          <Button
            className="text-white bg-blue-500 w-80"
            onPress={() => {
              navigate("/mode/five/content-platform/create");
            }}
          >
            Content Creation Platform
          </Button>
        </div>

        {/* sbt verification */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-white">
            Enables teachers to share contents
          </p>
          <Button
            className="text-white bg-blue-500 w-80"
            onPress={() => {
              navigate("/mode/five/content-platform/search");
            }}
          >
            Content Sharing Platform
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-white">Learn more from online courses</p>
          <Button
            className="text-white bg-blue-500 w-80"
            onPress={() => {
              navigate("/mode/four/learning-platform/home");
            }}
          >
            Learning Platform
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
