import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";

function TwoNavbar(props) {
  const { t } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/two/login");
        }}
      >
        {t("Teacher Login")}
      </Button>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/two/view-my-profile/0");
        }}
      >
        {t("View My Profile")}
      </Button>
    </>
  );
}

export default TwoNavbar;
