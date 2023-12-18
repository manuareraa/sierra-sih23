import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function ThreeNavbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/three/student/view/9/55176147");
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

export default ThreeNavbar;
