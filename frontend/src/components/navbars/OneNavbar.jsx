import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function OneNavbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/one/recruit");
        }}
      >
        New Recruit
      </Button>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/one/teachers");
        }}
      >
        Teachers
      </Button>
    </>
  );
}

export default OneNavbar;
