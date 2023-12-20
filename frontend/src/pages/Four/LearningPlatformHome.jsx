import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import toast from "react-hot-toast";
import YouTube from "react-youtube";

import imgOne from "../../site-docs/1.png";
import imgTwo from "../../site-docs/2.png";

import tickIcon from "../../assets/svg/tick.svg";

function LearningPlatformHome(props) {
  const navigate = useNavigate();
  const {
    user,
    callOpenAI,
    chatWithOpenAI,
    generateCertificate,
    t,
    doTexttoSpeech,
    translateContentTo,
  } = useAppContext();
  const [query, setQuery] = useState("");
  const [customPath, setCustomPath] = useState([]);
  const [loadingForAI, setLoadingForAI] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatQuery, setChatQuery] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [modalContent, setModalContent] = useState({
    Title: "",
    Description: "",
    Content: "",
  });
  const [repValue, setRepValue] = useState("+0.55");
  const [generated, setGenerated] = useState(false);
  const [certLoading, setCertLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [engToggle, setEngToggle] = useState(true);
  const [hindiToggle, setHindiToggle] = useState(false);
  const [tHindi, setTHindi] = useState("");
  const [hindiTProgress, setHindiTProgress] = useState(false);

  const playAudio = () => {
    new Audio(audioSrc).play();
  };

  const submitCertQuery = async () => {
    try {
      setCertLoading(true);
      const certResponse = await generateCertificate(
        customPath[0].Title,
        "+0.55"
      );
      setRepValue("+0.55");
      if (certResponse !== false) {
        console.log("certResponse", certResponse);
        toast.success("Certificate generated successfully");
        // document.getElementById("my_modal_2").close();
        setGenerated(true);
        setCertLoading(false);
      } else {
        toast.error("Error generating certificate");
        setCertLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error generating certificate");
      setCertLoading(false);
    }
  };

  const submitQuery = async () => {
    try {
      setLoadingForAI(true);
      console.log("submitting query", query);
      const aiResponse = await callOpenAI(query);
      if (aiResponse !== false) {
        console.log("aiResponse", aiResponse);
        toast.success("Learning path generated successfully");
        await convertNestedObjectToArray(aiResponse);
        setLoadingForAI(false);
      } else {
        setLoadingForAI(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error submitting query");
      setLoadingForAI(false);
    }
  };

  const obj = {
    "1. Introduction to Food Labels": {
      Description: "Understanding the basic information about food labels",
      Content:
        "Food labels provide vital information about the nutritional content of foods and can aid in developing healthier eating habits. At first glance, food labels might seem complicated, but they offer necessary data for you to make healthier food choices.",
    },
    "2. Components of a Food Label": {
      Description:
        "Decoding the different parts of a food label - Ingredients List and Nutrition Information Panel",
      Content:
        "A food label consists of two main parts. The 'Ingredients List' shows what the food is made up from. Ingredients are listed in descending order from highest to lowest quantity, helping you gauge what the key ingredients of the product are, and identify any substances you might wish to avoid. The 'Nutrition Information Panel' provides information about the food's nutritional value, including the caloric content (how much energy the food provides), the amount of fats, proteins and carbohydrates it contains, sugars and sodium levels, and the amount of dietary fiber, essential for digestive health.",
    },
    "3. Allergen Information and Health Claims": {
      Description:
        "Identifying allergens and understanding health claims placed on food labels",
      Content:
        "Food labels should also highlight any common allergens, such as nuts, dairy and eggs. This is important if you have food allergies or intolerances. Sometimes, food labels may also include health claims like 'low fat', 'high in fiber'. While these can provide useful information, it's also important to cross-check this with the nutritional information provided, to ensure these claims aren't just for marketing.",
    },
    "4. Use-by and Best-Before Dates": {
      Description:
        "Understanding the difference between 'use-by' and 'best-before' dates on food labels",
      Content:
        "The 'use-by' date indicates the date by which the food product should be consumed, usually for health and safety reasons. The 'best-before' date, on the other hand, suggests when the product is at its best quality when it comes to taste and texture. It can often be consumed after this date, but the quality may not be as good.",
    },
  };

  const convertNestedObjectToArray = async (inputObject) => {
    const arrayOfObjects = [];
    setCustomPath([]);

    for (const key in inputObject) {
      if (inputObject.hasOwnProperty(key)) {
        const obj = {
          Title: key,
          Description: inputObject[key].Description,
          Content: inputObject[key].Content,
        };
        arrayOfObjects.push(obj);
        setCustomPath(arrayOfObjects);
      }
    }

    console.log("arrayOfObjects", arrayOfObjects);
  };

  const sendChatQuery = async () => {
    try {
      setChatLoading(true);
      const chatResponse = await chatWithOpenAI(chatQuery);
      if (chatResponse !== false) {
        console.log("chatResponse", chatResponse);
        toast.success("Chat response generated successfully");
        let tempMsg = chatMessages;
        tempMsg.push({
          role: "user",
          text: chatQuery,
        });
        tempMsg.push(chatResponse);
        setChatMessages(tempMsg);
        setChatQuery("");
        setChatLoading(false);
      } else {
        setChatLoading(false);
        toast.error("Error generating chat response");
      }
    } catch (error) {
      setChatLoading(false);
      console.log(error);
      toast.error("Error generating chat response");
    }
  };

  const translateContent = async (content) => {
    try {
      setHindiTProgress(true);
      const response = await translateContentTo(content);
      if (response !== false) {
        setTHindi(response);
        setHindiTProgress(false);
        setEngToggle(false);
        setHindiToggle(true);
      }
    } catch (error) {
      console.log("Error occured while translating content.", error);
      setHindiTProgress(false);
    }
  };

  useEffect(() => {
    // convertNestedObjectToArray(obj);
    console.log("customPath", customPath);
  }, [customPath]);

  useEffect(() => {
    console.log("chatMessages", chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    convertNestedObjectToArray(obj);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      <div className="">
        <p className="my-4 text-xl font-bold">
          {t("Enhanced Learning Platform")}
        </p>
      </div>

      <div className="divider"></div>

      {/* title container */}
      <div className="flex flex-row w-full px-6 py-3 bg-black/10 rounded-xl gap-x-3">
        <div className="flex flex-col gap-y-4">
          {/* title */}
          <div className="items-center justify-start w-full">
            <p className="font-bold text-black text-md">
              {t("Available Chapters for Class")} 6
            </p>
          </div>
        </div>
      </div>

      {/* chapters grid */}
      <div className="grid w-full grid-cols-4 grid-rows-2 my-6 gap-x-8 gap-y-8">
        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button
              className="bg-white"
              onClick={() => {
                document.getElementById("my_modal_3").showModal();
              }}
            >
              {t("View")}
            </Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-blue-500 rounded-lg gap-x-2">
          <div className="flex flex-col gap-y-">
            <p className="text-xs font-bold text-white">{t("Chapter")}: 1</p>
            <p className="text-lg font-bold text-white">Components of Food</p>
          </div>
          <div>
            <Button className="bg-white">{t("View")}</Button>
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
              AI {t("Powered Learning Path")}
            </p>
          </div>
        </div>
      </div>

      {/* input container */}
      <div className="flex flex-col items-center justify-center w-full gap-y-">
        <div className="w-full px-48 my-6">
          <Input
            type="text"
            label={t("What do you want to learn today?")}
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
          isLoading={loadingForAI}
        >
          {loadingForAI === true ? (
            "AI is generating your path..."
          ) : (
            <>{t("Generate Learning Path")}</>
          )}
        </Button>
      </div>

      {/* dual container */}
      <div className="flex flex-col items-start justify-center w-full h-full gap-y-12">
        {/* learning path container */}
        {customPath.length === 0 ? null : (
          <div className="flex flex-col items-center justify-center w-full">
            {/* ai generated course container */}
            <div className="flex flex-col items-center justify-center gap-y-8">
              <div className="my-6 mt-12">
                <p className="text-lg font-bold">
                  <span>{t("Hooray!! Our")}</span>
                  &nbsp;AI&nbsp;
                  <span>
                    {t("generated the following learning path for you")}
                  </span>
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
                    {t("Learning path Generated")}
                  </div>
                  <hr />
                </li>

                {customPath.map((item, index) => {
                  return (
                    <li>
                      <hr />
                      <div className="timeline-start">
                        <Button
                          className="text-white bg-green-500"
                          size="sm"
                          onClick={() => {
                            setModalContent(item);
                            document.getElementById("my_modal_1").showModal();
                          }}
                        >
                          {t("View")}
                        </Button>
                      </div>
                      <div className="timeline-middle">
                        <img src={tickIcon} className="w-4 h-4 mx-3" />
                      </div>
                      <div className="my-6 timeline-end timeline-box">
                        <div className="flex flex-col gap-y-">
                          <p className="font-bold text-">{item.Title}</p>
                          <div className="py-0 my-0 divider"></div>
                          <p className="text-sm ">{item.Description}</p>
                        </div>
                      </div>
                      <hr />
                    </li>
                  );
                })}

                {/* items end here */}
                <li>
                  <hr />
                  <div className="timeline-start">
                    <Button
                      className="text-white bg-blue-500 disabled:bg-blue-500/50 disabled:cursor-not-allowed"
                      size="lg"
                      // disabled={true}
                      onClick={() => {
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      {t("Generate Certificate")}
                    </Button>
                  </div>
                  <div className="timeline-middle">
                    <img src={tickIcon} className="w-4 h-4 mx-3" />
                  </div>
                  <div className="my-6 timeline-end timeline-box">
                    {t("Completed Successfully")}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* chatbox container */}
        <div className="w-full">
          <div className="flex flex-col items-stretch justify-center mx-56 gap-y-8">
            <div className="mt-12 my-">
              <p className="text-lg font-bold text-center">
                {t("Ask questions to the")} AI {t("Chatbot")}
              </p>
            </div>

            <div className="w-full rounded-lg bg-black/10 h-[500px]">
              <div className="flex flex-col items-start justify-start h-full p-4 gap-y-4">
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <p className="text-sm font-bold text-">
                      {t("No Messages")}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-end justify-end w-full h-full gap-y-2">
                    {chatMessages.map((item, index) => {
                      return (
                        <div
                          className={
                            item.role === "user"
                              ? "flex flex-row p-1 gap-x-6 px-3 items-center justify-start w-full gap-y-2 bg-white rounded-md mt-4"
                              : "flex p-1 px-3 flex-row gap-x-6 items-center justify-end w-full gap-y-2 bg-white rounded-md"
                          }
                          key={index}
                        >
                          {item.role === "user" ? (
                            <p className="px-4 py-2 text-xs text-black rounded-md bg-orange-500/50">
                              {t("You")}
                            </p>
                          ) : null}
                          <p className="text-sm">{item.text}</p>

                          {item.role === "user" ? null : (
                            <p className="px-4 py-2 text-xs text-white bg-blue-500 rounded-md">
                              AI
                            </p>
                          )}
                        </div>
                      );
                    })}
                    {chatLoading === true ? (
                      <p className="flex flex-col items-center w-full p-1 px-3 mt-6 text-center rounded-lg text-black/60 bg-whitee">
                        Please wait for response...
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {/* input and send message button container */}
            <div className="flex flex-col h-full gap-y-2">
              <Input
                type="text"
                label={t("Ask a question to our AI")}
                size="md"
                value={chatQuery}
                onChange={(e) => {
                  setChatQuery(e.target.value);
                }}
              ></Input>
              <Button
                className="text-white bg-blue-500"
                size=""
                onPress={() => {
                  sendChatQuery();
                }}
                isLoading={chatLoading}
              >
                {chatLoading === true ? (
                  "AI is answering..."
                ) : (
                  <>{t("Send Message")}</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="w-full modal-box">
          <div className="flex flex-col gap-y">
            <div>
              <p className="text-lg font-bold">{modalContent.Title}</p>
            </div>
            <div className="mt-1 text-sm font-normal">
              {modalContent.Description}
            </div>
            <div className="py-0 my-2 divider"></div>
          </div>
          <p className="py-">
            {modalContent.Content === "" ? (
              "No Content Available"
            ) : (
              <>
                {hindiToggle === true ? tHindi : null}
                {engToggle === true ? modalContent.Content : null}
              </>
            )}
          </p>
          <div className="flex flex-col w-full space-x-0 modal-action gap-x-0">
            <div className="flex flex-row items-center w-full gap-x-2">
              <Button
                className="text-white bg-blue-500 btn"
                onClick={() => {
                  if (tHindi === "") {
                    translateContent(modalContent.Content);
                  } else {
                    setHindiToggle(true);
                    setEngToggle(false);
                  }
                }}
                isLoading={hindiTProgress}
              >
                HI
              </Button>
              <Button
                className="text-white bg-blue-500 btn"
                onClick={() => {
                  setHindiToggle(false);
                  setEngToggle(true);
                }}
              >
                EN
              </Button>
              <Button
                className="text-white bg-blue-500 btn"
                onPress={async () => {
                  try {
                    if (audioSrc === "") {
                      let url;
                      if (hindiToggle === true) {
                        url = await doTexttoSpeech(tHindi);
                        if (url !== false) {
                          setAudioSrc(url);
                        }
                        return;
                      } else {
                        url = await doTexttoSpeech(modalContent.Content);
                        if (url !== false) {
                          setAudioSrc(url);
                        }
                        return;
                      }
                    }
                  } catch (error) {
                    console.log("Error occured while getting audio", error);
                  }
                }}
              >
                Get Audio {hindiToggle === true ? "(HI)" : "(EN)"}
              </Button>
              {audioSrc === "" ? null : (
                <button
                  className="text-white bg-blue-500 btn"
                  onClick={() => {
                    playAudio();
                  }}
                >
                  Play Audio
                </button>
              )}
            </div>
            <>
              {audioSrc !== "" ? (
                <audio src={audioSrc} controls className="mt-4" />
              ) : null}
            </>
            <form method="dialog flex-end flex w-full">
              {/* if there is a button in form, it will close the modal */}
              {/* close button */}
              <button
                className="mt-4 btn"
                onClick={() => {
                  setModalContent({
                    Title: "",
                    Description: "",
                    Content: "",
                  });
                }}
              >
                {t("Close")}
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* modal for generating certificate */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-y1">
            <div>
              <p className="text-lg font-bold">
                {t("Generate Your Certificate")}
              </p>
            </div>
            <div className="py-0 my-2 divider"></div>
          </div>
          <p className="py-">
            {t("Congratulations! You have successfully completed the course.")}
          </p>
          {generated === true ? (
            <div className="p-2 mt-6 rounded-lg bg-slate-400/10">
              <p>
                Your certificate has been added to blockchain. You have been
                awarded{" "}
                <span className="font-bold text-green-500">{repValue}</span>{" "}
                CARS Score in{" "}
                <span className="font-bold text-violet-500">
                  Online Learning
                </span>{" "}
                category.
              </p>
            </div>
          ) : null}
          <div className="modal-action">
            {generated === true ? null : (
              <Button
                className="text-white bg-blue-500 btn"
                onClick={() => {
                  submitCertQuery();
                }}
                isLoading={certLoading}
              >
                {certLoading === true ? (
                  "Generating Certificate..."
                ) : (
                  <>{t("Generate Certificate")}</>
                )}
              </Button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  setModalContent({
                    Title: "",
                    Description: "",
                    Content: "",
                  });
                }}
              >
                {t("Close")}
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_3" className="modal ">
        <div className="w-11/12 max-w-5xl modal-box">
          <h3 className="text-2xl font-bold">Course Content</h3>
          <div className="divider"></div>
          <div className="flex flex-col gap-y-4">
            <div className="">
              <p className="text-lg font-bold underline">Introduction:</p>
              <p className="">
                In lower classes, we made lists of the food items that we eat.
                We also identified food items eaten in different parts of India
                and marked these on its map. A meal could consist of chapati,
                dal and brinjal curry. Another may be rice, sambar and a
                vegetable preparation of lady’s finger (bhindi). Yet another
                meal could be appam, fish curry and vegetables. curd, butter
                milk and pickles. Some examples of meals from different regions
                are given in Table 1.1. Select food items and enter these in
                Table 1.1. Sometimes, we may not really have all this variety in
                our meals. If we are travelling, we may eat whatever is
                available on the way. It may not be possible for some of us, to
                eat such a variety of items, most of the time. There must be
                some reason though, why meals usually consist of such a
                distribution. Do you think that our body needs different kinds
                of food for some special purpose?
              </p>
            </div>

            <div className="">
              <p className="text-lg font-bold underline">
                What do different food items containe?
              </p>
              <p>
                We know that each dish is usually made up of one or more
                ingredients, which we get from plants or animals. These
                ingredients contain some components that are needed by our body.
                These components are called nutrients. The major nutrients in
                our food are named carbohydrates, proteins, fats, vitamins and
                minerals. In addition, food contains dietary fibres and water
                which are also needed by our body. Do all foods contain all
                these nutrients? With some simple methods we can test whether
                cooked food or a raw ingredient contains one or more of these
                nutrients. The tests for presence of carbohydrates, proteins and
                fats are simpler to do as compared to the tests for other
                nutrients.
              </p>
            </div>

            <div>
              <p className="text-lg font-bold underline">
                What do different food items containe?
              </p>
              <p>
                Carbohydrates mainly provide energy to our body. Fats also give
                us energy. In fact, fats give much more energy as compared to
                the same amount of carbohydrates. Foods containing fats and
                carbohydrates are also called ‘energy giving foods’ (Fig. 1.3
                and Fig. 1.4). Proteins are needed for the growth and repair of
                our body. Foods proteins are often called ‘body building foods’
                (Fig 1.5). Vitamins help in protecting our body against
                diseases. Vitamins also help in keeping our eyes, bones, teeth
                and gums healthy. Vitamins are of different kinds known by
                different names. Some of these are Vitamin A, Vitamin C, Vitamin
                D, Vitamin E and K. There is also a group of vitamins called
                Vitamin B-complex. Our body needs all types of vitamins in small
                quantities. Vitamin A keeps our skin and eyes healthy. Vitamin C
                helps body to fight against many diseases. Vitamin D helps our
                body to use calcium for bones and teeth.
              </p>
            </div>

            {/* video links */}
            <div className="flex flex-col mt-4 gapy-4">
              <div className="mb-4">
                <p className="text-xl font-bold">Video References</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-y-2">
                <YouTube videoId="PbASRGbWbT4" />
                <YouTube videoId="t89zX78TbNE" />
                <YouTube videoId="rJw4RpFRhBo" />
              </div>
            </div>

            {/* docs */}
            <div className="flex flex-col items-center justify-center w-full mt-6 gap-y-16">
              <div className="flex flex-col mt-4 gap-y-4">
                <div className="">
                  <p className="text-xl font-bold">Documents for References</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-row items-center justify-between w-full p-2 px-4 rounded-lg border-1 border-black/40">
                    <p className="underline">CoF-Chapter-1.pdf</p>
                    <Button
                      className="text-white bg-blue-500"
                      size="sm"
                      onPress={() =>
                        window.open("/site-docs/CoF-Chapter-1.pdf", "_blank")
                      }
                    >
                      View
                    </Button>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full p-2 px-4 rounded-lg border-1 border-black/40">
                    <p className="underline">CoF-Chapter-2.pdf</p>
                    <Button
                      className="text-white bg-blue-500"
                      size="sm"
                      onPress={() =>
                        window.open("/site-docs/CoF-Chapter-2.pdf", "_blank")
                      }
                    >
                      View
                    </Button>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full p-2 px-4 rounded-lg border-1 border-black/40">
                    <p className="underline">CoF-Chapter-3.pdf</p>
                    <Button
                      className="text-white bg-blue-500"
                      size="sm"
                      onPress={() =>
                        window.open("/site-docs/CoF-Chapter-3.pdf", "_blank")
                      }
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full mt-4 gap-y-4">
                <div className="mb-">
                  <p className="text-xl font-bold">Images for References</p>
                </div>
                <div className="flex flex-row mt-6 gap-x-12">
                  <img src={imgOne} className="w-80 h-80" />
                  <img src={imgTwo} className="w-80 h-80" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row modal-action">
            <form method="dialog">
              <div className="flex flex-row gap-x-4">
                {/* <button
                  className="text-white bg-blue-500 btn"
                  onClick={() =>
                    toast.success("References updated Successfully")
                  }
                >
                  Save
                </button> */}
                <button className="btn">Close</button>
              </div>
              {/* if there is a button in form, it will close the modal */}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default LearningPlatformHome;
