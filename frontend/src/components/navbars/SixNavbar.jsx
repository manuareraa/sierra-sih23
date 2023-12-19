import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function SixNavbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
      {/* <Button
        className=""
        onPress={() => {
          navigate("/mode/five/content-platform/search");
        }}
      >
        Search Content
      </Button> */}
    </>
  );
}

export default SixNavbar;
