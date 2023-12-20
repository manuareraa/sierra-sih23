import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import { useState } from "react";

function VerifyCert(props) {
  const navigate = useNavigate();
  const { appState, mode, setMode, t } = useAppContext();
  const [formData, setFormData] = useState({
    cert: "",
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-20 ">
      <div className="">
        <p className="my-4 text-xl font-bold">{t("Verify Certificate")}</p>

        {/* form */}
        <div className="flex flex-col p-4 py-4 border-2 border-black/20 rounded-2xl gap-y-4">
          <Input
            type="text"
            label={t("Certificate Number")}
            className="w-[450px]"
            onChange={(e) => {
              setFormData({ ...formData, cert: e.target.value });
            }}
            value={formData.cert}
          />
          <Button
            className="text-white bg-blue-500 w-[450px]"
            onPress={() => {
              navigate("/mode/two/view-my-profile/0");
            }}
          >
            {t("Verify")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyCert;
