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
  const {
    appState,
    generateQuestionPapers,
    shareNewMaterial,
    t,
    attemptNewMaterial,
    getOverallIns,
  } = useAppContext();
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
  const [indiCards, setIndiCards] = useState("");

  const [overallIns, setOverallIns] = useState("");
  const [insBundle, setInsBundle] = useState([]);
  const [fetchOI, setFetchingOI] = useState(false);
  const [bulletPoints, setBulletPoints] = useState([]);
  const [para, setPara] = useState("");

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
                {t("Generate Question Paper")}
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
                {t("View Question Paper")}
              </Button>
            </td>
            <td>
              <Button
                size="sm"
                className="text-white bg-blue-500 disabled:bg-blue-500/40"
                disabled={!questionPapers[index].status}
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Feedback & Insights
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

  const attemptLocal = async () => {
    const response = await attemptNewMaterial(
      questionPapers[currentQPView].data,
      "qp"
    );

    console.log("RESPONSE: ", response);

    if (response !== false) {
      toast.success("Successfully sent to student");
    }
  };

  const renderInsightCards = () => {
    let tempArr = [];
    let tempIns = [];
    setIndiCards(tempArr);
    appState.insights.map((item, index) => {
      let card = (
        <div className="p-4 bg-white rounded-lg">
          <p>
            <span className="font-bold">Name:</span>{" "}
            <span className="font-">{item.name}</span>
          </p>
          <p>
            <span className="font-bold">Insight:</span>{" "}
            <span className="font-">{item["INSIGHTS"]}</span>
          </p>
        </div>
      );
      tempArr.push(card);
      tempIns.push(item["INSIGHTS"]);
      setIndiCards(tempArr);
      setInsBundle(tempIns);
    });
  };

  const localFunc = async () => {
    console.log("calling localfunc");
    try {
      setFetchingOI(true);
      let stng = JSON.stringify(insBundle);
      const result = await getOverallIns(stng);
      if (result !== false) {
        console.log("ov res", result);
        extractAndFormatText(result);
        setOverallIns(result);
        setFetchingOI(false);
      }
    } catch (error) {
      console.log("eer", error);
      setFetchingOI(false);
    }
  };

  function extractAndFormatText(text) {
    // Extracting the paragraph and key insights from the text
    const keyInsightsIndex = text.indexOf("Key Insights:");
    const paragraph = text.substring(0, keyInsightsIndex).trim();
    const keyInsightsText = text.substring(keyInsightsIndex).trim();

    // Splitting and formatting the key insights as bullet points
    const bulletPoints = keyInsightsText
      .split(" - ")
      .slice(1)
      .map((point) => point.trim());

    setBulletPoints(bulletPoints);
    setPara(paragraph);
  }

  useEffect(() => {
    renderStudentCards();
  }, [studentsData, questionPapers]);

  useEffect(() => {
    console.log("APP INS: ", appState.insights);
    if (appState.insights.length > 0) {
      renderInsightCards();
    }
  }, [appState.insights]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      {/* title */}
      <div className="">
        <p className="my-4 text-xl font-bold">
          {t("Teacher's Content Creation Platform")}
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
              {t("Create Custom Question Papers")}
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
                <th>{t("Name")}</th>
                <th>{t("Class")}</th>
                <th>{t("Student ID")}</th>
                <th>{t("DOB")}</th>
                <th>{t("Gender")}</th>
                <th>{t("Age")}</th>
                <th>
                  <p className="font-bold">CARS {t("Score")}</p>
                </th>
                <th>SBT ID</th>
                <th>{t("Generate")}</th>
                <th>{t("View")}</th>
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
            <p className="font-bold text-black text-md">
              {t("Create Study Materials")}
            </p>
          </div>
        </div>
      </div>

      {/* study materials chapters grid */}
      <div className="grid w-full grid-cols-4 grid-rows-2 my-6 gap-x-8 gap-y-8">
        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">
              {t("Components of Food")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col w-full gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-2 mt-6 gap-y-2">
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 4.0 CARS`}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`< 7.0 CARS`}
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </Button>
            <Button
              size="sm"
              className="flex flex-row items-center w-full text-black bg-white gap-x-4"
            >
              <span>{t("Create Material for")}</span>
              {`> 7.0 CARS`}
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
            <p className="font-bold text-black text-md">
              {t("Create Custom Worksheets")}
            </p>
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
              <Input
                className=""
                label={t("Worksheet Title")}
                size="sm"
              ></Input>
            </div>

            {/* difficulty level dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="py-6 text-white bg-black"
                  size=""
                >
                  {difficultyLevel === "" ? (
                    <span>{t("Choose Difficulty Level")}</span>
                  ) : (
                    difficultyLevel
                  )}
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
                  {chapter === "" ? (
                    <span>{t("Choose Chapter")}</span>
                  ) : (
                    chapter
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setChapter("Chapter - 1: Components of Food");
                  }}
                >
                  {t("Chapter")} - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  {t("Chapter")} - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  {t("Chapter")} - 1: Components of Food
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* container two */}
          <div className="flex flex-row items-center gap-x-4">
            <Button className="w-40 h-full py-4 text-white bg-blue-500">
              {t("Create")}
            </Button>
            <Button
              className="w-40 h-full py-4 text-white bg-blue-500 disabled:bg-blue-500/50"
              disabled={true}
            >
              {t("Share")}
            </Button>
          </div>
        </div>

        {/* worksheet item two */}
        <div className="flex flex-row items-center justify-between w-full p-4 rounded-lg bg-black/20 gap-x-4">
          {/* container one */}
          <div className="flex flex-row items-center gap-x-4">
            <div className="w-60">
              <Input
                className=""
                label={t("Worksheet Title")}
                size="sm"
              ></Input>
            </div>

            {/* difficulty level dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="py-6 text-white bg-black"
                  size=""
                >
                  {difficultyLevel === "" ? (
                    <span>{t("Choose Difficulty Level")}</span>
                  ) : (
                    difficultyLevel
                  )}
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
                  {chapter === "" ? (
                    <span>{t("Choose Chapter")}</span>
                  ) : (
                    chapter
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setChapter("Chapter - 1: Components of Food");
                  }}
                >
                  {t("Chapter")} - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  {t("Chapter")} - 1: Components of Food
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    "Chapter - 1: Components of Food";
                  }}
                >
                  {t("Chapter")} - 1: Components of Food
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* container two */}
          <div className="flex flex-row items-center gap-x-4">
            <Button className="w-40 h-full py-4 text-white bg-blue-500">
              {t("Create")}
            </Button>
            <Button
              className="w-40 h-full py-4 text-white bg-blue-500 disabled:bg-blue-500/50"
              disabled={true}
            >
              {t("Share")}
            </Button>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{t("Generated Question Paper")}</h3>
          <div className="py-0 my-0 divider"></div>
          {/* modal body */}
          <div className="flex flex-col w-full py-4">
            {questionPapers.length > 0 ? (
              <div>
                {/* short ans */}
                <div>
                  <p className="my-2 font-bold underline">
                    {t("Short Answer Questions:")}
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
                    {t("Long Answer Questions:")}
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
                <div className="flex flex-row items-center gap-x-2">
                  <button
                    className="text-white bg-blue-500 btn"
                    onClick={() => {
                      shareLocal();
                    }}
                  >
                    {t("Share to Public Platform")}
                  </button>
                  <button
                    className="text-white bg-blue-500 btn"
                    onClick={() => {
                      attemptLocal();
                    }}
                  >
                    Ask to Attempt
                  </button>
                </div>
                <button className="btn">{t("Close")}</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* modal 2*/}
      <dialog id="my_modal_2" className="modal">
        <div className="w-11/12 max-w-5xl modal-box">
          <h3 className="text-lg font-bold">AI Feedback and Insight</h3>
          <div className="py-0 my-0 divider"></div>
          <div className="flex flex-col gap-y-6">
            <div>
              <p className="mt-3 font-bold">Attempted Student(s): {indiCards.length || 0}</p>
            </div>
            <div className="flex flex-col p-4 rounded-lg mt- gap-y-2 bg-black/10">
              <div>
                <p className="font-bold text-black">Overall Class Feedback</p>
              </div>
              <p className="italic">
                {overallIns === ""
                  ? "Please fetch overall insight"
                  : // <div className="flex flex-col">
                    //   {para}
                    //   {bulletPoints.map((point, index) => (
                    //     <li key={index}>{point}</li>
                    //   ))}
                    // </div>
                    overallIns}
              </p>
            </div>
            <Button
              className="text-white bg-blue-500"
              isLoading={fetchOI}
              onClick={() => localFunc()}
            >
              Get Overall Insight
            </Button>

            <div className="flex flex-col p-4 rounded-lg gap-y-2 bg-black/10">
              <div>
                <p className="font-bold text-black">Individuals Feedback</p>
              </div>

              {indiCards}
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

export default ContentCreation;
