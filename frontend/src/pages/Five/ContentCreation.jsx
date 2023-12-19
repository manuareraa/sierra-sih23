import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { useAppContext } from "../../utils/AppContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import {
  studentsFive,
  studentsSix,
  studentsSeven,
  studentsEight,
  studentsNine,
  studentsTen,
  studentsEleven,
} from "../../data/students";
import toast from "react-hot-toast";

function ContentCreation(props) {
  const { appState, generateQuestionPapers, shareNewMaterial } =
    useAppContext();
  const [studentsData, setStudentsData] = useState([]);
  const [currentQPView, setCurrentQPView] = useState(0);
  const [questionPapers, setQuestionPapers] = useState([
    {
      idNo: 0,
      status: true,
      data: [
        {
          id: 1,
          type: "small",
          text: "\"Define the term 'food' as discussed in the lesson.\"",
        },
        {
          id: 1,
          type: "small",
          text: '"List two ways how food plays a significant role in culture and tradition."',
        },
        {
          id: 1,
          type: "small",
          text: '"What is the staple crop in Northern India and how does it influence the typical cuisine of the region?"',
        },
        {
          id: 2,
          type: "medium",
          text: '"Discuss the dietary staples of the Northeastern region\'s culinary tradition and how they contribute to its unique flavour profile."',
        },
        {
          id: 2,
          type: "medium",
          text: '"Explain what nutrients are and why they are essential to life and health."',
        },
        {
          id: 4,
          type: "long",
          text: '"Describe the variety in Indian cuisines as influenced by geographical, cultural and climatic differences. Include specific examples of dishes and their unique ingredients to support your answer."',
        },
      ],
    },
    {
      idNo: 1,
      status: false,
      data: null,
    },
    {
      idNo: 2,
      status: false,
      data: null,
    },
    {
      idNo: 3,
      status: false,
      data: null,
    },
    {
      idNo: 4,
      status: false,
      data: null,
    },
  ]);
  const [studentCards, setStudentCards] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [chapter, setChapter] = useState("");

  const renderStudentCards = async () => {
    let tempArr = [];
    setStudentCards([]);
    try {
      studentsData.map((student, index) => {
        let card = (
          <tr key={index} className="hover">
            <th>{index + 1}</th>
            <td>{student.name}</td>
            <td>{student.class}</td>
            <td>{student.studentId}</td>
            <td>{student.dob}</td>
            <td>{student.gender}</td>
            <td>{student.age}</td>
            <td className="font-bold">
              {student.carsScore < 5 ? (
                <span className="p-2 text-white bg-red-500 rounded-xl">
                  {student.carsScore}
                </span>
              ) : student.carsScore < 8 ? (
                <span className="p-2 text-white bg-yellow-500 rounded-xl">
                  {student.carsScore}
                </span>
              ) : (
                <span className="p-2 text-white bg-green-500 rounded-xl ">
                  {student.carsScore}
                </span>
              )}
            </td>
            <td>{index}</td>
            <td>
              <Button
                size="sm"
                className="text-white bg-blue-500"
                onPress={async () => {
                  const response = await generateQuestionPapers(
                    student.carsScore.toString()
                  );
                  console.log("APCXT", response);
                  if (response !== false) {
                    let tempArr = questionPapers;
                    tempArr[index].status = true;
                    tempArr[index].data = response;
                    console.log("TEMPARR: ", tempArr);
                    setQuestionPapers(tempArr);
                    renderStudentCards();
                  }
                }}
              >
                Generate Question Paper
              </Button>
            </td>
            <td>
              <Button
                size="sm"
                className="text-white bg-blue-500 disabled:bg-blue-500/40"
                disabled={!questionPapers[index].status}
                onClick={() => {
                  setCurrentQPView(index);
                  document.getElementById("my_modal_1").showModal();
                }}
              >
                View Question Paper
              </Button>
            </td>
          </tr>
        );
        tempArr.push(card);
        setStudentCards(tempArr);
      });
    } catch (error) {
      console.log("Error occured while rendering student cards", error);
    }
  };

  useEffect(() => {
    let tempArr = studentsNine.slice(0, 5);
    setStudentsData(tempArr);
  }, []);

  const shareLocal = async () => {
    const response = await shareNewMaterial(
      questionPapers[currentQPView].data,
      "qp"
    );

    console.log("RESPONSE: ", response);

    if (response !== false) {
      toast.success("Successfully shared to public platform");
    }
  };

  useEffect(() => {
    renderStudentCards();
  }, [studentsData, questionPapers]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      {/* title */}
      <div className="">
        <p className="my-4 text-xl font-bold">
          Teacher's Content Creation Platform
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
              Create Custom Question Papers
            </p>
          </div>
        </div>
      </div>

      {/* body container - custom question papers */}
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Class</th>
                <th>Student ID</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Age</th>
                <th>
                  <p className="font-bold">CARS Score</p>
                </th>
                <th>SBT ID</th>
                <th>Generate</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{studentCards}</tbody>
          </table>
        </div>
      </div>

      {/* create study materials */}
      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 mt-8 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">Study Materials</p>
          </div>
        </div>
      </div>

      {/* study materials chapters grid */}
      <div className="grid w-full grid-cols-4 grid-rows-2 my-6 gap-x-8 gap-y-8">
        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for < 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              {`Create Material for > 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>
      </div>

      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 mt-8 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">Create Worksheets</p>
          </div>
        </div>
      </div>

      {/* worksheets body container */}
      <div className="flex flex-col w-full mt-6 gap-y-4">
        {/* worksheet item */}
        <div className="flex flex-row items-center justify-between w-full p-4 rounded-lg bg-black/20 gap-x-4">
          {/* container one */}
          <div className="flex flex-row items-center gap-x-4">
            <div className="w-60">
              <Input className="" label="Worksheet Title" size="sm"></Input>
            </div>

            {/* difficulty level dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="py-6 text-white bg-black"
                  size=""
                >
                  {difficultyLevel === ""
                    ? "Choose Difficulty Level"
                    : difficultyLevel}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setDifficultyLevel("CARS Score < 4.0");
                  }}
                >{`CARS Score < 4.0`}</DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    setDifficultyLevel("CARS Score < 7.0");
                  }}
                >{`CARS Score < 7.0`}</DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    setDifficultyLevel("CARS Score > 7.0");
                  }}
                >{`CARS Score > 7.0`}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* chapter choice dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="py-6 text-white bg-black"
                  size=""
                >
                  {chapter === "" ? "Choose Chapter" : chapter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setChapter("Chapter - 1: Components of Food");
                  }}
                >
                  Chapter - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  Chapter - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  Chapter - 1: Components of Food
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* container two */}
          <div className="flex flex-row items-center gap-x-4">
            <Button className="w-40 h-full py-4 text-white bg-blue-500">
              Create
            </Button>
            <Button
              className="w-40 h-full py-4 text-white bg-blue-500 disabled:bg-blue-500/50"
              disabled={true}
            >
              Share
            </Button>
          </div>
        </div>

        {/* worksheet item two */}
        <div className="flex flex-row items-center justify-between w-full p-4 rounded-lg bg-black/20 gap-x-4">
          {/* container one */}
          <div className="flex flex-row items-center gap-x-4">
            <div className="w-60">
              <Input className="" label="Worksheet Title" size="sm"></Input>
            </div>

            {/* difficulty level dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="py-6 text-white bg-black"
                  size=""
                >
                  {difficultyLevel === ""
                    ? "Choose Difficulty Level"
                    : difficultyLevel}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setDifficultyLevel("CARS Score < 4.0");
                  }}
                >{`CARS Score < 4.0`}</DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    setDifficultyLevel("CARS Score < 7.0");
                  }}
                >{`CARS Score < 7.0`}</DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    setDifficultyLevel("CARS Score > 7.0");
                  }}
                >{`CARS Score > 7.0`}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* chapter choice dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="py-6 text-white bg-black"
                  size=""
                >
                  {chapter === "" ? "Choose Chapter" : chapter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setChapter("Chapter - 1: Components of Food");
                  }}
                >
                  Chapter - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  Chapter - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  Chapter - 1: Components of Food
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* container two */}
          <div className="flex flex-row items-center gap-x-4">
            <Button className="w-40 h-full py-4 text-white bg-blue-500">
              Create
            </Button>
            <Button
              className="w-40 h-full py-4 text-white bg-blue-500 disabled:bg-blue-500/50"
              disabled={true}
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Generated Question Paper</h3>
          <div className="py-0 my-0 divider"></div>
          {/* modal body */}
          <div className="flex flex-col w-full py-4">
            {questionPapers.length > 0 ? (
              <div>
                {/* short ans */}
                <div>
                  <p className="my-2 font-bold underline">
                    Short Answer Questions:
                  </p>
                </div>
                {questionPapers[currentQPView].data.map((item, index) => {
                  if (item.type === "small") {
                    return (
                      <p>
                        <span className="font-bold">
                          {parseInt(index) + 1}.{" "}
                        </span>
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
                {questionPapers[currentQPView].data.map((item, index) => {
                  if (item.type === "long") {
                    return (
                      <p>
                        <span className="font-bold">
                          {parseInt(index) + 1}.{" "}
                        </span>
                        {item.text}
                        <br></br>
                      </p>
                    );
                  }
                })}
              </div>
            ) : null}
          </div>
          <div className="w-full modal-action">
            <form method="dialog" className="w-full">
              <div className="flex flex-row items-center justify-between">
                <button
                  className="text-white bg-blue-500 btn"
                  onClick={() => {
                    shareLocal();
                  }}
                >
                  Share to Public Platform
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ContentCreation;
