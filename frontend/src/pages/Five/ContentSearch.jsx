import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { Button } from "@nextui-org/react";

function ContentSearch(props) {
  const { getAllMaterials, appState } = useAppContext();
  const [qpToView, setQpToView] = useState({
    type: "",
    data: [],
  });

  const randomQPNames = [
    "Cycle Test II May 2023",
    "Revision Exam Dec 2023",
    "Cycle Test I Apr 2023",
    "Annual Modal Exam Mar 2023",
  ];

  const randomTeacherNames = [
    "Anthony",
    "Srikanth",
    "Aadhirai",
    "Ranjitha",
    "Gowtham",
    "Manu",
  ];

  const randomWorksheetNames = [
    "Worksheet 1",
    "Worksheet 2",
    "Worksheet 3",
    "Worksheet 4",
  ];

  const generateRan = (from, to) => {
    return Math.floor(Math.random() * (to - from + 1) + from);
  };

  useEffect(() => {
    console.log("qpToView", qpToView);
  }, [qpToView]);

  useEffect(() => {
    getAllMaterials();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      {/* title */}
      <div className="">
        <p className="my-4 text-xl font-bold">
          Teacher's Content Sharing Platform
        </p>
      </div>
      <div className="divider"></div>

      {/* custom question papers */}
      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">
              Latest Question Papers
            </p>
          </div>
        </div>
      </div>

      {/* body container */}
      <div className="grid w-full grid-cols-5 py-4">
        {/* single item */}
        {appState.sharedMaterials.map((item, index) => {
          if (item.type === "qp") {
            return (
              <div
                className="flex flex-col justify-between p-4 bg-blue-500 rounded-lg w-72 gap-y-1"
                key={index}
              >
                {/* title div */}
                <div>
                  {/* qp name */}
                  <div className="flex flex-col">
                    <p className="text-xl font-bold text-white">
                      {
                        // generate a random number between 0 and 4
                        randomQPNames[generateRan(0, 3)]
                      }
                    </p>
                  </div>
                </div>

                {/* download button container */}
                <div>
                  <div className="py-0 my-0 divider before:bg-white after:bg-white"></div>
                  {/* class and subject */}
                  <div className="flex flex-row items-center justify-between w-full gap-y-1">
                    <p className="text-sm text-white">
                      <span className="">Class:&nbsp;</span>
                      <span className="font-bold">{generateRan(4, 12)}th</span>
                    </p>
                    <p className="text-sm text-white">
                      <span className="">Subject:&nbsp;</span>{" "}
                      <span className="font-bold">Science</span>
                    </p>
                  </div>
                  <div className="py-0 my-0 divider before:bg-white after:bg-white"></div>
                  {/* author and ins code */}
                  <div>
                    <p className="text-sm text-white">
                      <span className="text-white ">Author:</span>&nbsp;{" "}
                      <span className="font-bold">
                        {randomTeacherNames[generateRan(0, 5)]}
                      </span>
                    </p>
                    <p className="text-sm text-white">
                      <span className="text-white ">Institution Code:</span>
                      &nbsp;{" "}
                      <span className="font-bold">
                        {generateRan(400000, 999999).toString()}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col w-full mt-4 gap-y-2">
                    <Button
                      className="w-full bg-white"
                      onClick={() => {
                        setQpToView(item);
                        document.getElementById("my_modal_1").showModal();
                      }}
                    >
                      Download QP
                    </Button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* custom worksheets */}
      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 mt-6 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">Latest Worksheets</p>
          </div>
        </div>
      </div>

      {/* worksheets body container */}
      <div className="grid w-full grid-cols-5 py-4">
        <div className="flex flex-col justify-between p-4 bg-blue-500 rounded-lg w-72 gap-y-1">
          {/* title div */}
          <div>
            {/* qp name */}
            <div className="flex flex-col">
              <p className="text-xl font-bold text-white">
                {
                  // generate a random number between 0 and 4
                  randomWorksheetNames[generateRan(0, 3)]
                }
              </p>
            </div>
          </div>

          {/* download button container */}
          <div>
            <div className="py-0 my-0 divider before:bg-white after:bg-white"></div>
            {/* class and subject */}
            <div className="flex flex-row items-center justify-between w-full gap-y-1">
              <p className="text-sm text-white">
                <span className="">Class:&nbsp;</span>
                <span className="font-bold">{generateRan(4, 12)}th</span>
              </p>
              <p className="text-sm text-white">
                <span className="">Subject:&nbsp;</span>{" "}
                <span className="font-bold">Science</span>
              </p>
            </div>
            <div className="py-0 my-0 divider before:bg-white after:bg-white"></div>
            {/* author and ins code */}
            <div>
              <p className="text-sm text-white">
                <span className="text-white ">Author:</span>&nbsp;{" "}
                <span className="font-bold">
                  {randomTeacherNames[generateRan(0, 5)]}
                </span>
              </p>
              <p className="text-sm text-white">
                <span className="text-white ">Institution Code:</span>
                &nbsp;{" "}
                <span className="font-bold">
                  {generateRan(400000, 999999).toString()}
                </span>
              </p>
            </div>
            <div className="flex flex-col w-full mt-4 gap-y-2">
              <Button
                className="w-full bg-white"
                onClick={() => {
                  setQpToView(item);
                  document.getElementById("my_modal_1").showModal();
                }}
              >
                Download Worksheet
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Question Paper</h3>
          <div className="flex flex-col w-full py-4">
            <div>
              {/* short ans */}
              <div>
                <p className="my-2 font-bold underline">
                  Short Answer Questions:
                </p>
              </div>
              {qpToView.data.map((item, index) => {
                if (item.type === "small") {
                  return (
                    <p>
                      <span className="font-bold">{parseInt(index) + 1}. </span>
                      {item.text}
                      <br></br>
                    </p>
                  );
                }
              })}

              {/* long ans */}
              <div>
                <p className="pt-4 my-2 font-bold underline">
                  Long Answer Questions:
                </p>
              </div>
              {qpToView.data.map((item, index) => {
                if (item.type === "long") {
                  return (
                    <p>
                      <span className="font-bold">{parseInt(index) + 1}. </span>
                      {item.text}
                      <br></br>
                    </p>
                  );
                }
              })}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ContentSearch;
