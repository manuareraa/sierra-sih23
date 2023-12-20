import { useState } from "react";
import { Button, ButtonGroupProvider } from "@nextui-org/react";

import "./App.css";
import { AppContextProvider } from "./utils/AppContext";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import PrivateRouteGuard from "./utils/PrivateRouteGuard";
import Homepage from "./pages/Homepage";
import Recruit from "./pages/One/Recruit";
import Teachers from "./pages/One/Teachers";
import TeacherView from "./pages/One/TeacherView";
import ViewMyProfile from "./pages/Two/ViewMyProfile";
import Login from "./pages/Two/Login";
import StudentView from "./pages/Two/StudentView";
import StudentViewThree from "./pages/Three/StudentViewThree";
import LearningPlatformHome from "./pages/Four/LearningPlatformHome";
import ContentCreation from "./pages/Five/ContentCreation";
import ContentSearch from "./pages/Five/ContentSearch";
import StudentLogin from "./pages/Three/StudentLogin";
import VerifyCert from "./pages/verify/VerifyCert";
import VerifySbt from "./pages/verify/VerifySbt";

function App() {
  const location = useLocation();

  return (
    <AppContextProvider>
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/" element={<Navigate to="/dashboard/my-farm" />} /> */}
        {/* one */}
        <Route path="/" element={<Homepage />} />
        <Route path="/mode/one/recruit" element={<Recruit />} />
        <Route path="/mode/one/teachers" element={<Teachers />} />
        <Route
          path="/mode/one/teacher/view/:teacherId"
          element={<TeacherView />}
        />

        {/* two */}
        <Route path="/mode/two/login" element={<Login />} />
        <Route
          path="/mode/two/view-my-profile/:teacherId"
          element={<ViewMyProfile />}
        />
        <Route
          path="/mode/two/student/view/:selectedClass/:studentId"
          element={<StudentView />}
        />

        {/* three */}
        <Route
          path="/mode/three/student/view/:selectedClass/:studentId"
          element={<StudentViewThree />}
        />
        <Route path="/mode/three/login" element={<StudentLogin />} />

        {/* four */}
        <Route
          path="/mode/four/learning-platform/home"
          element={<LearningPlatformHome />}
        />

        {/* five */}
        <Route
          path="/mode/five/content-platform/create"
          element={<ContentCreation />}
        />
        <Route
          path="/mode/five/content-platform/search"
          element={<ContentSearch />}
        />

        {/* verify */}
        <Route path="/verify/cert" element={<VerifyCert />} />
        <Route path="/verify/sbt" element={<VerifySbt />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
