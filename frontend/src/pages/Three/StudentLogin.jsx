import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../../utils/AppContext";

function StudentLogin(props) {
  const navigate = useNavigate();
  const { appState, mode, setMode, t } = useAppContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-20 ">
      <div className="">
        <p className="my-4 text-xl font-bold">{t("Student's Login")}</p>

        {/* form */}
        <div className="flex flex-col p-4 py-4 border-2 border-black/20 rounded-2xl gap-y-4">
          <Input
            type="email"
            label="Email"
            className="w-[450px]"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            value={formData.email}
          />
          <Input
            type="password"
            label="Password"
            className="w-[450px]"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            value={formData.password}
          />
          <Button
            className="text-white bg-blue-500 w-[450px]"
            onPress={() => {
              navigate("/mode/three/student/view/9/55176147");
            }}
          >
            {t("Login")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
