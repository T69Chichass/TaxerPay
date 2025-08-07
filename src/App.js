import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GetStartedPage from "./entrypages/GetStartedPage";
import LoginCred from "./entrypages/LoginCred";
import BackendTest from "./components/BackendTest";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage/>}/>
        <Route path="/logincred" element={<LoginCred/>}/>
        <Route path="/test" element={<BackendTest/>}/>
      </Routes>
    </Router>
  );
}
