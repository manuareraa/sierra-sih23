import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
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

function ViewMyProfile(props) {
  const navigate = useNavigate();
  const { appState, mode, setMode } = useAppContext();
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
        <p className="my-4 text-xl font-bold">Your Profile</p>
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
              Name: <span className="font-bold">{teacher.name}</span>
              Department:{" "}
              <span className="font-bold">{teacher.department}</span>
              DOB: <span className="font-bold">{teacher.dob}</span>
              Experience:{" "}
              <span className="font-bold">
                {teacher.yearsOfExperience} Years
              </span>
              Institution: <span className="font-bold">{school}</span>
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
                <div className="stat-title">Current Reputation</div>
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
              <p className="text-xl font-bold">Your Skillset</p>
            </div>

            {/* skillset */}
            <div className="flex">
              <div className="shadow stats">
                {/* one-to-one */}
                <div className="stat">
                  <div className="stat-figure text-primary">{/* svg */}</div>
                  <div className="stat-title">One-to-One</div>
                  <div className="stat-value text-primary">
                    {teacher.reputation}
                  </div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>

                {/* project-based */}
                <div className="stat">
                  <div className="stat-figure text-primary">{/* svg */}</div>
                  <div className="stat-title">Project Based</div>
                  <div className="stat-value text-primary">
                    {teacher.reputation}
                  </div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>

                {/* online */}
                <div className="stat">
                  <div className="stat-figure text-primary">{/* svg */}</div>
                  <div className="stat-title">Online</div>
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
              <p className="text-xl font-bold">Manage Your Classes</p>
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
                  <div className="stat-title">Class</div>
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
                  <div className="stat-title">Class</div>
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
                  <div className="stat-title">Class</div>
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
            <p className="text-xl font-bold">View Your Class</p>
          </div>

          {/* class stats container */}
          <div className="mb-8">
            {selectedClass === 0 ? (
              <div className="flex flex-col items-center justify-center gap-y-4">
                <p className="font- text-md">No Class Selected</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div></div>

                {/* stats */}
                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Class</div>
                    <div className="stat-value">
                      {selectedClass === 0 ? "None" : selectedClass}th
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Strength</div>
                    <div className="stat-value">
                      {selectedClass === 0 ? "None" : students.length}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Avg. CARS Score</div>
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
                    <div className="stat-title">Highest</div>
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
                    <div className="stat-title">Lowest</div>
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
                    <th>View</th>
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
                            View Profile
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
              <p className="text-xl font-bold">Manage Student Collaboration</p>
            </div>

            {/* title container */}
            <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
              <div className="flex flex-col gap-y-4">
                {/* title */}
                <div className="items-center justify-start w-full">
                  <p className="font-bold text-black text-md">
                    Project-based Learning
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
                    <th>Name</th>
                    <th>CARS Score</th>
                    <th>Project</th>
                    <th>Project Status</th>
                    {/* <th>EduLog</th> */}
                    <th>Generate & Assign</th>
                    <th>Project</th>
                    <th>Online</th>
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
                    <td>Not Assigned</td>
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
                        Generate & Assign
                      </Button>
                    </td>
                    <td>
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                        Re-Generate & Assign
                      </Button>
                    </td>
                    <td>
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                    <td>Not Assigned</td>
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
                        Generate & Assign
                      </Button>
                    </td>
                    <td>
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                    Online Learning
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
                    <th>Name</th>
                    <th>CARS Score</th>
                    <th>Course</th>
                    <th>Course Status</th>
                    {/* <th>EduLog</th> */}
                    <th>Online</th>
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
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                    1-to-1 Learning
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
                    <th>Name</th>
                    <th>CARS Score</th>
                    <th>Class</th>
                    <th>Periods</th>
                    {/* <th>EduLog</th> */}
                    <th>Project</th>
                    <th>Online</th>
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
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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
                      <Button size="sm">To Project</Button>
                    </td>
                    <td>
                      <Button size="sm">To Online</Button>
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

        <div></div>
      </div>
    </div>
  );
}

export default ViewMyProfile;
