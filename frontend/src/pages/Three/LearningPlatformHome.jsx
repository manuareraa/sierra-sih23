import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import toast from "react-hot-toast";

import tickIcon from "../../assets/svg/tick.svg";

function LearningPlatformHome(props) {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [query, setQuery] = useState("");

  const submitQuery = async () => {
    try {
      console.log("submitting query", query);
    } catch (error) {
      console.log(error);
      toast.error("Error submitting query");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      <div className="">
        <p className="my-4 text-xl font-bold">Online Learning Platform</p>
      </div>

      <div className="divider"></div>

      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">
              Available Chapters for Class 6
            </p>
          </div>
        </div>
      </div>

      {/* chapters grid */}
      <div className="grid w-full grid-cols-4 grid-rows-2 my-6 gap-x-8 gap-y-8">
        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">Chapter: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">View</Button>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">
              AI Powered Learning Path
            </p>
          </div>
        </div>
      </div>

      {/* input container */}
      <div className="flex flex-col items-center justify-center w-full gap-y-">
        <div className="w-full px-48 my-6">
          <Input
            type="text"
            label="What do you want to learn today?"
            size="lg"
            className="text-3xl"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <Button
          className="text-white bg-blue-500"
          size="lg"
          onPress={() => {
            submitQuery();
          }}
        >
          Generate new Learning Path
        </Button>
      </div>

      {/* ai generated course container */}
      <div className="flex flex-col items-center justify-center gap-y-8">
        <div className="my-6 mt-12">
          <p className="text-lg font-bold">
            Hooray!! Our AI has generated a new learning path for you.
          </p>
        </div>
      </div>

      {/* ai generated course grid */}
      <div>
        <ul className="timeline timeline-vertical">
          <li>
            <div className="timeline-start">
              {/* <Button className="text-white bg-green-500" size="sm">
                Start
              </Button> */}
            </div>
            <div className="timeline-middle">
              <img src={tickIcon} className="w-4 h-4 mx-3" />
            </div>
            <div className="my-6 timeline-end timeline-box">
              Learning path Generated
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">
              <Button className="text-white bg-green-500" size="sm">
                Start
              </Button>
            </div>
            <div className="timeline-middle">
              <img src={tickIcon} className="w-4 h-4 mx-3" />
            </div>
            <div className="my-6 timeline-end timeline-box">iMac</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">
              <Button
                className="text-white bg-green-500 disabled:bg-green-500/50 disabled:cursor-not-allowed"
                size="sm"
                disabled={true}
              >
                Start
              </Button>
            </div>
            <div className="timeline-middle">
              <img src={tickIcon} className="w-4 h-4 mx-3" />
            </div>
            <div className="my-6 timeline-end timeline-box">iPod</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">
              <Button
                className="text-white bg-green-500 disabled:bg-green-500/50 disabled:cursor-not-allowed"
                size="sm"
                disabled={true}
              >
                Start
              </Button>
            </div>
            <div className="timeline-middle">
              <img src={tickIcon} className="w-4 h-4 mx-3" />
            </div>
            <div className="my-6 timeline-end timeline-box">iPhone</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">
              <Button
                className="text-white bg-green-500 disabled:bg-green-500/50 disabled:cursor-not-allowed"
                size="sm"
                disabled={true}
              >
                Get Your Certificate
              </Button>
            </div>
            <div className="timeline-middle">
              <img src={tickIcon} className="w-4 h-4 mx-3" />
            </div>
            <div className="my-6 timeline-end timeline-box">
              Completed Successfully
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LearningPlatformHome;
