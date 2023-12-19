import React from "react";
import heroImg from "../assets/img/class.jpg";
import { Button } from "@nextui-org/react";

import ukEduIcon from "../assets/img/uke.png";
import uT from "../assets/img/UT.png";

function Homepage(props) {
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
              Government of Uttarakhand
            </p>
            <p className="text-white">(School Education Department)</p>
          </div>
        </div>

        {/* second container */}
        <div className="flex flex-col gap-y- text-white font-extrabold text-[100px] leading-none h-fit text-center mt-8">
          <span>Where Every Student</span>
          {/* <span></span> */}
          <span>Thrives</span>
          <div className="flex flex-row items-center justify-center w-full mt-8 gap-x-16">
            <Button className="text-white bg-blue-500 rounded-full shadow-xl w-72">
              Teacher Login
            </Button>
            <Button className="rounded-full shadow-xl w-72">
              Student Login
            </Button>
          </div>
        </div>
      </div>

      {/* bottom container */}
      <div className="flex flex-row items-center justify-center w-full mt-12 gap-x-16">
        {/* certificate verification */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-white">
            Verify Certificate Credentials from Blockchain
          </p>
          <Button className="text-white bg-blue-500 w-80">
            Verify Certificate
          </Button>
        </div>

        <div className="divider divider-horizontal after:bg-white before:bg-white"></div>

        {/* sbt verification */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-white">
            Use SBTs / EMIS No. to check the authenticity of the individual
          </p>
          <Button className="text-white bg-blue-500 w-80">
            Verify SBTs / EMIS No.
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
