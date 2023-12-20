import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { Web3Auth } from "@web3auth/modal";
import contractAbi from "../smart-contract/abi.json";
import studentAbi from "../smart-contract/studentAbi.json";
import { ethers } from "ethers";
import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { encodeFunctionData, createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

import Loading from "../components/loader/Loading";
import Navbar from "../components/Navbar";
import { Button } from "@nextui-org/react";

import { LANGUAGES } from "../translation/languages";
import { useTranslation } from "react-i18next";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [appState, setAppState] = useState({
    loggedIn: false,
    totalTeacherCount: 0,
    teachers: [],
    studentData: {
      name: "",
      dob: "",
      address: "",
      tokenId: 999,
      carsScore: 0,
    },
    certData: null,
    sharedMaterials: [],
    attempts: [],
    insights: [],
  });
  const [mode, setMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = "http://localhost:3070";
  const contractAddress = "0x8dcC35705e905aD327EfC623dA121F0446AE89Df";
  const studentContractAddress = "0x759b65a079b9F2EBd90154F65447b74dc425299A";
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

  const callOpenAI = async (query) => {
    console.log("Calling OpenAI with Query: ", query);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo",
          model: "gpt-4",
          // response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a assistant helping students to learn lessons and topics based on their prompt.",
            },
            {
              role: "user",
              content: `"# **Detailed Lesson Material for Class 6: Exploring the World of Food and Nutrition**

                ## **Introduction to Food and Its Significance**
                
                Food is more than just a source of pleasure and a means to satisfy hunger. It is a vital part of our culture, celebrations, and daily routine. It brings families together and is an integral part of festivals and traditions across India and the world.
                
                ### **1.1 Exploring Nutritional Varieties**
                
                The vast land of India offers an incredible diversity of foods, shaped by its varied geography, climate, and cultures. Each region has its unique culinary identity, with distinct flavors and ingredients.
                
                ### **Culinary Diversity Across India**
                
                - **Northern India**: The cuisine here is heavily influenced by the agricultural lifestyle, where wheat is a staple crop. Dishes like roti, paratha, and naan are common. The region is also known for its rich, creamy gravies, tandoori cooking, and the extensive use of dairy, especially in Punjab, where paneer (cottage cheese) and ghee (clarified butter) are dietary staples. The Mughlai cuisine, with its roots in the Mughal empire, offers a range of biryanis, kebabs, and rich curries.
                - **Southern India**: The warm coastal climate here favors rice cultivation, making it a staple food. South Indian cuisine is characterized by its use of rice in various forms like idli (steamed rice cakes), dosa (rice pancakes), and uttapam (thick rice pancakes). Coconut, curry leaves, tamarind, and a variety of spices are widely used, giving the dishes a distinctive flavor. States like Kerala and Tamil Nadu are also known for their seafood specialties.
                - **Eastern India**: This region, particularly West Bengal and Odisha, is famous for its love of fish and rice. The cuisine often involves cooking in mustard oil, which adds a unique taste and aroma to the dishes. Sweets made from milk, such as rasgulla and sandesh, are a significant part of the food culture here. The use of Panch Phoron, a mix of five spices, is a hallmark of Bengali cuisine.
                - **Western India**: This region includes the states of Gujarat, Maharashtra, and Goa, each with its unique culinary style. Gujarati cuisine is known for its slightly sweet, vegetarian dishes, while Maharashtrian cuisine offers a range of spicy and mildly sweet dishes, often using peanuts and besan (gram flour). Goan cuisine stands out for its Portuguese influence, with dishes like vindaloo and Goan fish curry.
                - **Central India**: This area, including states like Madhya Pradesh, has a cuisine that is a blend of North and South Indian flavors. Wheat, millets, and rice are staple grains. The region is known for its variety of snacks and street foods, like poha (flattened rice dish) and bhutte ka kees (grated corn snack).
                - **Northeastern India**: The Northeastern states have a distinct culinary tradition that emphasizes organic and fermented foods. Staple ingredients include rice, fish, and leafy greens. The use of bamboo shoot, bhut jolokia (one of the hottest chillies), and local herbs gives their dishes a unique flavor profile. The simplicity and healthiness of the cuisine stand out, with minimal use of oil and spices.
                
                ### **Conclusion: A Melting Pot of Flavors**
                
                India’s culinary diversity is a reflection of its rich cultural tapestry. Exploring the foods from different regions not only tantalizes the taste buds but also provides insights into the history, culture, and lifestyle of the people living in these regions. For a young student, understanding this diversity can foster an appreciation for the country's rich heritage and the role of food in cultural identity.
                
                ### **1.2 Nutrients: The Building Blocks of Food**
                
                Nutrients are the compounds in foods that are essential to life and health, providing us with energy, the building blocks for repair and growth, and substances necessary to regulate chemical processes.
                
                ### **Understanding Macronutrients**
                
                - **Carbohydrates**: These are the primary source of energy for the body. Complex carbohydrates like whole grains, fruits, and vegetables also provide fiber, which aids in digestion.
                - **Proteins**: Necessary for the growth, repair, and maintenance of tissues. Proteins are made up of amino acids, some of which are essential and must be obtained from food.
                - **Fats**: Essential for brain health, energy, absorption of certain vitamins, and for protecting and insulating our bodies. Fats can be saturated or unsaturated, with a focus on healthier unsaturated fats found in fish, nuts, and certain oils.
                
                ### **Micronutrients: Small but Mighty**
                
                - **Vitamins**: Organic compounds that are necessary in small quantities for healthy growth and metabolism. Each vitamin has specific roles, such as Vitamin D for bone health and Vitamin C for immune function.
                - **Minerals**: These are inorganic elements that play a crucial role in various bodily functions. Calcium is essential for bones and teeth, iron is needed for transporting oxygen in the blood, and potassium helps in nerve and muscle function.
                
                ### **1.3 The Science of Eating Well**
                
                Eating well is about more than just satisfying hunger. It's about feeding the body the right nutrients in the right amounts.
                
                ### **Balanced Meals for Growing Bodies**
                
                - **Breakfast**: Should ideally include sources of complex carbohydrates and proteins, like whole-grain cereals with milk or yogurt, to kickstart the body's metabolism.
                - **Lunch**: A vital meal to refuel the body in the middle of the day. A balance of lean proteins, whole grains, and abundant vegetables provides sustained energy and nutrients.
                - **Dinner**: This meal should be lighter but still balanced, with an emphasis on protein, fiber-rich vegetables, and a small portion of whole grains to support overnight tissue repair and growth.
                
                ### **Snacks**: Healthy snacks are important for children to maintain energy levels. Options like fruits, nuts, and yogurt can provide essential nutrients between meals.
                
                ### **1.4 Importance of Hydration and Meal Timing**
                
                - **Hydration**: Water is crucial for every cell in the body. It aids in digestion, nutrient absorption, and waste elimination.
                - **Meal Timing**: Regular meal times help regulate the body's clock, metabolism, and energy levels. It's important not to skip meals, as this can lead to overeating later.
                
                ### **1.5 Food Choices and Physical Activity**
                
                - **Physical Activity**: The level of physical activity can dictate dietary needs. More active children may need more calories and protein.
                - **Making Smart Food Choices**: Understanding the value of nutrient-dense foods over calorie-dense foods with little nutritional value is key to making smart food choices.
                
                ### **Conclusion: Nourishing the Future**
                
                Good nutrition is fundamental to the well-being and healthy development of children. By learning about nutrients and the importance of balanced meals, students can make informed choices about what they eat, leading to a lifetime of good health.
                
                ### **1.6 Making Informed Food Choices**
                
                As we grow older, we begin to make our own choices about what we eat. Learning to make informed food choices is a skill that will benefit us for life.
                
                ### **Reading Food Labels**
                
                - **Ingredients List**: Shows what the food is made from, helping us to avoid things we may be allergic to or do not wish to consume.
                - **Nutrition Facts**: Tells us how much energy (calories) and nutrients are in the food.
                
                ### **Conclusion: Nourishing Our Future**
                
                Our relationship with food is lifelong. By learning about the nutrients in our food, the importance of a balanced diet, and safe food practices, we nourish not just our bodies but also our futures.
                
                ### **1.4 The Role of Fiber and Water in Diet**
                
                Fiber and water, though not providing nutrients, play a critical role in maintaining health, particularly in the digestive system.
                
                ### **Hydration and Health**
                
                - **Water**: Making up about 60-70% of the human body, water is indispensable for life. It is involved in nearly every bodily function, including regulating body temperature, carrying nutrients and oxygen to cells, and cushioning joints. Children should drink plenty of water throughout the day to stay hydrated, especially during physical activity and in hot weather.
                - **Fiber**: While it doesn't provide nutrients or energy, fiber is essential for a healthy digestive system. High-fiber foods, like fruits, vegetables, legumes, and whole grains, help in forming the bulk of the stool, making it easier to pass and reducing the risk of constipation. Fiber also plays a role in regulating blood sugar levels and maintaining a healthy weight.
                
                ### **Benefits of Fiber-Rich Foods**
                
                - **Appetite Control**: High-fiber foods are more filling, which helps prevent overeating.
                - **Blood Sugar Regulation**: Fiber slows down the absorption of sugar, helping to maintain stable blood glucose levels.
                - **Heart Health**: Certain types of fiber can help lower blood cholesterol levels.
                
                ### **1.5 Food Safety and Hygiene**
                
                Proper food safety and hygiene practices are crucial to prevent foodborne illnesses, which can be particularly harmful to children.
                
                ### **Safe Food Handling Practices**
                
                - **Washing Hands and Surfaces**: Keeping hands, utensils, and surfaces clean is the first defense against bacteria and other pathogens. Always wash hands with soap and water for at least 20 seconds before and after handling food.
                - **Storing Food Properly**: Different foods require different storage methods. Refrigerate perishable foods within two hours, and keep the refrigerator at the right temperature to slow the growth of bacteria.
                - **Cooking Thoroughly**: Cooking food to the right temperature is essential to kill harmful bacteria. Using a food thermometer is the best way to ensure food is cooked safely.
                
                ### **Avoiding Cross-Contamination**
                
                - **Separate Raw and Cooked Foods**: Always use separate cutting boards and utensils for raw meat and ready-to-eat foods to prevent cross-contamination.
                - **Handling Fruits and Vegetables**: Wash fruits and vegetables under running water before eating, cutting, or cooking them, even if you plan to peel them.
                
                ### **1.6 Understanding Food Labels**
                
                Being able to understand food labels is crucial in making informed choices about what to eat. These labels provide valuable information about the nutritional content of foods and can help guide healthier eating habits.
                
                ### **Decoding Food Labels**
                
                Food labels can seem complex at first, but they provide essential information that can help you make healthier choices.
                
                - **Ingredients List**: This part of the label gives you a snapshot of what's inside the food package. Ingredients are listed in order of quantity, from highest to lowest. This can help you identify the main ingredients in the product and also spot any ingredients you might want to avoid.
                - **Nutrition Information Panel**: This section provides detailed information about the nutritional value of the food, including:
                    - **Caloric Content**: Indicates how much energy (in calories or kilojoules) the food provides, helping in managing energy intake.
                    - **Fats, Proteins, and Carbohydrates**: Shows the amount of these macronutrients, which are crucial for understanding the food's impact on your diet.
                    - **Sugars and Sodium**: Keep an eye on these, especially if you're monitoring your sugar intake or trying to reduce salt for blood pressure management.
                    - **Dietary Fiber**: Important for digestive health, this information can help you ensure you’re getting enough fiber in your diet.
                
                ### **Checking for Allergens**
                
                - **Allergen Information**: This is particularly important for individuals with food allergies or intolerances. Common allergens like nuts, dairy, eggs, soy, wheat (gluten), and shellfish must be clearly indicated on food labels in many countries.
                - **Identifying Hidden Allergens**: Sometimes, allergens can be hidden in ingredients like flavorings, emulsifiers, or stabilizers. Learning to identify these through the ingredients list is crucial for those with allergies.
                
                ### **Understanding Health Claims**
                
                - **Health Claims on Labels**: Sometimes, food packages have claims like "low fat," "high in fiber," or "contains omega-3." It's important to understand these claims and check the nutrition information panel to see if the food fits into your overall dietary plan.
                - **Marketing vs. Nutrition**: Be aware that some health claims are more about marketing. For example, a product labeled as "fat-free" might still be high in sugar and calories.
                
                ### **Use-By and Best-Before Dates**
                
                - **Use-By Date**: Indicates the date by which the product should be consumed for health and safety reasons.
                - **Best-Before Date**: Suggests when the product is at its best quality. It can often be consumed after this date, but the quality may not be optimal.
                
                ### **Conclusion: Empowered Eating**
                
                Understanding food labels is a powerful tool for making healthier eating choices. It enables students to be more aware of what they're consuming, helps in managing dietary needs, and empowers them to make decisions that can positively impact their health.
                
                ### **Conclusion: Nourishing Knowledge for Healthy Choices**
                
                As we conclude this detailed exploration into the fascinating world of food and nutrition, it's clear that what we eat profoundly affects our health, growth, and overall well-being. Throughout this lesson, we've journeyed through the diverse culinary landscape of India, understanding how regional foods reflect the rich tapestry of culture, climate, and tradition. We've delved deep into the realm of nutrients, learning how each plays a unique and essential role in our bodies.
                
                Our investigation into macronutrients and micronutrients revealed the intricate balance of components our bodies need. We discovered how carbohydrates, proteins, and fats fuel our daily activities, while vitamins and minerals keep our systems functioning smoothly. We also uncovered the often-overlooked heroes of our diet – fiber and water – and their critical roles in maintaining our digestive health and overall hydration.
                
                The science of eating well, particularly for growing bodies like yours, is an art and a science. We learned how balanced meals contribute to our physical and mental development and how the right mix of nutrients can boost our energy, concentration, and even our mood. The importance of breakfast, the energy sustenance from lunch, and the lighter, nurturing dinners each play a part in our daily health story.
                
                Food safety and hygiene emerged as key players in our food journey. We learned that the way we handle, store, and prepare food is just as important as what we eat. Understanding food labels became our tool for making informed choices, enabling us to navigate the world of packaged foods with knowledge and confidence.
                
                But beyond the nutrients, safety practices, and dietary guidelines, there's a broader message to embrace. Food is more than just sustenance; it's a language of love, a medium of culture, a bridge to understanding our heritage, and a means to connect with others. It's about the joy of sharing meals, the traditions passed down through generations, and the new ones we create.
                
                As you continue on your journey, remember that eating well is a form of self-respect. It's about making choices that respect your body and its needs, choices that celebrate the diversity of foods available to us, and choices that are mindful of their impact on our environment. This knowledge empowers you to make decisions that can shape a healthier, more vibrant life, not just for yourself, but for your community and the world.
                
                In essence, this lesson is more than just about food and nutrients; it's about nurturing a relationship with food that is healthy, informed, and joyful. Carry this knowledge forward, and let it guide you towards a life of health, vitality, and delight in the rich flavors that the world has to offer.
                
                ----

                This is for 6th grade students. This is the actual lesson material for students to study. Now, this is the prompt received from the student - "${query}"

                Based on the student's prompt, tailor the content (add/remove) into 3 or 4 smaller sections and help the student learn it.

                Send me back the contents with each sections numbered, having a heading and a very small one line description and then the main content follows.

                The response should be in JSON format. Response should be SRTICTLY UNDER 15000 Characters.

                Follow the below template STRICTLY.

                {"1. Introduction to Food Labels": {
                  Description: "Understanding the basic information about food labels",
                  Content:
                    "Food labels provide vital information about the nutritional content of foods and can aid in developing healthier eating habits....",
                },
                "2. Components of a Food Label": {
                  Description:
                    "Decoding the different parts of a food label - Ingredients List and Nutrition Information Panel",
                  Content:
                    "A food label consists of two main parts...",
                }}

                "`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
        }
      );
      console.log("Response from OpenAI: ", response);
      console.log(
        "Response from OpenAI: ",
        response.data.choices[0].message.content
      );
      // converted to JSON
      console.log(
        "Parsed Response from OpenAI: ",
        JSON.parse(response.data.choices[0].message.content)
      );
      return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.log("Error from OpenAI: ", error);
      return false;
    }
  };

  const chatWithOpenAI = async (query) => {
    console.log("Chatting with OpenAI with Query: ", query);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          // model: "gpt-4",
          // response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a chatbot assistant helping 6th grade students to learn lessons and topics by answering the questions they ask.",
            },
            {
              role: "user",
              content: `"# **Detailed Lesson Material for Class 6: Exploring the World of Food and Nutrition**

                ## **Introduction to Food and Its Significance**
                
                Food is more than just a source of pleasure and a means to satisfy hunger. It is a vital part of our culture, celebrations, and daily routine. It brings families together and is an integral part of festivals and traditions across India and the world.
                
                ### **1.1 Exploring Nutritional Varieties**
                
                The vast land of India offers an incredible diversity of foods, shaped by its varied geography, climate, and cultures. Each region has its unique culinary identity, with distinct flavors and ingredients.
                
                ### **Culinary Diversity Across India**
                
                - **Northern India**: The cuisine here is heavily influenced by the agricultural lifestyle, where wheat is a staple crop. Dishes like roti, paratha, and naan are common. The region is also known for its rich, creamy gravies, tandoori cooking, and the extensive use of dairy, especially in Punjab, where paneer (cottage cheese) and ghee (clarified butter) are dietary staples. The Mughlai cuisine, with its roots in the Mughal empire, offers a range of biryanis, kebabs, and rich curries.
                - **Southern India**: The warm coastal climate here favors rice cultivation, making it a staple food. South Indian cuisine is characterized by its use of rice in various forms like idli (steamed rice cakes), dosa (rice pancakes), and uttapam (thick rice pancakes). Coconut, curry leaves, tamarind, and a variety of spices are widely used, giving the dishes a distinctive flavor. States like Kerala and Tamil Nadu are also known for their seafood specialties.
                - **Eastern India**: This region, particularly West Bengal and Odisha, is famous for its love of fish and rice. The cuisine often involves cooking in mustard oil, which adds a unique taste and aroma to the dishes. Sweets made from milk, such as rasgulla and sandesh, are a significant part of the food culture here. The use of Panch Phoron, a mix of five spices, is a hallmark of Bengali cuisine.
                - **Western India**: This region includes the states of Gujarat, Maharashtra, and Goa, each with its unique culinary style. Gujarati cuisine is known for its slightly sweet, vegetarian dishes, while Maharashtrian cuisine offers a range of spicy and mildly sweet dishes, often using peanuts and besan (gram flour). Goan cuisine stands out for its Portuguese influence, with dishes like vindaloo and Goan fish curry.
                - **Central India**: This area, including states like Madhya Pradesh, has a cuisine that is a blend of North and South Indian flavors. Wheat, millets, and rice are staple grains. The region is known for its variety of snacks and street foods, like poha (flattened rice dish) and bhutte ka kees (grated corn snack).
                - **Northeastern India**: The Northeastern states have a distinct culinary tradition that emphasizes organic and fermented foods. Staple ingredients include rice, fish, and leafy greens. The use of bamboo shoot, bhut jolokia (one of the hottest chillies), and local herbs gives their dishes a unique flavor profile. The simplicity and healthiness of the cuisine stand out, with minimal use of oil and spices.
                
                ### **Conclusion: A Melting Pot of Flavors**
                
                India’s culinary diversity is a reflection of its rich cultural tapestry. Exploring the foods from different regions not only tantalizes the taste buds but also provides insights into the history, culture, and lifestyle of the people living in these regions. For a young student, understanding this diversity can foster an appreciation for the country's rich heritage and the role of food in cultural identity.
                
                ### **1.2 Nutrients: The Building Blocks of Food**
                
                Nutrients are the compounds in foods that are essential to life and health, providing us with energy, the building blocks for repair and growth, and substances necessary to regulate chemical processes.
                
                ### **Understanding Macronutrients**
                
                - **Carbohydrates**: These are the primary source of energy for the body. Complex carbohydrates like whole grains, fruits, and vegetables also provide fiber, which aids in digestion.
                - **Proteins**: Necessary for the growth, repair, and maintenance of tissues. Proteins are made up of amino acids, some of which are essential and must be obtained from food.
                - **Fats**: Essential for brain health, energy, absorption of certain vitamins, and for protecting and insulating our bodies. Fats can be saturated or unsaturated, with a focus on healthier unsaturated fats found in fish, nuts, and certain oils.
                
                ### **Micronutrients: Small but Mighty**
                
                - **Vitamins**: Organic compounds that are necessary in small quantities for healthy growth and metabolism. Each vitamin has specific roles, such as Vitamin D for bone health and Vitamin C for immune function.
                - **Minerals**: These are inorganic elements that play a crucial role in various bodily functions. Calcium is essential for bones and teeth, iron is needed for transporting oxygen in the blood, and potassium helps in nerve and muscle function.
                
                ### **1.3 The Science of Eating Well**
                
                Eating well is about more than just satisfying hunger. It's about feeding the body the right nutrients in the right amounts.
                
                ### **Balanced Meals for Growing Bodies**
                
                - **Breakfast**: Should ideally include sources of complex carbohydrates and proteins, like whole-grain cereals with milk or yogurt, to kickstart the body's metabolism.
                - **Lunch**: A vital meal to refuel the body in the middle of the day. A balance of lean proteins, whole grains, and abundant vegetables provides sustained energy and nutrients.
                - **Dinner**: This meal should be lighter but still balanced, with an emphasis on protein, fiber-rich vegetables, and a small portion of whole grains to support overnight tissue repair and growth.
                
                ### **Snacks**: Healthy snacks are important for children to maintain energy levels. Options like fruits, nuts, and yogurt can provide essential nutrients between meals.
                
                ### **1.4 Importance of Hydration and Meal Timing**
                
                - **Hydration**: Water is crucial for every cell in the body. It aids in digestion, nutrient absorption, and waste elimination.
                - **Meal Timing**: Regular meal times help regulate the body's clock, metabolism, and energy levels. It's important not to skip meals, as this can lead to overeating later.
                
                ### **1.5 Food Choices and Physical Activity**
                
                - **Physical Activity**: The level of physical activity can dictate dietary needs. More active children may need more calories and protein.
                - **Making Smart Food Choices**: Understanding the value of nutrient-dense foods over calorie-dense foods with little nutritional value is key to making smart food choices.
                
                ### **Conclusion: Nourishing the Future**
                
                Good nutrition is fundamental to the well-being and healthy development of children. By learning about nutrients and the importance of balanced meals, students can make informed choices about what they eat, leading to a lifetime of good health.
                
                ### **1.6 Making Informed Food Choices**
                
                As we grow older, we begin to make our own choices about what we eat. Learning to make informed food choices is a skill that will benefit us for life.
                
                ### **Reading Food Labels**
                
                - **Ingredients List**: Shows what the food is made from, helping us to avoid things we may be allergic to or do not wish to consume.
                - **Nutrition Facts**: Tells us how much energy (calories) and nutrients are in the food.
                
                ### **Conclusion: Nourishing Our Future**
                
                Our relationship with food is lifelong. By learning about the nutrients in our food, the importance of a balanced diet, and safe food practices, we nourish not just our bodies but also our futures.
                
                ### **1.4 The Role of Fiber and Water in Diet**
                
                Fiber and water, though not providing nutrients, play a critical role in maintaining health, particularly in the digestive system.
                
                ### **Hydration and Health**
                
                - **Water**: Making up about 60-70% of the human body, water is indispensable for life. It is involved in nearly every bodily function, including regulating body temperature, carrying nutrients and oxygen to cells, and cushioning joints. Children should drink plenty of water throughout the day to stay hydrated, especially during physical activity and in hot weather.
                - **Fiber**: While it doesn't provide nutrients or energy, fiber is essential for a healthy digestive system. High-fiber foods, like fruits, vegetables, legumes, and whole grains, help in forming the bulk of the stool, making it easier to pass and reducing the risk of constipation. Fiber also plays a role in regulating blood sugar levels and maintaining a healthy weight.
                
                ### **Benefits of Fiber-Rich Foods**
                
                - **Appetite Control**: High-fiber foods are more filling, which helps prevent overeating.
                - **Blood Sugar Regulation**: Fiber slows down the absorption of sugar, helping to maintain stable blood glucose levels.
                - **Heart Health**: Certain types of fiber can help lower blood cholesterol levels.
                
                ### **1.5 Food Safety and Hygiene**
                
                Proper food safety and hygiene practices are crucial to prevent foodborne illnesses, which can be particularly harmful to children.
                
                ### **Safe Food Handling Practices**
                
                - **Washing Hands and Surfaces**: Keeping hands, utensils, and surfaces clean is the first defense against bacteria and other pathogens. Always wash hands with soap and water for at least 20 seconds before and after handling food.
                - **Storing Food Properly**: Different foods require different storage methods. Refrigerate perishable foods within two hours, and keep the refrigerator at the right temperature to slow the growth of bacteria.
                - **Cooking Thoroughly**: Cooking food to the right temperature is essential to kill harmful bacteria. Using a food thermometer is the best way to ensure food is cooked safely.
                
                ### **Avoiding Cross-Contamination**
                
                - **Separate Raw and Cooked Foods**: Always use separate cutting boards and utensils for raw meat and ready-to-eat foods to prevent cross-contamination.
                - **Handling Fruits and Vegetables**: Wash fruits and vegetables under running water before eating, cutting, or cooking them, even if you plan to peel them.
                
                ### **1.6 Understanding Food Labels**
                
                Being able to understand food labels is crucial in making informed choices about what to eat. These labels provide valuable information about the nutritional content of foods and can help guide healthier eating habits.
                
                ### **Decoding Food Labels**
                
                Food labels can seem complex at first, but they provide essential information that can help you make healthier choices.
                
                - **Ingredients List**: This part of the label gives you a snapshot of what's inside the food package. Ingredients are listed in order of quantity, from highest to lowest. This can help you identify the main ingredients in the product and also spot any ingredients you might want to avoid.
                - **Nutrition Information Panel**: This section provides detailed information about the nutritional value of the food, including:
                    - **Caloric Content**: Indicates how much energy (in calories or kilojoules) the food provides, helping in managing energy intake.
                    - **Fats, Proteins, and Carbohydrates**: Shows the amount of these macronutrients, which are crucial for understanding the food's impact on your diet.
                    - **Sugars and Sodium**: Keep an eye on these, especially if you're monitoring your sugar intake or trying to reduce salt for blood pressure management.
                    - **Dietary Fiber**: Important for digestive health, this information can help you ensure you’re getting enough fiber in your diet.
                
                ### **Checking for Allergens**
                
                - **Allergen Information**: This is particularly important for individuals with food allergies or intolerances. Common allergens like nuts, dairy, eggs, soy, wheat (gluten), and shellfish must be clearly indicated on food labels in many countries.
                - **Identifying Hidden Allergens**: Sometimes, allergens can be hidden in ingredients like flavorings, emulsifiers, or stabilizers. Learning to identify these through the ingredients list is crucial for those with allergies.
                
                ### **Understanding Health Claims**
                
                - **Health Claims on Labels**: Sometimes, food packages have claims like "low fat," "high in fiber," or "contains omega-3." It's important to understand these claims and check the nutrition information panel to see if the food fits into your overall dietary plan.
                - **Marketing vs. Nutrition**: Be aware that some health claims are more about marketing. For example, a product labeled as "fat-free" might still be high in sugar and calories.
                
                ### **Use-By and Best-Before Dates**
                
                - **Use-By Date**: Indicates the date by which the product should be consumed for health and safety reasons.
                - **Best-Before Date**: Suggests when the product is at its best quality. It can often be consumed after this date, but the quality may not be optimal.
                
                ### **Conclusion: Empowered Eating**
                
                Understanding food labels is a powerful tool for making healthier eating choices. It enables students to be more aware of what they're consuming, helps in managing dietary needs, and empowers them to make decisions that can positively impact their health.
                
                ### **Conclusion: Nourishing Knowledge for Healthy Choices**
                
                As we conclude this detailed exploration into the fascinating world of food and nutrition, it's clear that what we eat profoundly affects our health, growth, and overall well-being. Throughout this lesson, we've journeyed through the diverse culinary landscape of India, understanding how regional foods reflect the rich tapestry of culture, climate, and tradition. We've delved deep into the realm of nutrients, learning how each plays a unique and essential role in our bodies.
                
                Our investigation into macronutrients and micronutrients revealed the intricate balance of components our bodies need. We discovered how carbohydrates, proteins, and fats fuel our daily activities, while vitamins and minerals keep our systems functioning smoothly. We also uncovered the often-overlooked heroes of our diet – fiber and water – and their critical roles in maintaining our digestive health and overall hydration.
                
                The science of eating well, particularly for growing bodies like yours, is an art and a science. We learned how balanced meals contribute to our physical and mental development and how the right mix of nutrients can boost our energy, concentration, and even our mood. The importance of breakfast, the energy sustenance from lunch, and the lighter, nurturing dinners each play a part in our daily health story.
                
                Food safety and hygiene emerged as key players in our food journey. We learned that the way we handle, store, and prepare food is just as important as what we eat. Understanding food labels became our tool for making informed choices, enabling us to navigate the world of packaged foods with knowledge and confidence.
                
                But beyond the nutrients, safety practices, and dietary guidelines, there's a broader message to embrace. Food is more than just sustenance; it's a language of love, a medium of culture, a bridge to understanding our heritage, and a means to connect with others. It's about the joy of sharing meals, the traditions passed down through generations, and the new ones we create.
                
                As you continue on your journey, remember that eating well is a form of self-respect. It's about making choices that respect your body and its needs, choices that celebrate the diversity of foods available to us, and choices that are mindful of their impact on our environment. This knowledge empowers you to make decisions that can shape a healthier, more vibrant life, not just for yourself, but for your community and the world.
                
                In essence, this lesson is more than just about food and nutrients; it's about nurturing a relationship with food that is healthy, informed, and joyful. Carry this knowledge forward, and let it guide you towards a life of health, vitality, and delight in the rich flavors that the world has to offer.
                
                ----

                This is for 6th grade students. This is the actual lesson material for students to study. Now, this is the chat question prompt received from the student - "${query}"

                Based on the student's question, answer the question with context mainly around the above lesson material.

                The response should be in JSON format. Response should be SRTICTLY short and precise.

                Follow the below template STRICTLY.

                {
                  "role": "ai",
                  "text":"your reply here"
                }

                "`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
        }
      );
      console.log("Response from OpenAI: ", response);
      console.log(
        "Response from OpenAI: ",
        response.data.choices[0].message.content
      );
      // converted to JSON
      console.log(
        "Parsed Response from OpenAI: ",
        JSON.parse(response.data.choices[0].message.content)
      );
      return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.log("Error from OpenAI: ", error);
      return false;
    }
  };

  const generateCertificate = async (cName, repChange) => {
    console.log("Generating Certificate...", cName, repChange);
    try {
      const wallet = new ethers.Wallet(ownPk, provider);
      const contract = new ethers.Contract(
        studentContractAddress,
        studentAbi,
        wallet
      );
      const tx = await contract.generateCertificate(
        // certData.address,
        "0xF1aEBCa6965964974eEa75354AF8c178bFcbDA7D",
        // certData.tokenId,
        0,
        cName,
        repChange
      );
      await tx.wait();
      console.log("Transaction successful:", tx);

      let totRep = 0;
      for (let i = 0; i < appState.certData.length; i++) {
        let repData = appState.certData[i].repChange;
        repData = repData.slice(1);
        repData = parseFloat(repData);
        totRep += repData;
      }

      repChange = repChange.slice(1);
      repChange = parseFloat(repChange);
      totRep += repChange;

      console.log("Total Reputation: ", totRep);

      const tx2 = await contract.updateStudentCS(
        "0xF1aEBCa6965964974eEa75354AF8c178bFcbDA7D",
        0,
        totRep.toString()
      );
      await tx2.wait();
      console.log("Transaction successful:", tx2);

      setAppState((prevState) => {
        return {
          ...prevState,
          studentData: {
            ...prevState.studentData,
            carsScore: totRep.toString(),
          },
        };
      });

      return true;
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error generating certificate!");
      return false;
    }
  };

  const getStudentData = async () => {
    console.log("Getting Student Data...");
    try {
      const wallet = new ethers.Wallet(ownPk, provider);
      const contract = new ethers.Contract(
        studentContractAddress,
        studentAbi,
        wallet
      );
      const data = await contract.getStudentProfileByCount(0);
      console.log("Student Data: ", data, Object.keys(data));
      console.log("Student Token ID: ", data, data.tokenId);
      setAppState((prevState) => {
        return {
          ...prevState,
          studentData: data,
        };
      });
      const certCount = await contract.getCertCount();
      console.log("Cert Count: ", certCount);

      let cArray = [];

      for (let i = 0; i < certCount; i++) {
        const cert = await contract.getCertificateByCount(i);
        cArray.push(cert);
        console.log("Certificate: ", cert.repChange);
      }

      setAppState((prevState) => {
        return {
          ...prevState,
          certData: cArray,
        };
      });

      return data;
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  const generateQuestionPapers = async (difficulty) => {
    try {
      console.log("Generating Question Papers with difficulty...", difficulty);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo",
          model: "gpt-4",
          // response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a question paper creating assistant helping teachers to generate question papers for students based on the difficulty level.",
            },
            {
              role: "user",
              content: `"# **Detailed Lesson Material for Class 6: Exploring the World of Food and Nutrition**

                ## **Introduction to Food and Its Significance**
                
                Food is more than just a source of pleasure and a means to satisfy hunger. It is a vital part of our culture, celebrations, and daily routine. It brings families together and is an integral part of festivals and traditions across India and the world.
                
                ### **1.1 Exploring Nutritional Varieties**
                
                The vast land of India offers an incredible diversity of foods, shaped by its varied geography, climate, and cultures. Each region has its unique culinary identity, with distinct flavors and ingredients.
                
                ### **Culinary Diversity Across India**
                
                - **Northern India**: The cuisine here is heavily influenced by the agricultural lifestyle, where wheat is a staple crop. Dishes like roti, paratha, and naan are common. The region is also known for its rich, creamy gravies, tandoori cooking, and the extensive use of dairy, especially in Punjab, where paneer (cottage cheese) and ghee (clarified butter) are dietary staples. The Mughlai cuisine, with its roots in the Mughal empire, offers a range of biryanis, kebabs, and rich curries.
                - **Southern India**: The warm coastal climate here favors rice cultivation, making it a staple food. South Indian cuisine is characterized by its use of rice in various forms like idli (steamed rice cakes), dosa (rice pancakes), and uttapam (thick rice pancakes). Coconut, curry leaves, tamarind, and a variety of spices are widely used, giving the dishes a distinctive flavor. States like Kerala and Tamil Nadu are also known for their seafood specialties.
                - **Eastern India**: This region, particularly West Bengal and Odisha, is famous for its love of fish and rice. The cuisine often involves cooking in mustard oil, which adds a unique taste and aroma to the dishes. Sweets made from milk, such as rasgulla and sandesh, are a significant part of the food culture here. The use of Panch Phoron, a mix of five spices, is a hallmark of Bengali cuisine.
                - **Western India**: This region includes the states of Gujarat, Maharashtra, and Goa, each with its unique culinary style. Gujarati cuisine is known for its slightly sweet, vegetarian dishes, while Maharashtrian cuisine offers a range of spicy and mildly sweet dishes, often using peanuts and besan (gram flour). Goan cuisine stands out for its Portuguese influence, with dishes like vindaloo and Goan fish curry.
                - **Central India**: This area, including states like Madhya Pradesh, has a cuisine that is a blend of North and South Indian flavors. Wheat, millets, and rice are staple grains. The region is known for its variety of snacks and street foods, like poha (flattened rice dish) and bhutte ka kees (grated corn snack).
                - **Northeastern India**: The Northeastern states have a distinct culinary tradition that emphasizes organic and fermented foods. Staple ingredients include rice, fish, and leafy greens. The use of bamboo shoot, bhut jolokia (one of the hottest chillies), and local herbs gives their dishes a unique flavor profile. The simplicity and healthiness of the cuisine stand out, with minimal use of oil and spices.
                
                ### **Conclusion: A Melting Pot of Flavors**
                
                India’s culinary diversity is a reflection of its rich cultural tapestry. Exploring the foods from different regions not only tantalizes the taste buds but also provides insights into the history, culture, and lifestyle of the people living in these regions. For a young student, understanding this diversity can foster an appreciation for the country's rich heritage and the role of food in cultural identity.
                
                ### **1.2 Nutrients: The Building Blocks of Food**
                
                Nutrients are the compounds in foods that are essential to life and health, providing us with energy, the building blocks for repair and growth, and substances necessary to regulate chemical processes.
                
                ### **Understanding Macronutrients**
                
                - **Carbohydrates**: These are the primary source of energy for the body. Complex carbohydrates like whole grains, fruits, and vegetables also provide fiber, which aids in digestion.
                - **Proteins**: Necessary for the growth, repair, and maintenance of tissues. Proteins are made up of amino acids, some of which are essential and must be obtained from food.
                - **Fats**: Essential for brain health, energy, absorption of certain vitamins, and for protecting and insulating our bodies. Fats can be saturated or unsaturated, with a focus on healthier unsaturated fats found in fish, nuts, and certain oils.
                
                ### **Micronutrients: Small but Mighty**
                
                - **Vitamins**: Organic compounds that are necessary in small quantities for healthy growth and metabolism. Each vitamin has specific roles, such as Vitamin D for bone health and Vitamin C for immune function.
                - **Minerals**: These are inorganic elements that play a crucial role in various bodily functions. Calcium is essential for bones and teeth, iron is needed for transporting oxygen in the blood, and potassium helps in nerve and muscle function.
                
                ### **1.3 The Science of Eating Well**
                
                Eating well is about more than just satisfying hunger. It's about feeding the body the right nutrients in the right amounts.
                
                ### **Balanced Meals for Growing Bodies**
                
                - **Breakfast**: Should ideally include sources of complex carbohydrates and proteins, like whole-grain cereals with milk or yogurt, to kickstart the body's metabolism.
                - **Lunch**: A vital meal to refuel the body in the middle of the day. A balance of lean proteins, whole grains, and abundant vegetables provides sustained energy and nutrients.
                - **Dinner**: This meal should be lighter but still balanced, with an emphasis on protein, fiber-rich vegetables, and a small portion of whole grains to support overnight tissue repair and growth.
                
                ### **Snacks**: Healthy snacks are important for children to maintain energy levels. Options like fruits, nuts, and yogurt can provide essential nutrients between meals.
                
                ### **1.4 Importance of Hydration and Meal Timing**
                
                - **Hydration**: Water is crucial for every cell in the body. It aids in digestion, nutrient absorption, and waste elimination.
                - **Meal Timing**: Regular meal times help regulate the body's clock, metabolism, and energy levels. It's important not to skip meals, as this can lead to overeating later.
                
                ### **1.5 Food Choices and Physical Activity**
                
                - **Physical Activity**: The level of physical activity can dictate dietary needs. More active children may need more calories and protein.
                - **Making Smart Food Choices**: Understanding the value of nutrient-dense foods over calorie-dense foods with little nutritional value is key to making smart food choices.
                
                ### **Conclusion: Nourishing the Future**
                
                Good nutrition is fundamental to the well-being and healthy development of children. By learning about nutrients and the importance of balanced meals, students can make informed choices about what they eat, leading to a lifetime of good health.
                
                ### **1.6 Making Informed Food Choices**
                
                As we grow older, we begin to make our own choices about what we eat. Learning to make informed food choices is a skill that will benefit us for life.
                
                ### **Reading Food Labels**
                
                - **Ingredients List**: Shows what the food is made from, helping us to avoid things we may be allergic to or do not wish to consume.
                - **Nutrition Facts**: Tells us how much energy (calories) and nutrients are in the food.
                
                ### **Conclusion: Nourishing Our Future**
                
                Our relationship with food is lifelong. By learning about the nutrients in our food, the importance of a balanced diet, and safe food practices, we nourish not just our bodies but also our futures.
                
                ### **1.4 The Role of Fiber and Water in Diet**
                
                Fiber and water, though not providing nutrients, play a critical role in maintaining health, particularly in the digestive system.
                
                ### **Hydration and Health**
                
                - **Water**: Making up about 60-70% of the human body, water is indispensable for life. It is involved in nearly every bodily function, including regulating body temperature, carrying nutrients and oxygen to cells, and cushioning joints. Children should drink plenty of water throughout the day to stay hydrated, especially during physical activity and in hot weather.
                - **Fiber**: While it doesn't provide nutrients or energy, fiber is essential for a healthy digestive system. High-fiber foods, like fruits, vegetables, legumes, and whole grains, help in forming the bulk of the stool, making it easier to pass and reducing the risk of constipation. Fiber also plays a role in regulating blood sugar levels and maintaining a healthy weight.
                
                ### **Benefits of Fiber-Rich Foods**
                
                - **Appetite Control**: High-fiber foods are more filling, which helps prevent overeating.
                - **Blood Sugar Regulation**: Fiber slows down the absorption of sugar, helping to maintain stable blood glucose levels.
                - **Heart Health**: Certain types of fiber can help lower blood cholesterol levels.
                
                ### **1.5 Food Safety and Hygiene**
                
                Proper food safety and hygiene practices are crucial to prevent foodborne illnesses, which can be particularly harmful to children.
                
                ### **Safe Food Handling Practices**
                
                - **Washing Hands and Surfaces**: Keeping hands, utensils, and surfaces clean is the first defense against bacteria and other pathogens. Always wash hands with soap and water for at least 20 seconds before and after handling food.
                - **Storing Food Properly**: Different foods require different storage methods. Refrigerate perishable foods within two hours, and keep the refrigerator at the right temperature to slow the growth of bacteria.
                - **Cooking Thoroughly**: Cooking food to the right temperature is essential to kill harmful bacteria. Using a food thermometer is the best way to ensure food is cooked safely.
                
                ### **Avoiding Cross-Contamination**
                
                - **Separate Raw and Cooked Foods**: Always use separate cutting boards and utensils for raw meat and ready-to-eat foods to prevent cross-contamination.
                - **Handling Fruits and Vegetables**: Wash fruits and vegetables under running water before eating, cutting, or cooking them, even if you plan to peel them.
                
                ### **1.6 Understanding Food Labels**
                
                Being able to understand food labels is crucial in making informed choices about what to eat. These labels provide valuable information about the nutritional content of foods and can help guide healthier eating habits.
                
                ### **Decoding Food Labels**
                
                Food labels can seem complex at first, but they provide essential information that can help you make healthier choices.
                
                - **Ingredients List**: This part of the label gives you a snapshot of what's inside the food package. Ingredients are listed in order of quantity, from highest to lowest. This can help you identify the main ingredients in the product and also spot any ingredients you might want to avoid.
                - **Nutrition Information Panel**: This section provides detailed information about the nutritional value of the food, including:
                    - **Caloric Content**: Indicates how much energy (in calories or kilojoules) the food provides, helping in managing energy intake.
                    - **Fats, Proteins, and Carbohydrates**: Shows the amount of these macronutrients, which are crucial for understanding the food's impact on your diet.
                    - **Sugars and Sodium**: Keep an eye on these, especially if you're monitoring your sugar intake or trying to reduce salt for blood pressure management.
                    - **Dietary Fiber**: Important for digestive health, this information can help you ensure you’re getting enough fiber in your diet.
                
                ### **Checking for Allergens**
                
                - **Allergen Information**: This is particularly important for individuals with food allergies or intolerances. Common allergens like nuts, dairy, eggs, soy, wheat (gluten), and shellfish must be clearly indicated on food labels in many countries.
                - **Identifying Hidden Allergens**: Sometimes, allergens can be hidden in ingredients like flavorings, emulsifiers, or stabilizers. Learning to identify these through the ingredients list is crucial for those with allergies.
                
                ### **Understanding Health Claims**
                
                - **Health Claims on Labels**: Sometimes, food packages have claims like "low fat," "high in fiber," or "contains omega-3." It's important to understand these claims and check the nutrition information panel to see if the food fits into your overall dietary plan.
                - **Marketing vs. Nutrition**: Be aware that some health claims are more about marketing. For example, a product labeled as "fat-free" might still be high in sugar and calories.
                
                ### **Use-By and Best-Before Dates**
                
                - **Use-By Date**: Indicates the date by which the product should be consumed for health and safety reasons.
                - **Best-Before Date**: Suggests when the product is at its best quality. It can often be consumed after this date, but the quality may not be optimal.
                
                ### **Conclusion: Empowered Eating**
                
                Understanding food labels is a powerful tool for making healthier eating choices. It enables students to be more aware of what they're consuming, helps in managing dietary needs, and empowers them to make decisions that can positively impact their health.
                
                ### **Conclusion: Nourishing Knowledge for Healthy Choices**
                
                As we conclude this detailed exploration into the fascinating world of food and nutrition, it's clear that what we eat profoundly affects our health, growth, and overall well-being. Throughout this lesson, we've journeyed through the diverse culinary landscape of India, understanding how regional foods reflect the rich tapestry of culture, climate, and tradition. We've delved deep into the realm of nutrients, learning how each plays a unique and essential role in our bodies.
                
                Our investigation into macronutrients and micronutrients revealed the intricate balance of components our bodies need. We discovered how carbohydrates, proteins, and fats fuel our daily activities, while vitamins and minerals keep our systems functioning smoothly. We also uncovered the often-overlooked heroes of our diet – fiber and water – and their critical roles in maintaining our digestive health and overall hydration.
                
                The science of eating well, particularly for growing bodies like yours, is an art and a science. We learned how balanced meals contribute to our physical and mental development and how the right mix of nutrients can boost our energy, concentration, and even our mood. The importance of breakfast, the energy sustenance from lunch, and the lighter, nurturing dinners each play a part in our daily health story.
                
                Food safety and hygiene emerged as key players in our food journey. We learned that the way we handle, store, and prepare food is just as important as what we eat. Understanding food labels became our tool for making informed choices, enabling us to navigate the world of packaged foods with knowledge and confidence.
                
                But beyond the nutrients, safety practices, and dietary guidelines, there's a broader message to embrace. Food is more than just sustenance; it's a language of love, a medium of culture, a bridge to understanding our heritage, and a means to connect with others. It's about the joy of sharing meals, the traditions passed down through generations, and the new ones we create.
                
                As you continue on your journey, remember that eating well is a form of self-respect. It's about making choices that respect your body and its needs, choices that celebrate the diversity of foods available to us, and choices that are mindful of their impact on our environment. This knowledge empowers you to make decisions that can shape a healthier, more vibrant life, not just for yourself, but for your community and the world.
                
                In essence, this lesson is more than just about food and nutrients; it's about nurturing a relationship with food that is healthy, informed, and joyful. Carry this knowledge forward, and let it guide you towards a life of health, vitality, and delight in the rich flavors that the world has to offer.
                
                ----

                Based on the above lesson material, generate me a question paper. It should have a difficulty rating of ${difficulty} out of 10. Make sure the question paper adheres and it is sensitive to the difficulty level. 1 is very easy. 10 is very difficult. UNderstand the scale and frame the questions according to that. Difficulty in questions refers to the amount of thinking involves for a question and testing how good they have understood the concept. 

                So an easier Question should be straight forward and involves less thinking. But a difficult question should be indirect, involving more thinking and requires the candidate to understand the concept inside out.

                Below is the format. Follow the same format, so that I can use the delimiter to parse the question paper.

                I need 3 SMALL type questions only.
                I need 3 LONG type questions only.
                
                <QP_START_1_TYPE_SMALL>"question here"<QP_END_1_TYPE_SMALL>
                ..and so on..
                <QP_START_4_TYPE_LONG>"question here"<QP_END_4_TYPE_LONG>
                ...and so on...

                "`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
        }
      );
      console.log("Response from OpenAI: ", response);
      console.log(
        "Response from OpenAI: ",
        response.data.choices[0].message.content
      );

      let parsedQP = await qpParser(response.data.choices[0].message.content);
      console.log("Parsed Response: ", parsedQP);
      return parsedQP;
    } catch (error) {
      console.log("Error occured while generating question papers");
      return false;
    }
  };

  const qpParser = async (text) => {
    const questionPattern =
      /<QP_START_(\d+)_TYPE_(.*?)>(.*?)<QP_END_\1_TYPE_\2>/g;
    let match;
    const questions = [];

    while ((match = questionPattern.exec(text)) !== null) {
      const [, , type, questionText] = match;
      questions.push({
        id: parseInt(match[1], 10),
        type: type.toLowerCase(),
        text: questionText,
      });
    }

    return questions;
  };

  const shareNewMaterial = async (data, type) => {
    console.log("Sharing new material...", data, type);
    try {
      let material = {
        type: type,
        data: data,
      };
      const response = await axios.post(backendURL + "/add-new-material", {
        material: material,
      });
      console.log("Response from backend: ", response);
      if (response.data.status === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  const attemptNewMaterial = async (data, type) => {
    console.log("Attempting new material...", data, type);
    try {
      let material = {
        type: type,
        data: data,
      };
      const response = await axios.post(backendURL + "/attempt-new-material", {
        material: material,
      });
      console.log("Response from backend: ", response);
      if (response.data.status === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  const getAllMaterials = async () => {
    console.log("Getting all materials...");
    try {
      const response = await axios.get(backendURL + "/get-all-materials");
      console.log("All Materials from backend: ", response.data);
      if (response.data.status === true) {
        setAppState((prevState) => {
          return {
            ...prevState,
            sharedMaterials: response.data.data,
          };
        });
        return response.data.data;
      } else {
        return false;
      }
    } catch (error) {
      console.log("All Materials Error: ", error);
      return false;
    }
  };

  const getAllAttempts = async () => {
    console.log("Getting all materials...");
    try {
      const response = await axios.get(backendURL + "/get-all-attempts");
      console.log("All Attempts from backend: ", response.data);
      if (response.data.status === true) {
        setAppState((prevState) => {
          return {
            ...prevState,
            attempts: response.data.data,
          };
        });
        return response.data.data;
      } else {
        return false;
      }
    } catch (error) {
      console.log("All attempts Error: ", error);
      return false;
    }
  };

  const doTexttoSpeech = async (text) => {
    console.log("TTS with data: ", text);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/audio/speech",
        {
          model: "tts-1",
          input: text,
          voice: "alloy",
        },
        {
          headers: {
            Authorization: "Bearer " + OPENAI_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      console.log("TTS Response: ", response);
      const audioUrl = URL.createObjectURL(response.data);
      return audioUrl;
    } catch (error) {
      console.log("Err while TTS", error);
      return false;
    }
  };

  const changeLang = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const translateContentTo = async (content) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          // model: "gpt-4",
          // response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a chatbot assistant helping 6th grade students to learn lessons and topics by answering the questions they ask.",
            },
            {
              role: "user",
              content: `Translate the below piece of text to Hindi. Only return the translated content.

              Text to Translate: ${content}
              
              Below is the format:
              
              "translated_content"

              `,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
        }
      );
      console.log("Response from OpenAI: ", response);
      console.log(
        "Response from OpenAI: ",
        response.data.choices[0].message.content
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.log("err while Translate to", error);
      return false;
    }
  };

  const evaluationWithAI = async (QandA) => {
    try {
      console.log("Evaluating question and answer...", QandA);
      const turnQandAObjectToString = JSON.stringify(QandA);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo",
          model: "gpt-4",
          // response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a question paper creating assistant helping teachers to generate question papers for students based on the difficulty level.",
            },
            {
              role: "user",
              content: `"# **Detailed Lesson Material for Class 6: Exploring the World of Food and Nutrition**

                ## **Introduction to Food and Its Significance**
                
                Food is more than just a source of pleasure and a means to satisfy hunger. It is a vital part of our culture, celebrations, and daily routine. It brings families together and is an integral part of festivals and traditions across India and the world.
                
                ### **1.1 Exploring Nutritional Varieties**
                
                The vast land of India offers an incredible diversity of foods, shaped by its varied geography, climate, and cultures. Each region has its unique culinary identity, with distinct flavors and ingredients.
                
                ### **Culinary Diversity Across India**
                
                - **Northern India**: The cuisine here is heavily influenced by the agricultural lifestyle, where wheat is a staple crop. Dishes like roti, paratha, and naan are common. The region is also known for its rich, creamy gravies, tandoori cooking, and the extensive use of dairy, especially in Punjab, where paneer (cottage cheese) and ghee (clarified butter) are dietary staples. The Mughlai cuisine, with its roots in the Mughal empire, offers a range of biryanis, kebabs, and rich curries.
                - **Southern India**: The warm coastal climate here favors rice cultivation, making it a staple food. South Indian cuisine is characterized by its use of rice in various forms like idli (steamed rice cakes), dosa (rice pancakes), and uttapam (thick rice pancakes). Coconut, curry leaves, tamarind, and a variety of spices are widely used, giving the dishes a distinctive flavor. States like Kerala and Tamil Nadu are also known for their seafood specialties.
                - **Eastern India**: This region, particularly West Bengal and Odisha, is famous for its love of fish and rice. The cuisine often involves cooking in mustard oil, which adds a unique taste and aroma to the dishes. Sweets made from milk, such as rasgulla and sandesh, are a significant part of the food culture here. The use of Panch Phoron, a mix of five spices, is a hallmark of Bengali cuisine.
                - **Western India**: This region includes the states of Gujarat, Maharashtra, and Goa, each with its unique culinary style. Gujarati cuisine is known for its slightly sweet, vegetarian dishes, while Maharashtrian cuisine offers a range of spicy and mildly sweet dishes, often using peanuts and besan (gram flour). Goan cuisine stands out for its Portuguese influence, with dishes like vindaloo and Goan fish curry.
                - **Central India**: This area, including states like Madhya Pradesh, has a cuisine that is a blend of North and South Indian flavors. Wheat, millets, and rice are staple grains. The region is known for its variety of snacks and street foods, like poha (flattened rice dish) and bhutte ka kees (grated corn snack).
                - **Northeastern India**: The Northeastern states have a distinct culinary tradition that emphasizes organic and fermented foods. Staple ingredients include rice, fish, and leafy greens. The use of bamboo shoot, bhut jolokia (one of the hottest chillies), and local herbs gives their dishes a unique flavor profile. The simplicity and healthiness of the cuisine stand out, with minimal use of oil and spices.
                
                ### **Conclusion: A Melting Pot of Flavors**
                
                India’s culinary diversity is a reflection of its rich cultural tapestry. Exploring the foods from different regions not only tantalizes the taste buds but also provides insights into the history, culture, and lifestyle of the people living in these regions. For a young student, understanding this diversity can foster an appreciation for the country's rich heritage and the role of food in cultural identity.
                
                ### **1.2 Nutrients: The Building Blocks of Food**
                
                Nutrients are the compounds in foods that are essential to life and health, providing us with energy, the building blocks for repair and growth, and substances necessary to regulate chemical processes.
                
                ### **Understanding Macronutrients**
                
                - **Carbohydrates**: These are the primary source of energy for the body. Complex carbohydrates like whole grains, fruits, and vegetables also provide fiber, which aids in digestion.
                - **Proteins**: Necessary for the growth, repair, and maintenance of tissues. Proteins are made up of amino acids, some of which are essential and must be obtained from food.
                - **Fats**: Essential for brain health, energy, absorption of certain vitamins, and for protecting and insulating our bodies. Fats can be saturated or unsaturated, with a focus on healthier unsaturated fats found in fish, nuts, and certain oils.
                
                ### **Micronutrients: Small but Mighty**
                
                - **Vitamins**: Organic compounds that are necessary in small quantities for healthy growth and metabolism. Each vitamin has specific roles, such as Vitamin D for bone health and Vitamin C for immune function.
                - **Minerals**: These are inorganic elements that play a crucial role in various bodily functions. Calcium is essential for bones and teeth, iron is needed for transporting oxygen in the blood, and potassium helps in nerve and muscle function.
                
                ### **1.3 The Science of Eating Well**
                
                Eating well is about more than just satisfying hunger. It's about feeding the body the right nutrients in the right amounts.
                
                ### **Balanced Meals for Growing Bodies**
                
                - **Breakfast**: Should ideally include sources of complex carbohydrates and proteins, like whole-grain cereals with milk or yogurt, to kickstart the body's metabolism.
                - **Lunch**: A vital meal to refuel the body in the middle of the day. A balance of lean proteins, whole grains, and abundant vegetables provides sustained energy and nutrients.
                - **Dinner**: This meal should be lighter but still balanced, with an emphasis on protein, fiber-rich vegetables, and a small portion of whole grains to support overnight tissue repair and growth.
                
                ### **Snacks**: Healthy snacks are important for children to maintain energy levels. Options like fruits, nuts, and yogurt can provide essential nutrients between meals.
                
                ### **1.4 Importance of Hydration and Meal Timing**
                
                - **Hydration**: Water is crucial for every cell in the body. It aids in digestion, nutrient absorption, and waste elimination.
                - **Meal Timing**: Regular meal times help regulate the body's clock, metabolism, and energy levels. It's important not to skip meals, as this can lead to overeating later.
                
                ### **1.5 Food Choices and Physical Activity**
                
                - **Physical Activity**: The level of physical activity can dictate dietary needs. More active children may need more calories and protein.
                - **Making Smart Food Choices**: Understanding the value of nutrient-dense foods over calorie-dense foods with little nutritional value is key to making smart food choices.
                
                ### **Conclusion: Nourishing the Future**
                
                Good nutrition is fundamental to the well-being and healthy development of children. By learning about nutrients and the importance of balanced meals, students can make informed choices about what they eat, leading to a lifetime of good health.
                
                ### **1.6 Making Informed Food Choices**
                
                As we grow older, we begin to make our own choices about what we eat. Learning to make informed food choices is a skill that will benefit us for life.
                
                ### **Reading Food Labels**
                
                - **Ingredients List**: Shows what the food is made from, helping us to avoid things we may be allergic to or do not wish to consume.
                - **Nutrition Facts**: Tells us how much energy (calories) and nutrients are in the food.
                
                ### **Conclusion: Nourishing Our Future**
                
                Our relationship with food is lifelong. By learning about the nutrients in our food, the importance of a balanced diet, and safe food practices, we nourish not just our bodies but also our futures.
                
                ### **1.4 The Role of Fiber and Water in Diet**
                
                Fiber and water, though not providing nutrients, play a critical role in maintaining health, particularly in the digestive system.
                
                ### **Hydration and Health**
                
                - **Water**: Making up about 60-70% of the human body, water is indispensable for life. It is involved in nearly every bodily function, including regulating body temperature, carrying nutrients and oxygen to cells, and cushioning joints. Children should drink plenty of water throughout the day to stay hydrated, especially during physical activity and in hot weather.
                - **Fiber**: While it doesn't provide nutrients or energy, fiber is essential for a healthy digestive system. High-fiber foods, like fruits, vegetables, legumes, and whole grains, help in forming the bulk of the stool, making it easier to pass and reducing the risk of constipation. Fiber also plays a role in regulating blood sugar levels and maintaining a healthy weight.
                
                ### **Benefits of Fiber-Rich Foods**
                
                - **Appetite Control**: High-fiber foods are more filling, which helps prevent overeating.
                - **Blood Sugar Regulation**: Fiber slows down the absorption of sugar, helping to maintain stable blood glucose levels.
                - **Heart Health**: Certain types of fiber can help lower blood cholesterol levels.
                
                ### **1.5 Food Safety and Hygiene**
                
                Proper food safety and hygiene practices are crucial to prevent foodborne illnesses, which can be particularly harmful to children.
                
                ### **Safe Food Handling Practices**
                
                - **Washing Hands and Surfaces**: Keeping hands, utensils, and surfaces clean is the first defense against bacteria and other pathogens. Always wash hands with soap and water for at least 20 seconds before and after handling food.
                - **Storing Food Properly**: Different foods require different storage methods. Refrigerate perishable foods within two hours, and keep the refrigerator at the right temperature to slow the growth of bacteria.
                - **Cooking Thoroughly**: Cooking food to the right temperature is essential to kill harmful bacteria. Using a food thermometer is the best way to ensure food is cooked safely.
                
                ### **Avoiding Cross-Contamination**
                
                - **Separate Raw and Cooked Foods**: Always use separate cutting boards and utensils for raw meat and ready-to-eat foods to prevent cross-contamination.
                - **Handling Fruits and Vegetables**: Wash fruits and vegetables under running water before eating, cutting, or cooking them, even if you plan to peel them.
                
                ### **1.6 Understanding Food Labels**
                
                Being able to understand food labels is crucial in making informed choices about what to eat. These labels provide valuable information about the nutritional content of foods and can help guide healthier eating habits.
                
                ### **Decoding Food Labels**
                
                Food labels can seem complex at first, but they provide essential information that can help you make healthier choices.
                
                - **Ingredients List**: This part of the label gives you a snapshot of what's inside the food package. Ingredients are listed in order of quantity, from highest to lowest. This can help you identify the main ingredients in the product and also spot any ingredients you might want to avoid.
                - **Nutrition Information Panel**: This section provides detailed information about the nutritional value of the food, including:
                    - **Caloric Content**: Indicates how much energy (in calories or kilojoules) the food provides, helping in managing energy intake.
                    - **Fats, Proteins, and Carbohydrates**: Shows the amount of these macronutrients, which are crucial for understanding the food's impact on your diet.
                    - **Sugars and Sodium**: Keep an eye on these, especially if you're monitoring your sugar intake or trying to reduce salt for blood pressure management.
                    - **Dietary Fiber**: Important for digestive health, this information can help you ensure you’re getting enough fiber in your diet.
                
                ### **Checking for Allergens**
                
                - **Allergen Information**: This is particularly important for individuals with food allergies or intolerances. Common allergens like nuts, dairy, eggs, soy, wheat (gluten), and shellfish must be clearly indicated on food labels in many countries.
                - **Identifying Hidden Allergens**: Sometimes, allergens can be hidden in ingredients like flavorings, emulsifiers, or stabilizers. Learning to identify these through the ingredients list is crucial for those with allergies.
                
                ### **Understanding Health Claims**
                
                - **Health Claims on Labels**: Sometimes, food packages have claims like "low fat," "high in fiber," or "contains omega-3." It's important to understand these claims and check the nutrition information panel to see if the food fits into your overall dietary plan.
                - **Marketing vs. Nutrition**: Be aware that some health claims are more about marketing. For example, a product labeled as "fat-free" might still be high in sugar and calories.
                
                ### **Use-By and Best-Before Dates**
                
                - **Use-By Date**: Indicates the date by which the product should be consumed for health and safety reasons.
                - **Best-Before Date**: Suggests when the product is at its best quality. It can often be consumed after this date, but the quality may not be optimal.
                
                ### **Conclusion: Empowered Eating**
                
                Understanding food labels is a powerful tool for making healthier eating choices. It enables students to be more aware of what they're consuming, helps in managing dietary needs, and empowers them to make decisions that can positively impact their health.
                
                ### **Conclusion: Nourishing Knowledge for Healthy Choices**
                
                As we conclude this detailed exploration into the fascinating world of food and nutrition, it's clear that what we eat profoundly affects our health, growth, and overall well-being. Throughout this lesson, we've journeyed through the diverse culinary landscape of India, understanding how regional foods reflect the rich tapestry of culture, climate, and tradition. We've delved deep into the realm of nutrients, learning how each plays a unique and essential role in our bodies.
                
                Our investigation into macronutrients and micronutrients revealed the intricate balance of components our bodies need. We discovered how carbohydrates, proteins, and fats fuel our daily activities, while vitamins and minerals keep our systems functioning smoothly. We also uncovered the often-overlooked heroes of our diet – fiber and water – and their critical roles in maintaining our digestive health and overall hydration.
                
                The science of eating well, particularly for growing bodies like yours, is an art and a science. We learned how balanced meals contribute to our physical and mental development and how the right mix of nutrients can boost our energy, concentration, and even our mood. The importance of breakfast, the energy sustenance from lunch, and the lighter, nurturing dinners each play a part in our daily health story.
                
                Food safety and hygiene emerged as key players in our food journey. We learned that the way we handle, store, and prepare food is just as important as what we eat. Understanding food labels became our tool for making informed choices, enabling us to navigate the world of packaged foods with knowledge and confidence.
                
                But beyond the nutrients, safety practices, and dietary guidelines, there's a broader message to embrace. Food is more than just sustenance; it's a language of love, a medium of culture, a bridge to understanding our heritage, and a means to connect with others. It's about the joy of sharing meals, the traditions passed down through generations, and the new ones we create.
                
                As you continue on your journey, remember that eating well is a form of self-respect. It's about making choices that respect your body and its needs, choices that celebrate the diversity of foods available to us, and choices that are mindful of their impact on our environment. This knowledge empowers you to make decisions that can shape a healthier, more vibrant life, not just for yourself, but for your community and the world.
                
                In essence, this lesson is more than just about food and nutrients; it's about nurturing a relationship with food that is healthy, informed, and joyful. Carry this knowledge forward, and let it guide you towards a life of health, vitality, and delight in the rich flavors that the world has to offer.
                
                ----

                Above is the lesson material for class 6 students.

                Below is the set of questions and corresponding answers given by a 6th grade student.

                ${turnQandAObjectToString}

                Evaluate it. If the answers are almost correct, then return the followinf message in the given format. The answers should resemble atleast 75% with the above lesson material.

                QUES_1: "Good"

                for other questions, if there needs to be any answers fixed, then return the following message in the given format.

                QUES_<no>: "Send back the answer by making changes to their given answer itself and help them fix their answer"

                if the questions is completely wrong, then,

                QUES_<no>: "Give corrected message"

                Then, give points for the student out of 10 based on their answers in the below format. Point crediting should be strict and do not be flexible. Award points based on how much of their answer resembles the actual given above lesson material.

                POINTS: <points>

                Then, generate insights, from the student's given answers. These insight should point out which concept they lack understanding in. Then by analysing the answers and way of written message, give insights on how to present, what they lack. Please note that these insights are for teachers. They should be very precise and not exceed more than 2 or 3 lines. 

                INSIGHTS: <insights>

                ONLY THESE CONTENTS SHOULD BE THERE IN THE MESSAGE. NO EXTRA MESSAGES OR TEXT.
                "`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
        }
      );
      console.log("Response from OpenAI: ", response);
      console.log(
        "Response from OpenAI: ",
        response.data.choices[0].message.content
      );
      return parseTextToObject(response.data.choices[0].message.content);
    } catch (error) {
      console.log("err while evaluating", error);
      return false;
    }
  };

  function parseTextToObject(text) {
    const data = {};
    const lines = text.split("\n");
    let insightsFound = false;

    for (const line of lines) {
      const match = line.match(/(QUES_\d+): "(.*)"/);
      if (match) {
        const key = match[1];
        const value = match[2];
        data[key] = value;
      } else if (line.startsWith("POINTS:")) {
        data["POINTS"] = parseInt(line.split(":")[1].trim(), 10);
      } else if (line.startsWith("INSIGHTS:")) {
        data["INSIGHTS"] = line.replace("INSIGHTS:", "").trim();
        insightsFound = true;
      } else if (insightsFound) {
        // Capture multi-line insights until a new key is found
        data["INSIGHTS"] += "\n" + line.trim();
      }
    }

    return data;
  }

  const addInsightToBackend = async (insightData) => {
    try {
      const response = await axios.post(backendURL + "/add-new-insight", {
        insight: insightData,
      });
      console.log("Response from backend: ", response);
      if (response.data.status === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("err push ins", error);
    }
  };

  const getAllInsights = async () => {
    try {
      const response = await axios.get(backendURL + "/get-all-insights");
      console.log("All ins from backend: ", response.data);
      if (response.data.status === true) {
        setAppState((prevState) => {
          return {
            ...prevState,
            insights: response.data.data,
          };
        });
        return response.data.data;
      }
    } catch (error) {
      console.log("err push ins", error);
    }
  };

  const getOverallIns = async (insData) => {
    try {
      console.log("Getting OVINS...", insData);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo",
          model: "gpt-4",
          // response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a question paper creating assistant helping teachers to generate question papers for students based on the difficulty level.",
            },
            {
              role: "user",
              content: `"# **Detailed Lesson Material for Class 6: Exploring the World of Food and Nutrition**

                ## **Introduction to Food and Its Significance**
                
                Food is more than just a source of pleasure and a means to satisfy hunger. It is a vital part of our culture, celebrations, and daily routine. It brings families together and is an integral part of festivals and traditions across India and the world.
                
                ### **1.1 Exploring Nutritional Varieties**
                
                The vast land of India offers an incredible diversity of foods, shaped by its varied geography, climate, and cultures. Each region has its unique culinary identity, with distinct flavors and ingredients.
                
                ### **Culinary Diversity Across India**
                
                - **Northern India**: The cuisine here is heavily influenced by the agricultural lifestyle, where wheat is a staple crop. Dishes like roti, paratha, and naan are common. The region is also known for its rich, creamy gravies, tandoori cooking, and the extensive use of dairy, especially in Punjab, where paneer (cottage cheese) and ghee (clarified butter) are dietary staples. The Mughlai cuisine, with its roots in the Mughal empire, offers a range of biryanis, kebabs, and rich curries.
                - **Southern India**: The warm coastal climate here favors rice cultivation, making it a staple food. South Indian cuisine is characterized by its use of rice in various forms like idli (steamed rice cakes), dosa (rice pancakes), and uttapam (thick rice pancakes). Coconut, curry leaves, tamarind, and a variety of spices are widely used, giving the dishes a distinctive flavor. States like Kerala and Tamil Nadu are also known for their seafood specialties.
                - **Eastern India**: This region, particularly West Bengal and Odisha, is famous for its love of fish and rice. The cuisine often involves cooking in mustard oil, which adds a unique taste and aroma to the dishes. Sweets made from milk, such as rasgulla and sandesh, are a significant part of the food culture here. The use of Panch Phoron, a mix of five spices, is a hallmark of Bengali cuisine.
                - **Western India**: This region includes the states of Gujarat, Maharashtra, and Goa, each with its unique culinary style. Gujarati cuisine is known for its slightly sweet, vegetarian dishes, while Maharashtrian cuisine offers a range of spicy and mildly sweet dishes, often using peanuts and besan (gram flour). Goan cuisine stands out for its Portuguese influence, with dishes like vindaloo and Goan fish curry.
                - **Central India**: This area, including states like Madhya Pradesh, has a cuisine that is a blend of North and South Indian flavors. Wheat, millets, and rice are staple grains. The region is known for its variety of snacks and street foods, like poha (flattened rice dish) and bhutte ka kees (grated corn snack).
                - **Northeastern India**: The Northeastern states have a distinct culinary tradition that emphasizes organic and fermented foods. Staple ingredients include rice, fish, and leafy greens. The use of bamboo shoot, bhut jolokia (one of the hottest chillies), and local herbs gives their dishes a unique flavor profile. The simplicity and healthiness of the cuisine stand out, with minimal use of oil and spices.
                
                ### **Conclusion: A Melting Pot of Flavors**
                
                India’s culinary diversity is a reflection of its rich cultural tapestry. Exploring the foods from different regions not only tantalizes the taste buds but also provides insights into the history, culture, and lifestyle of the people living in these regions. For a young student, understanding this diversity can foster an appreciation for the country's rich heritage and the role of food in cultural identity.
                
                ### **1.2 Nutrients: The Building Blocks of Food**
                
                Nutrients are the compounds in foods that are essential to life and health, providing us with energy, the building blocks for repair and growth, and substances necessary to regulate chemical processes.
                
                ### **Understanding Macronutrients**
                
                - **Carbohydrates**: These are the primary source of energy for the body. Complex carbohydrates like whole grains, fruits, and vegetables also provide fiber, which aids in digestion.
                - **Proteins**: Necessary for the growth, repair, and maintenance of tissues. Proteins are made up of amino acids, some of which are essential and must be obtained from food.
                - **Fats**: Essential for brain health, energy, absorption of certain vitamins, and for protecting and insulating our bodies. Fats can be saturated or unsaturated, with a focus on healthier unsaturated fats found in fish, nuts, and certain oils.
                
                ### **Micronutrients: Small but Mighty**
                
                - **Vitamins**: Organic compounds that are necessary in small quantities for healthy growth and metabolism. Each vitamin has specific roles, such as Vitamin D for bone health and Vitamin C for immune function.
                - **Minerals**: These are inorganic elements that play a crucial role in various bodily functions. Calcium is essential for bones and teeth, iron is needed for transporting oxygen in the blood, and potassium helps in nerve and muscle function.
                
                ### **1.3 The Science of Eating Well**
                
                Eating well is about more than just satisfying hunger. It's about feeding the body the right nutrients in the right amounts.
                
                ### **Balanced Meals for Growing Bodies**
                
                - **Breakfast**: Should ideally include sources of complex carbohydrates and proteins, like whole-grain cereals with milk or yogurt, to kickstart the body's metabolism.
                - **Lunch**: A vital meal to refuel the body in the middle of the day. A balance of lean proteins, whole grains, and abundant vegetables provides sustained energy and nutrients.
                - **Dinner**: This meal should be lighter but still balanced, with an emphasis on protein, fiber-rich vegetables, and a small portion of whole grains to support overnight tissue repair and growth.
                
                ### **Snacks**: Healthy snacks are important for children to maintain energy levels. Options like fruits, nuts, and yogurt can provide essential nutrients between meals.
                
                ### **1.4 Importance of Hydration and Meal Timing**
                
                - **Hydration**: Water is crucial for every cell in the body. It aids in digestion, nutrient absorption, and waste elimination.
                - **Meal Timing**: Regular meal times help regulate the body's clock, metabolism, and energy levels. It's important not to skip meals, as this can lead to overeating later.
                
                ### **1.5 Food Choices and Physical Activity**
                
                - **Physical Activity**: The level of physical activity can dictate dietary needs. More active children may need more calories and protein.
                - **Making Smart Food Choices**: Understanding the value of nutrient-dense foods over calorie-dense foods with little nutritional value is key to making smart food choices.
                
                ### **Conclusion: Nourishing the Future**
                
                Good nutrition is fundamental to the well-being and healthy development of children. By learning about nutrients and the importance of balanced meals, students can make informed choices about what they eat, leading to a lifetime of good health.
                
                ### **1.6 Making Informed Food Choices**
                
                As we grow older, we begin to make our own choices about what we eat. Learning to make informed food choices is a skill that will benefit us for life.
                
                ### **Reading Food Labels**
                
                - **Ingredients List**: Shows what the food is made from, helping us to avoid things we may be allergic to or do not wish to consume.
                - **Nutrition Facts**: Tells us how much energy (calories) and nutrients are in the food.
                
                ### **Conclusion: Nourishing Our Future**
                
                Our relationship with food is lifelong. By learning about the nutrients in our food, the importance of a balanced diet, and safe food practices, we nourish not just our bodies but also our futures.
                
                ### **1.4 The Role of Fiber and Water in Diet**
                
                Fiber and water, though not providing nutrients, play a critical role in maintaining health, particularly in the digestive system.
                
                ### **Hydration and Health**
                
                - **Water**: Making up about 60-70% of the human body, water is indispensable for life. It is involved in nearly every bodily function, including regulating body temperature, carrying nutrients and oxygen to cells, and cushioning joints. Children should drink plenty of water throughout the day to stay hydrated, especially during physical activity and in hot weather.
                - **Fiber**: While it doesn't provide nutrients or energy, fiber is essential for a healthy digestive system. High-fiber foods, like fruits, vegetables, legumes, and whole grains, help in forming the bulk of the stool, making it easier to pass and reducing the risk of constipation. Fiber also plays a role in regulating blood sugar levels and maintaining a healthy weight.
                
                ### **Benefits of Fiber-Rich Foods**
                
                - **Appetite Control**: High-fiber foods are more filling, which helps prevent overeating.
                - **Blood Sugar Regulation**: Fiber slows down the absorption of sugar, helping to maintain stable blood glucose levels.
                - **Heart Health**: Certain types of fiber can help lower blood cholesterol levels.
                
                ### **1.5 Food Safety and Hygiene**
                
                Proper food safety and hygiene practices are crucial to prevent foodborne illnesses, which can be particularly harmful to children.
                
                ### **Safe Food Handling Practices**
                
                - **Washing Hands and Surfaces**: Keeping hands, utensils, and surfaces clean is the first defense against bacteria and other pathogens. Always wash hands with soap and water for at least 20 seconds before and after handling food.
                - **Storing Food Properly**: Different foods require different storage methods. Refrigerate perishable foods within two hours, and keep the refrigerator at the right temperature to slow the growth of bacteria.
                - **Cooking Thoroughly**: Cooking food to the right temperature is essential to kill harmful bacteria. Using a food thermometer is the best way to ensure food is cooked safely.
                
                ### **Avoiding Cross-Contamination**
                
                - **Separate Raw and Cooked Foods**: Always use separate cutting boards and utensils for raw meat and ready-to-eat foods to prevent cross-contamination.
                - **Handling Fruits and Vegetables**: Wash fruits and vegetables under running water before eating, cutting, or cooking them, even if you plan to peel them.
                
                ### **1.6 Understanding Food Labels**
                
                Being able to understand food labels is crucial in making informed choices about what to eat. These labels provide valuable information about the nutritional content of foods and can help guide healthier eating habits.
                
                ### **Decoding Food Labels**
                
                Food labels can seem complex at first, but they provide essential information that can help you make healthier choices.
                
                - **Ingredients List**: This part of the label gives you a snapshot of what's inside the food package. Ingredients are listed in order of quantity, from highest to lowest. This can help you identify the main ingredients in the product and also spot any ingredients you might want to avoid.
                - **Nutrition Information Panel**: This section provides detailed information about the nutritional value of the food, including:
                    - **Caloric Content**: Indicates how much energy (in calories or kilojoules) the food provides, helping in managing energy intake.
                    - **Fats, Proteins, and Carbohydrates**: Shows the amount of these macronutrients, which are crucial for understanding the food's impact on your diet.
                    - **Sugars and Sodium**: Keep an eye on these, especially if you're monitoring your sugar intake or trying to reduce salt for blood pressure management.
                    - **Dietary Fiber**: Important for digestive health, this information can help you ensure you’re getting enough fiber in your diet.
                
                ### **Checking for Allergens**
                
                - **Allergen Information**: This is particularly important for individuals with food allergies or intolerances. Common allergens like nuts, dairy, eggs, soy, wheat (gluten), and shellfish must be clearly indicated on food labels in many countries.
                - **Identifying Hidden Allergens**: Sometimes, allergens can be hidden in ingredients like flavorings, emulsifiers, or stabilizers. Learning to identify these through the ingredients list is crucial for those with allergies.
                
                ### **Understanding Health Claims**
                
                - **Health Claims on Labels**: Sometimes, food packages have claims like "low fat," "high in fiber," or "contains omega-3." It's important to understand these claims and check the nutrition information panel to see if the food fits into your overall dietary plan.
                - **Marketing vs. Nutrition**: Be aware that some health claims are more about marketing. For example, a product labeled as "fat-free" might still be high in sugar and calories.
                
                ### **Use-By and Best-Before Dates**
                
                - **Use-By Date**: Indicates the date by which the product should be consumed for health and safety reasons.
                - **Best-Before Date**: Suggests when the product is at its best quality. It can often be consumed after this date, but the quality may not be optimal.
                
                ### **Conclusion: Empowered Eating**
                
                Understanding food labels is a powerful tool for making healthier eating choices. It enables students to be more aware of what they're consuming, helps in managing dietary needs, and empowers them to make decisions that can positively impact their health.
                
                ### **Conclusion: Nourishing Knowledge for Healthy Choices**
                
                As we conclude this detailed exploration into the fascinating world of food and nutrition, it's clear that what we eat profoundly affects our health, growth, and overall well-being. Throughout this lesson, we've journeyed through the diverse culinary landscape of India, understanding how regional foods reflect the rich tapestry of culture, climate, and tradition. We've delved deep into the realm of nutrients, learning how each plays a unique and essential role in our bodies.
                
                Our investigation into macronutrients and micronutrients revealed the intricate balance of components our bodies need. We discovered how carbohydrates, proteins, and fats fuel our daily activities, while vitamins and minerals keep our systems functioning smoothly. We also uncovered the often-overlooked heroes of our diet – fiber and water – and their critical roles in maintaining our digestive health and overall hydration.
                
                The science of eating well, particularly for growing bodies like yours, is an art and a science. We learned how balanced meals contribute to our physical and mental development and how the right mix of nutrients can boost our energy, concentration, and even our mood. The importance of breakfast, the energy sustenance from lunch, and the lighter, nurturing dinners each play a part in our daily health story.
                
                Food safety and hygiene emerged as key players in our food journey. We learned that the way we handle, store, and prepare food is just as important as what we eat. Understanding food labels became our tool for making informed choices, enabling us to navigate the world of packaged foods with knowledge and confidence.
                
                But beyond the nutrients, safety practices, and dietary guidelines, there's a broader message to embrace. Food is more than just sustenance; it's a language of love, a medium of culture, a bridge to understanding our heritage, and a means to connect with others. It's about the joy of sharing meals, the traditions passed down through generations, and the new ones we create.
                
                As you continue on your journey, remember that eating well is a form of self-respect. It's about making choices that respect your body and its needs, choices that celebrate the diversity of foods available to us, and choices that are mindful of their impact on our environment. This knowledge empowers you to make decisions that can shape a healthier, more vibrant life, not just for yourself, but for your community and the world.
                
                In essence, this lesson is more than just about food and nutrients; it's about nurturing a relationship with food that is healthy, informed, and joyful. Carry this knowledge forward, and let it guide you towards a life of health, vitality, and delight in the rich flavors that the world has to offer.
                
                ----

                Above is the lesson material for class 6 students.

                Below is the list of individual insights of every single student who attended the test from the above lesson material.

                ${insData}

                Analyse the individual insights, then give a overall insight that is helpful for teachers to take decisions. It should be very precise, tell whom to concentrate, what concepts to be taught again, how the class is understanding the concepts and few more insights that you believe will be helpful for teachers to decide further.

                Also along with that convert that para and give them as short and precise bullet points for teachers to easily read.

                Avoid broad and very general insights. Be specific.

                <Para_here>
                
                Key Insights:
                ...points here...

                ONLY THESE CONTENTS SHOULD BE THERE IN THE MESSAGE. NO EXTRA MESSAGES OR TEXT.
                "`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
        }
      );
      console.log("Response from OpenAI: ", response);
      console.log(
        "Response from OpenAI: ",
        response.data.choices[0].message.content
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.log("err while evaluating", error);
      return false;
    }
  };

  useEffect(() => {
    getTotalTeacherCount();
    getStudentData();
    getAllMaterials();
    getAllAttempts();
    getAllInsights();
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
        callOpenAI,
        chatWithOpenAI,
        generateCertificate,
        generateQuestionPapers,
        shareNewMaterial,
        getAllMaterials,
        i18n,
        t,
        changeLang,
        doTexttoSpeech,
        translateContentTo,
        attemptNewMaterial,
        getAllAttempts,
        evaluationWithAI,
        addInsightToBackend,
        getAllInsights,
        getOverallIns,
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
          <div>
            <div></div>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
