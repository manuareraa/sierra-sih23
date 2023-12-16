import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { Web3Auth } from "@web3auth/modal";
import contractAbi from "../smart-contract/abi.json";
import { ethers } from "ethers";
import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { encodeFunctionData, createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

import Loading from "../components/loader/Loading";
import Navbar from "../components/Navbar";
import { Button } from "@nextui-org/react";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    loggedIn: false,
    totalTeacherCount: 0,
    teachers: [],
  });
  const [mode, setMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = "http://localhost:3070";
  const contractAddress = "0x8dcC35705e905aD327EfC623dA121F0446AE89Df";
  const studentContractAddress = "0x34B482a392D9C663664D8C360aF730028f715EDA";
  const ownPk =
    "70f4e86d068a698a50223f7956a663b36b4fe2066af4056c18e290c046e1ab48";
  const provider = new ethers.BrowserProvider(window.ethereum);
  const HFToken = "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";
  const OPENAI_API_KEY = "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";

  const initWeb3Auth = async () => {
    const chainConfig = {
      chainNamespace: "eip155",
      chainId: "0x13881",
      rpcTarget: "https://rpc-mumbai.maticvigil.com",
      displayName: "Polygon Testnet",
      blockExplorer: "https://polygon.etherscan.io",
      ticker: "MATIC",
      tickerName: "Polygon",
    };

    // Initialize within useEffect()
    const web3auth = new Web3Auth({
      clientId:
        "BCrXbYHPmzm1hH6BkBVOY7IxIHWszd61qZxjk2RbHsMsvE3I0nIddBisLanMV2Kr6nE2iAD6mRdAnYrmLzXpKD8", // Get your Client ID from the Web3Auth Dashboard
      web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
      chainConfig,
      uiConfig: {
        theme: "dark",
        loginMethodsOrder: [
          "google",
          "facebook",
          "email_passwordless",
          "twitter",
        ],
      },
    });

    // setWeb3AuthState(web3auth);

    setAppState((prevState) => {
      return {
        ...prevState,
        web3auth: web3auth,
      };
    });

    await web3auth.initModal();

    console.log("Web3 model initialized. Connected: ", web3auth.connected);

    if (web3auth.connected === true) {
      setAppState((prevState) => {
        return {
          ...prevState,
          loggedIn: true,
        };
      });
      return true;
    }
  };

  const createNewTeacher = async (teacher) => {
    console.log("Creating new teacher");
    try {
      setLoading(true);
      const result = await axios.post(`${backendURL}/create-new-teacher`, {
        teacher,
      });
      console.log("Result: ", result.data, teacher);
      if (result.data.status === "success") {
        const wallet = new ethers.Wallet(ownPk, provider);
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          wallet
        );
        const tx = await contract.mint(
          teacher.account.address,
          teacher.account.address,
          teacher.name,
          teacher.department,
          teacher.dob,
          parseInt(teacher.baseReputation),
          parseInt(teacher.baseExperience),
          parseInt(teacher.oneToOneRating),
          parseInt(teacher.onlineRating),
          parseInt(teacher.projectRating)
        );
        await tx.wait();
        console.log("Transaction successful:", tx);
        toast.success("New Teacher Recruited");
        await getTotalTeacherCount();
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.log("Error creating new teacher: ", error);
      toast.error("Error creating new teacher");
      setLoading(false);
      return false;
    }
  };

  const getTotalTeacherCount = async () => {
    try {
      const wallet = new ethers.Wallet(ownPk, provider);
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        wallet
      );
      const tx = await contract.getTeachersCount();
      console.log("Total teacher count: ", parseInt(tx));
      setAppState((prevState) => {
        return {
          ...prevState,
          totalTeacherCount: parseInt(tx),
        };
      });
    } catch (error) {
      console.log("Error getting total teacher count: ", error);
    }
  };

  const getAllTeachersMetadata = async (count) => {
    try {
      const wallet = new ethers.Wallet(ownPk, provider);
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        wallet
      );

      let teachers = [];

      for (let i = 0; i < appState.totalTeacherCount; i++) {
        const tx = await contract.getTeacherProfileByCount(i);
        let teacher = {
          name: tx.name,
          dob: tx.dob,
          department: tx.department,
          address: tx.addr,
          tokenId: parseInt(tx.tokenId),
          reputation: parseInt(tx.reputation),
          yearsOfExperience: parseInt(tx.yearsOfExperience),
        };
        teachers.push(teacher);
      }

      setAppState((prevState) => {
        return {
          ...prevState,
          teachers: teachers,
        };
      });
    } catch (error) {
      console.log("Error getting total teacher count: ", error);
    }
  };

  const callMixtral = async () => {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/gpt2-large",
        {
          inputs:
            "Summarize this - **Northern India**: The cuisine here is heavily influenced by the agricultural lifestyle, where wheat is a staple crop. Dishes like roti, paratha, and naan are common. The region is also known for its rich, creamy gravies, tandoori cooking, and the extensive use of dairy, especially in Punjab, where paneer (cottage cheese) and ghee (clarified butter) are dietary staples. The Mughlai cuisine, with its roots in the Mughal empire, offers a range of biryanis, kebabs, and rich curries.",
        },
        {
          headers: {
            Authorization: "Bearer " + HFToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from Bloke: ", response);
    } catch (error) {
      console.log("Error from Bloke: ", error);
    }
  };

  useEffect(() => {
    getTotalTeacherCount();
    callMixtral();
  }, []);

  useEffect(() => {
    getAllTeachersMetadata();
  }, [appState.totalTeacherCount]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        loadingText,
        setLoadingText,
        appState,
        setAppState,
        initWeb3Auth,
        createNewTeacher,
        mode,
        setMode,
      }}
    >
      <Toaster />
      {loading === true ? (
        <Loading />
      ) : (
        <div className="">
          <Navbar />
          {children}

          {/* <Footer /> */}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
