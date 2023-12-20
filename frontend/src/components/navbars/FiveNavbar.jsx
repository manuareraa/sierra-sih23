import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";

function FiveNavbar(props) {
  const { t } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/five/content-platform/create");
        }}
      >
        {t("Create Content")}
      </Button>
      <Button
        className=""
        onPress={() => {
          navigate("/mode/five/content-platform/search");
        }}
      >
        {t("Search Content")}
      </Button>
    </>
  );
}

export default FiveNavbar;
