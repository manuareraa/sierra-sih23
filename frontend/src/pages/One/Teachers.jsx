import React, { useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Teachers(props) {
  const { appState } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Teachers Pg:: ", appState.teachers);
  }, [appState.teachers]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-20 ">
      <div className="">
        <p className="my-4 text-xl font-bold">Enrolled Teachers</p>
      </div>

      {/* table */}
      <div className="w-full px-40 py-6">
        <div className="w-full overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Reputation</th>
                <th>DOB</th>
                <th>SBT ID</th>
                <th>Experience</th>
                <th>Department</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 2 */}
              {/* <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr> */}

              {appState.teachers.map((teacher, index) => {
                return (
                  <tr key={index} className="hover">
                    <th>{index + 1}</th>
                    <td>{teacher.name}</td>
                    <td>{teacher.reputation}</td>
                    <td>{teacher.department}</td>
                    <td>{teacher.tokenId}</td>
                    <td>{teacher.yearsOfExperience}</td>
                    <td>{teacher.dob}</td>
                    <td>{teacher.address}</td>
                    <td>
                      <Button
                        size="sm"
                        className=""
                        onPress={() => {
                          navigate("/mode/one/teacher/view/" + teacher.tokenId);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
