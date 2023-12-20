import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";

function SixNavbar(props) {
  const { t } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <Button
        className=""
        onPress={() => {
          navigate("/");
        }}
      >
        {t("Home")}
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
