import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function FiveNavbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/five/content-platform/create");
        }}
      >
        Create Content
      </Button>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/five/content-platform/search");
        }}
      >
        Search Content
      </Button>
    </>
  );
}

export default FiveNavbar;
