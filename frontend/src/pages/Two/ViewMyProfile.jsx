import React, { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

import tProfileIcon from "../../assets/img/teacher.png";
import schools from "../../data/schools";
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

function ViewMyProfile(props) {
  const navigate = useNavigate();
  const { appState, mode, setMode, t } = useAppContext();
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState({});
  const [school, setSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState(0);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (selectedClass === 5) {
      setStudents(studentsFive);
    } else if (selectedClass === 6) {
      setStudents(studentsSix);
    } else if (selectedClass === 7) {
      setStudents(studentsSeven);
    } else if (selectedClass === 8) {
      setStudents(studentsEight);
    } else if (selectedClass === 9) {
      setStudents(studentsNine);
    } else if (selectedClass === 10) {
      setStudents(studentsTen);
    } else if (selectedClass === 11) {
      setStudents(studentsEleven);
    }
  }, [selectedClass]);

  useEffect(() => {
    console.log("Teachers Pg:: ", appState.teachers);
    appState.teachers.map((t) => {
      if (t.tokenId === parseInt(teacherId)) {
        setTeacher(t);
        const random = Math.floor(Math.random() * 29);
        setSchool(schools[random]);
      }
    });

    console.log("Teacher: ", teacher);
  }, [appState.teachers]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      {/* title */}
      <div className="">
        <p className="my-4 text-xl font-bold">{t("Your Profile")}</p>
      </div>
      <div className="divider"></div>

      {/* body */}
      <div className="flex flex-col items-center justify-center w-full px-60">
        {/* top container */}
        <div className="flex flex-row items-center justify-center w-full mt-6 gap-x-16">
          {/* col 1 */}
          <div className="flex flex-row gap-x-8">
            <img src={tProfileIcon} className="w-40 h-40" />
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-fit">
              {t("Name")}: <span className="font-bold">{teacher.name}</span>
              {t("Department")}:{" "}
              <span className="font-bold">{teacher.department}</span>
              DOB: <span className="font-bold">{teacher.dob}</span>
              {t("Experience")}:{" "}
              <span className="font-bold">
                {teacher.yearsOfExperience} Years
              </span>
              {t("Institution")}: <span className="font-bold">{school}</span>
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
                <div className="stat-title">{t("Current Reputation")}</div>
                <div className="stat-value text-primary">
                  {teacher.reputation}
                </div>
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
                <div className="stat-title">SBT ID</div>
                <div className="stat-value text-primary">{teacher.tokenId}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="divider"></div>

        {/* skillset and class parent container */}
        <div className="flex flex-row items-center justify-center gap-x-12">
          {/* skillset container */}
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-xl font-bold">{t("Your Skillset")}</p>
            </div>

            {/* skillset */}
            <div className="flex">
              <div className="shadow stats">
                {/* one-to-one */}
                <div className="stat">
                  <div className="stat-figure text-primary">{/* svg */}</div>
                  <div className="stat-title">{t("One-to-One")}</div>
                  <div className="stat-value text-primary">
                    {teacher.reputation}
                  </div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>

                {/* project-based */}
                <div className="stat">
                  <div className="stat-figure text-primary">{/* svg */}</div>
                  <div className="stat-title">{t("Project Based")}</div>
                  <div className="stat-value text-primary">
                    {teacher.reputation}
                  </div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>

                {/* online */}
                <div className="stat">
                  <div className="stat-figure text-primary">{/* svg */}</div>
                  <div className="stat-title">{t("Online")}</div>
                  <div className="stat-value text-primary">
                    {teacher.tokenId}
                  </div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 divider"></div>

          {/* class container */}
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-xl font-bold">{t("Manage Your Classes")}</p>
            </div>

            {/* classes */}
            <div className="flex flex-row gap-x-4">
              <div className="shadow stats">
                {/* one */}
                <div
                  className="w-36 stat hover:cursor-pointer"
                  onClick={() => {
                    setSelectedClass(9);
                  }}
                >
                  <div className="stat-title">{t("Class")}</div>
                  <div className="stat-value">9th</div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>

                {/* two */}
                <div
                  className="w-36 stat hover:cursor-pointer"
                  onClick={() => {
                    setSelectedClass(10);
                  }}
                >
                  <div className="stat-title">{t("Class")}</div>
                  <div className="stat-value">10th</div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>

                {/* three */}
                <div
                  className="w-36 stat hover:cursor-pointer"
                  onClick={() => {
                    setSelectedClass(6);
                  }}
                >
                  <div className="stat-title">{t("Class")}</div>
                  <div className="stat-value">6th</div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-6 divider"></div>

        {/* upcoming sessions */}
        <div className="flex flex-row items-center justify-center gap-x-12">
          {/* outer container */}
          <div>
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-xl font-bold">Your Upcoming Sessions</p>
            </div>

            <div className="flex flex-col gap-y-4">
              {/* couple-1 */}
              <div className="flex flex-row items-center gap-x-8">
                {/* invitation one */}
                <div>
                  <div className="flex flex-col p-4 bg-blue-500 rounded-xl w-[350px] gap-y-4">
                    <div className="flex flex-row justify-between gap-x-8">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold text-white">11:00 AM</p>
                        <p className="text-sm text-white font-">
                          Tuesday 25th Dec
                        </p>
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-xl font-bold text-white">Shashank</p>
                        <p className="text-sm text-white font-">Student Name</p>
                      </div>
                    </div>
                    {/* button container */}
                    <div className="flex flex-row justify-between w-full">
                      <Button size="sm" className="bg-white">
                        Join
                      </Button>
                      <Button size="sm" className="text-white bg-red-500/70">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>

                {/* invitation two */}
                <div>
                  <div className="flex flex-col p-4 bg-blue-500 rounded-xl w-[350px] gap-y-4">
                    <div className="flex flex-row justify-between gap-x-8">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold text-white">02:00 PM</p>
                        <p className="text-sm text-white font-">
                          Tuesday 25th Dec
                        </p>
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-xl font-bold text-right text-white">
                          Ishan
                        </p>
                        <p className="text-sm text-right text-white font-">
                          Student Name
                        </p>
                      </div>
                    </div>
                    {/* button container */}
                    <div className="flex flex-row justify-between w-full">
                      <Button size="sm" className="bg-white">
                        Join
                      </Button>
                      <Button size="sm" className="text-white bg-red-500/70">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* couple-2 */}
              <div className="flex flex-row items-center gap-x-8">
                {/* invitation one */}
                <div>
                  <div className="flex flex-col p-4 bg-blue-500 rounded-xl w-[350px] gap-y-4">
                    <div className="flex flex-row justify-between gap-x-8">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold text-white">10:45 AM</p>
                        <p className="text-sm text-white font-">
                          Wednesday 26th Dec
                        </p>
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-xl font-bold text-white">
                          Kapil Sharma
                        </p>
                        <p className="text-sm text-right text-white font-">
                          Student Name
                        </p>
                      </div>
                    </div>
                    {/* button container */}
                    <div className="flex flex-row justify-between w-full">
                      <Button size="sm" className="bg-white">
                        Join
                      </Button>
                      <Button size="sm" className="text-white bg-red-500/70">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>

                {/* invitation two */}
                <div>
                  <div className="flex flex-col p-4 bg-blue-500 rounded-xl w-[350px] gap-y-4">
                    <div className="flex flex-row justify-between gap-x-8">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold text-white">03:30 PM</p>
                        <p className="text-sm text-white font-">
                          Wednesday 26th Dec
                        </p>
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-xl font-bold text-right text-white">
                          Rahul Kumar
                        </p>
                        <p className="text-sm text-right text-white font-">
                          Student Name
                        </p>
                      </div>
                    </div>
                    {/* button container */}
                    <div className="flex flex-row justify-between w-full">
                      <Button size="sm" className="bg-white">
                        Join
                      </Button>
                      <Button size="sm" className="text-white bg-red-500/70">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-6 divider"></div>
        {/* view class container */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-xl font-bold">{t("View Your Class")}</p>
          </div>

          {/* class stats container */}
          <div className="mb-8">
            {selectedClass === 0 ? (
              <div className="flex flex-col items-center justify-center gap-y-4">
                <p className="font- text-md">{t("No Class Selected")}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div></div>

                {/* stats */}
                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">{t("Class")}</div>
                    <div className="stat-value">
                      {selectedClass === 0 ? "None" : selectedClass}th
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">{t("Strength")}</div>
                    <div className="stat-value">
                      {selectedClass === 0 ? "None" : students.length}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Avg. CARS {t("Score")}</div>
                    <div className="stat-value">
                      {selectedClass === 0
                        ? "None"
                        : students.length === 0
                        ? 0
                        : (
                            students.reduce(
                              (a, b) => parseFloat(a) + parseFloat(b.carsScore),
                              0
                            ) / students.length
                          ).toFixed(2)}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">{t("Highest")}</div>
                    <div className="stat-value">
                      {selectedClass === 0
                        ? "None"
                        : students.length === 0
                        ? 0
                        : students.reduce((a, b) =>
                            parseFloat(a.carsScore) > parseFloat(b.carsScore)
                              ? a
                              : b
                          ).carsScore}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">{t("Lowest")}</div>
                    <div className="stat-value">
                      {selectedClass === 0
                        ? "None"
                        : students.length === 0
                        ? 0
                        : students.reduce((a, b) =>
                            parseFloat(a.carsScore) < parseFloat(b.carsScore)
                              ? a
                              : b
                          ).carsScore}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* students */}
          {selectedClass === 0 ? null : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("Name")}</th>
                    <th>{t("Class")}</th>
                    <th>{t("Student")} ID</th>
                    <th>DOB</th>
                    <th>{t("Gender")}</th>
                    <th>{t("Age")}</th>
                    <th>
                      <p className="font-bold">CARS {t("Score")}</p>
                    </th>
                    <th>SBT ID</th>
                    <th>{t("View")}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    return (
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
                            onPress={() => {
                              navigate(
                                "/mode/two/student/view/" +
                                  selectedClass +
                                  "/" +
                                  student.studentId
                              );
                            }}
                          >
                            {t("View Profile")}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* divider */}
        <div className="mt-6 divider"></div>

        {/* student collaboration container */}
        <div className="w-full">
          {/* project based parent container */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-xl font-bold">
                {t("Manage Student Collaboration")}
              </p>
            </div>

            {/* title container */}
            <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
              <div className="flex flex-col gap-y-4">
                {/* title */}
                <div className="items-center justify-start w-full">
                  <p className="font-bold text-black text-md">
                    {t("Project-based Learning")}
                  </p>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="mt-4 overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("Name")}</th>
                    <th>CARS {t("Score")}</th>
                    <th>{t("Project")}</th>
                    <th>{t("Project Status")}</th>
                    {/* <th>EduLog</th> */}
                    <th>{t("Generate & Assign")}</th>
                    <th>{t("Project")}</th>
                    <th>{t("Online")}</th>
                    <th>1-to-1</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Manan Gupta</td>
                    <td>5.67</td>
                    <td>--</td>
                    <td>{t("Not Assigned")}</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/1");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate("/mode/two/student/view/9/1");
                        }}
                      >
                        {t("Generate & Assign")}
                      </Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>2</th>
                    <td>Dhruv Reddy</td>
                    <td>7.88</td>
                    <td>Project ABC</td>
                    <td>In Progress</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/2");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate("/mode/two/student/view/9/2");
                        }}
                      >
                        {t("Re-Generate & Assign")}
                      </Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Disha Mehta</td>
                    <td>8.01</td>
                    <td>--</td>
                    <td>{t("Not Assigned")}</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/3");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button
                        size="sm"
                        className="text-white bg-blue-500"
                        onPress={() => {
                          navigate("/mode/two/student/view/9/3");
                        }}
                      >
                        {t("Generate & Assign")}
                      </Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* online parent container */}
          <div className="flex flex-col w-full mt-12">
            {/* title container */}
            <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
              <div className="flex flex-col gap-y-4">
                {/* title */}
                <div className="items-center justify-start w-full">
                  <p className="font-bold text-black text-md">
                    {t("Online Learning")}
                  </p>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="mt-4 overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("Name")}</th>
                    <th>CARS {t("Score")}</th>
                    <th>{t("Course")}</th>
                    <th>{t("Course Status")}</th>
                    {/* <th>EduLog</th> */}
                    <th>{t("Online")}</th>
                    <th>1-to-1</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Manan Gupta</td>
                    <td>5.67</td>
                    <td>Matrices</td>
                    <td>0%</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/1");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>2</th>
                    <td>Dhruv Reddy</td>
                    <td>7.88</td>
                    <td>Integers and Algebra</td>
                    <td>65%</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/2");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Disha Mehta</td>
                    <td>8.01</td>
                    <td>Trignometry</td>
                    <td>25%</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/3");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 1-to-1 parent container */}
          <div className="flex flex-col w-full mt-12">
            {/* title container */}
            <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
              <div className="flex flex-col gap-y-4">
                {/* title */}
                <div className="items-center justify-start w-full">
                  <p className="font-bold text-black text-md">
                    1-to-1 {t("Learning")}
                  </p>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="mt-4 overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("Name")}</th>
                    <th>CARS {t("Score")}</th>
                    <th>{t("Class")}</th>
                    <th>{t("Periods")}</th>
                    {/* <th>EduLog</th> */}
                    <th>{t("Project")}</th>
                    <th>{t("Online")}</th>
                    <th>1-to-1</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Manan Gupta</td>
                    <td>5.67</td>
                    <td>Trignometry</td>
                    <td>5/10</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/1");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>2</th>
                    <td>Dhruv Reddy</td>
                    <td>7.88</td>
                    <td>Matrices</td>
                    <td>7/9</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/2");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Disha Mehta</td>
                    <td>8.01</td>
                    <td>Calculus</td>
                    <td>1/6</td>
                    {/* <td>
                      <Button
                        size="sm"
                        className="text-white bg-violet-600"
                        onPress={() => {
                          navigate("/mode/two/student/view/edulog/9/3");
                        }}
                      >
                        View EduLog
                      </Button>
                    </td> */}
                    <td>
                      <Button size="sm">{t("To Project")}</Button>
                    </td>
                    <td>
                      <Button size="sm">{t("To Online")}</Button>
                    </td>
                    <td>
                      <Button size="sm">To 1-to-1</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-6 divider"></div>

        {/* title container */}
        <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
          <div className="flex flex-col gap-y-4">
            {/* title */}
            <div className="items-center justify-start w-full">
              <p className="font-bold text-black text-md">
                {t("Available Chapters for Class")} 6
              </p>
            </div>
          </div>
        </div>

        {/* chapters grid */}
        <div className="grid w-full grid-cols-4 grid-rows-2 my-6 gap-x-8 gap-y-8">
          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button
                className="bg-white"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                {t("View")}
              </Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
            <div className="flex flex-col gap-y-">
              <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
              <p className="text-lg font-bold text-white">Components of Food</p>
            </div>
            <div>
              <Button className="bg-white">{t("View")}</Button>
            </div>
          </div>
        </div>

        <div></div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_1" className="modal ">
          <div className="w-11/12 max-w-5xl modal-box">
            <h3 className="text-2xl font-bold">Course Content</h3>
            <div className="divider"></div>
            <div className="flex flex-col gap-y-4">
              <div className="">
                <p className="text-lg font-bold underline">Introduction:</p>
                <p className="">
                  In lower classes, we made lists of the food items that we eat.
                  We also identified food items eaten in different parts of
                  India and marked these on its map. A meal could consist of
                  chapati, dal and brinjal curry. Another may be rice, sambar
                  and a vegetable preparation of lady’s finger (bhindi). Yet
                  another meal could be appam, fish curry and vegetables. curd,
                  butter milk and pickles. Some examples of meals from different
                  regions are given in Table 1.1. Select food items and enter
                  these in Table 1.1. Sometimes, we may not really have all this
                  variety in our meals. If we are travelling, we may eat
                  whatever is available on the way. It may not be possible for
                  some of us, to eat such a variety of items, most of the time.
                  There must be some reason though, why meals usually consist of
                  such a distribution. Do you think that our body needs
                  different kinds of food for some special purpose?
                </p>
              </div>

              <div className="">
                <p className="text-lg font-bold underline">
                  What do different food items containe?
                </p>
                <p>
                  We know that each dish is usually made up of one or more
                  ingredients, which we get from plants or animals. These
                  ingredients contain some components that are needed by our
                  body. These components are called nutrients. The major
                  nutrients in our food are named carbohydrates, proteins, fats,
                  vitamins and minerals. In addition, food contains dietary
                  fibres and water which are also needed by our body. Do all
                  foods contain all these nutrients? With some simple methods we
                  can test whether cooked food or a raw ingredient contains one
                  or more of these nutrients. The tests for presence of
                  carbohydrates, proteins and fats are simpler to do as compared
                  to the tests for other nutrients.
                </p>
              </div>

              <div>
                <p className="text-lg font-bold underline">
                  What do different food items containe?
                </p>
                <p>
                  Carbohydrates mainly provide energy to our body. Fats also
                  give us energy. In fact, fats give much more energy as
                  compared to the same amount of carbohydrates. Foods containing
                  fats and carbohydrates are also called ‘energy giving foods’
                  (Fig. 1.3 and Fig. 1.4). Proteins are needed for the growth
                  and repair of our body. Foods proteins are often called ‘body
                  building foods’ (Fig 1.5). Vitamins help in protecting our
                  body against diseases. Vitamins also help in keeping our eyes,
                  bones, teeth and gums healthy. Vitamins are of different kinds
                  known by different names. Some of these are Vitamin A, Vitamin
                  C, Vitamin D, Vitamin E and K. There is also a group of
                  vitamins called Vitamin B-complex. Our body needs all types of
                  vitamins in small quantities. Vitamin A keeps our skin and
                  eyes healthy. Vitamin C helps body to fight against many
                  diseases. Vitamin D helps our body to use calcium for bones
                  and teeth.
                </p>
              </div>

              {/* video links */}
              <div className="flex flex-col mt-4 gapy-4">
                <div className="mb-4">
                  <p className="text-xl font-bold">Add Video References</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Input label="Add Youtube Video Link"></Input>
                  <Input label="Add Youtube Video Link"></Input>
                  <Input label="Add Youtube Video Link"></Input>
                </div>
              </div>

              {/* docs */}
              <div className="flex flex-row gap-x-36">
                <div className="flex flex-col mt-4 gap-y-4">
                  <div className="">
                    <p className="text-xl font-bold">
                      Upload Documents for References
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                      multiple={true}
                    />
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                      multiple={true}
                    />
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                      multiple={true}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-y-4">
                  <div className="mb-">
                    <p className="text-xl font-bold">
                      Upload Images for References
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                      multiple={true}
                    />
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                      multiple={true}
                    />
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                      multiple={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row modal-action">
              <form method="dialog">
                <div className="flex flex-row gap-x-4">
                  <button
                    className="text-white bg-blue-500 btn"
                    onClick={() =>
                      toast.success("References updated Successfully")
                    }
                  >
                    Save
                  </button>
                  <button className="btn">Close</button>
                </div>
                {/* if there is a button in form, it will close the modal */}
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default ViewMyProfile;
