import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function FourNavbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/four/learning-platform/home");
        }}
      >
        Home
      </Button>
      {/* <Button
        className=""
        onPress={() => {
          navigate("/mode/two/view-my-profile/0");
        }}
      >
        View My Profile
      </Button> */}
    </>
  );
}

export default FourNavbar;
