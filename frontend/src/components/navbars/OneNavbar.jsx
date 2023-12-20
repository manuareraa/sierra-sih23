import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";

function OneNavbar(props) {
  const { t } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/one/recruit");
        }}
      >
        {t("New Recruit")}
      </Button>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/one/teachers");
        }}
      >
        {t("Teachers")}
      </Button>
    </>
  );
}

export default OneNavbar;
