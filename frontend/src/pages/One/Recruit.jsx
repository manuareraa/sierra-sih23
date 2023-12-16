import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useAppContext } from "../../utils/AppContext";
import Web3 from "web3";

function Recruit(props) {
  const { appState, createNewTeacher } = useAppContext();
  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    department: "",
    baseReputation: "",
    baseExperience: "",
    oneToOneRating: "",
    onlineRating: "",
    projectRating: "",
  });

  const submitForm = async () => {
    const newAcc = generateNewAccount();
    formData.account = newAcc;
    const result = await createNewTeacher(formData);
  };

  const generateNewAccount = () => {
    const web3 = new Web3();
    const account = web3.eth.accounts.create();
    console.log("New account: ", account);
    return account;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-20 ">
      <div className="">
        <p className="my-4 text-xl font-bold">New Recruit</p>

        {/* form */}
        <div className="flex flex-col p-4 py-4 border-2 border-black/20 rounded-2xl gap-y-4">
          <Input
            type="text"
            label="Name"
            className="w-[450px]"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            value={formData.name}
          />
          <Input
            type="text"
            label="Date of Birth"
            className="w-[450px]"
            onChange={(e) => {
              setFormData({ ...formData, dob: e.target.value });
            }}
            value={formData.dob}
          />
          <Input
            type="text"
            label="Department"
            className="w-[450px]"
            onChange={(e) => {
              setFormData({ ...formData, department: e.target.value });
            }}
            value={formData.department}
          />
          <p className="font-bold underline underline-offset-2">
            Reputation & Experience
          </p>
          <div className="flex flex-row justify-around gap-x-2 w-[450px]">
            <Input
              type="text"
              label="Base Reputation"
              className="w-[450px]"
              onChange={(e) => {
                setFormData({ ...formData, baseReputation: e.target.value });
              }}
              value={formData.baseReputation}
            />
            <Input
              type="text"
              label="Base Experience"
              className="w-[450px]"
              onChange={(e) => {
                setFormData({ ...formData, baseExperience: e.target.value });
              }}
              value={formData.baseExperience}
            />
          </div>
          <p className="font-bold underline underline-offset-2">Base Ratings</p>
          <div className="flex flex-row justify-around gap-x-2 w-[450px]">
            <Input
              type="text"
              label="1:1 Rating"
              className="w-[450px]"
              onChange={(e) => {
                setFormData({ ...formData, oneToOneRating: e.target.value });
              }}
              value={formData.oneToOneRating}
            />
            <Input
              type="text"
              label="Online Rating"
              className="w-[450px]"
              onChange={(e) => {
                setFormData({ ...formData, onlineRating: e.target.value });
              }}
              value={formData.onlineRating}
            />
            <Input
              type="text"
              label="Project Rating"
              className="w-[450px]"
              onChange={(e) => {
                setFormData({ ...formData, projectRating: e.target.value });
              }}
              value={formData.projectRating}
            />
          </div>
          <Button
            className="text-white bg-blue-500 w-[450px]"
            onPress={() => {
              submitForm();
            }}
          >
            Mint Soul-bound Token
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Recruit;
