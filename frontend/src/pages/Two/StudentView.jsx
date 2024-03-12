import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";

import {
  studentsFive,
  studentsSix,
  studentsSeven,
  studentsEight,
  studentsNine,
  studentsTen,
  studentsEleven,
} from "../../data/students";
import studentIcon from "../../assets/img/studentIcon.svg";

function StudentView(props) {
  const { appState, mode, setMode, t } = useAppContext();
  const navigate = useNavigate();
  const { studentId, selectedClass } = useParams();
  const [student, setStudent] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(
      "Searching for.." +
        "studentId: " +
        studentId +
        "selectedClass: " +
        selectedClass,
      typeof selectedClass
    );

    let classSet = null;

    if (selectedClass === "5") {
      classSet = studentsFive;
    } else if (selectedClass === "6") {
      classSet = studentsSix;
    } else if (selectedClass === "7") {
      classSet = studentsSeven;
    } else if (selectedClass === "8") {
      classSet = studentsEight;
    } else if (selectedClass === "9") {
      classSet = studentsNine;
    } else if (selectedClass === "10") {
      classSet = studentsTen;
    } else if (selectedClass === "11") {
      classSet = studentsEleven;
    }

    classSet.forEach((student, index) => {
      if (student.studentId.toString() === studentId.toString()) {
        setStudent(student);
        setIndex(index);
        return;
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      {/* title */}
      <div className="">
        <p className="my-4 text-xl font-bold">{t("Student Profile")}</p>
      </div>
      <div className="divider"></div>

      <div className="flex flex-row items-center justify-center w-full mt-6 gap-x-16">
        {/* col 1 */}
        <div className="flex flex-row gap-x-8">
          <img src={studentIcon} className="w-40 h-40" />
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {t("Name")}: <span className="font-bold">{student.name}</span>
            (t{"Class"}): <span className="font-bold">{student.class}</span>
            DOB: <span className="font-bold">{student.dob}</span>
            {t("Gender")}: <span className="font-bold">{student.gender}</span>
            {t("Age")}: <span className="font-bold">{student.age}</span>
          </div>
        </div>

        {/* col 2 */}
        <div className="flex flex-row">
          <div className="shadow stats">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">CARS Score</div>
              <div className="stat-value text-primary">{student.carsScore}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

            {/* sbt id */}
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">EMIS ID</div>
              <div className="stat-value text-primary">{index}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* report cards */}
      <div className="flex flex-row gap-x-24">
        {/* cars report card */}
        <div>
          <div className="flex flex-col items-center justify-center w-full my-6">
            <p className="font-bold underline underline-offset-2">
              CARS {t("Score Card")}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="table table- table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th>{t("Subject")}</th>
                  <td>{t("One-to-One")}</td>
                  <td>{t("Online")}</td>
                  <td>{t("Project")}</td>
                  <td>{t("Total")}</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Mathematics</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Science</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Social</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Language I</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Language II</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>Average</td>
                    <th>
                        20.47
                    </th> */}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* marks report card */}
        <div>
          <div className="flex flex-col items-center justify-center w-full my-6">
            <p className="font-bold underline underline-offset-2">
              {t("Marks Score Card")}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="table table- table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th>{t("Subject")}</th>
                  <td>Term I</td>
                  <td>Term II</td>
                  <td>Term III</td>
                  <td>Total</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Mathematics</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Science</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Social</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Language I</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
                <tr>
                  <th>Language II</th>
                  <td>7.21</td>
                  <td>5.46</td>
                  <td>7.8</td>
                  <th>20.47</th>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>Average</td>
                        <th>
                            20.47
                        </th> */}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* monitor student activity */}
      <div className="flex flex-col items-center justify-center w-full my-6">
        <p className="font-bold underline underline-offset-2">
          {t("Your Activity")}
        </p>

        <div className="mt-8">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>{t("Category")}</th>
                  <th>{t("Status")}</th>
                  <th>CARS {t("Score")}</th>
                  <th>{t("Activity")}</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover">
                  <th>1</th>
                  <td>{t("Project-based Learning")}</td>
                  <td>
                    <span className="p-1 px-2 text-sm text-white bg-green-500 rounded-lg">
                      {t("Active")}
                    </span>
                  </td>
                  <td>7.56</td>
                  <td>
                    <Button
                      size="sm"
                      className="text-white bg-blue-500"
                      onPress={() => {
                        navigate(
                          "/mode/two/view-my-profile/" +
                            studentId +
                            "/" +
                            selectedClass +
                            "/project-based-learning"
                        );
                      }}
                    >
                      {t("Submit Project")}
                    </Button>
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="hover">
                  <th>2</th>
                  <td>{t("Online Learning")}</td>
                  <td>
                    <span className="p-1 px-2 text-sm text-white rounded-lg bg-violet-500">
                      {t("Next")}
                    </span>
                  </td>
                  <td>6.79</td>
                  <td>
                    <Button
                      size="sm"
                      className="text-white bg-blue-500"
                      onPress={() => {
                        navigate(
                          "/mode/two/view-my-profile/" +
                            studentId +
                            "/" +
                            selectedClass +
                            "/online-learning"
                        );
                      }}
                    >
                      {t("Go To Portal")}
                    </Button>
                  </td>
                </tr>
                {/* row 3 */}
                <tr className="hover">
                  <th>3</th>
                  <td>1-to-1{t("Learning")}</td>
                  <td>
                    <span className="p-1 px-2 text-sm text-white bg-gray-500 rounded-lg">
                      {t("Upcoming")}
                    </span>
                  </td>
                  <td>9.21</td>
                  <td>
                    <Button
                      size="sm"
                      className="text-white bg-blue-500"
                      onPress={() => {
                        navigate(
                          "/mode/two/view-my-profile/" +
                            studentId +
                            "/" +
                            selectedClass +
                            "/one-to-one-learning"
                        );
                      }}
                    >
                      {t("See Schedule")}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* student history */}
      <div className="flex flex-col items-center justify-center w-full my-6">
        <p className="font-bold underline underline-offset-2">
          {t("Student History")}
        </p>

        <div className="flex flex-row items-start gap-x-16">
          {/* activity history */}
          <div className="mt-8">
            <p className="flex flex-col items-center justify-center font-bold underline underline-offset-2">
              {t("Activity History")}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("Activity")}</th>
                    <th>{t("Timestamp")}</th>
                    <th>{t("Category")}</th>
                    <th>CARS {t("Score")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>{t("Completed")} "Everyday Math"</td>
                    <td>10/10/2021</td>
                    <td>
                      <span className="p-1 px-2 text-sm text-white bg-green-500 rounded-lg">
                        {t("Project")}
                      </span>
                    </td>
                    <td className="font-bold text-red-500">
                      <span className="text-sm">-&nbsp;</span>
                      1.27
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate(
                            "/mode/two/view-my-profile/" +
                              studentId +
                              "/" +
                              selectedClass +
                              "/certificate"
                          );
                        }}
                      >
                        {t("View Certificate")}
                      </Button>
                    </td>
                  </tr>

                  {/* row 2 */}
                  <tr className="hover">
                    <th>2</th>
                    <td>{t("Certification")} for Organic Chemistry Course</td>
                    <td>10/10/2021</td>
                    <td>
                      <span className="p-1 px-2 text-sm text-white rounded-lg bg-violet-500">
                        Online
                      </span>
                    </td>
                    <td className="font-bold text-green-500">
                      <span className="text-sm">+&nbsp;</span>
                      0.85
                    </td>

                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate(
                            "/mode/two/view-my-profile/" +
                              studentId +
                              "/" +
                              selectedClass +
                              "/certificate"
                          );
                        }}
                      >
                        {t("View Certificate")}
                      </Button>
                    </td>
                  </tr>

                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>{t("Completed")} "Intro to Geology" Course</td>
                    <td>10/10/2021</td>
                    <td>
                      <span className="p-1 px-2 text-sm text-white rounded-lg bg-violet-500">
                        Online
                      </span>
                    </td>
                    <td className="font-bold text-green-500">
                      <span className="text-sm">+&nbsp;</span>
                      0.56
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500 "
                        onPress={() => {
                          navigate(
                            "/mode/two/view-my-profile/" +
                              studentId +
                              "/" +
                              selectedClass +
                              "/certificate"
                          );
                        }}
                      >
                        {t("View Certificate")}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* education history */}
          <div className="mt-8">
            <p className="flex flex-col items-center justify-center font-bold underline underline-offset-2">
              {t("Education History")}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("Name")}</th>
                    <th>{t("Qualification")}</th>
                    <th>SID</th>
                    <th>{t("Certificate")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>ABC Primary School</td>
                    <td>1-5</td>
                    <td>{index}</td>
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate(
                            "/mode/two/view-my-profile/" +
                              studentId +
                              "/" +
                              selectedClass +
                              "/certificate"
                          );
                        }}
                      >
                        {t("View")}
                      </Button>
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>2</th>
                    <td>ABC Middle School</td>
                    <td>6-8</td>
                    <td>{index}</td>
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate(
                            "/mode/two/view-my-profile/" +
                              studentId +
                              "/" +
                              selectedClass +
                              "/certificate"
                          );
                        }}
                      >
                        {t("View")}
                      </Button>
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>ABC Higher Secondary School</td>
                    <td>Present</td>
                    <td>{index}</td>
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate(
                            "/mode/two/view-my-profile/" +
                              studentId +
                              "/" +
                              selectedClass +
                              "/certificate"
                          );
                        }}
                      >
                        {t("View")}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentView;
