import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";

function FourNavbar(props) {
  const { t } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/four/learning-platform/home");
        }}
      >
        {t("Home")}
      </Button>
      <Button
        className="bg-black/50"
        onPress={() => {
          navigate("/mode/two/view-my-profile/0");
        }}
      >
        {t("View My Profile")}
      </Button>
    </>
  );
}

export default FourNavbar;
