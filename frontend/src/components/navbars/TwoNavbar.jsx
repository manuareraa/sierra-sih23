import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function TwoNavbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/two/login");
        }}
      >
        Teacher Login
      </Button>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/two/view-my-profile/0");
        }}
      >
        View My Profile
      </Button>
    </>
  );
}

export default TwoNavbar;
