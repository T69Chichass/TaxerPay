import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GetStartedPage from "./entrypages/GetStartedPage";
import LoginCred from "./entrypages/LoginCred";
import BackendTest from "./components/BackendTest";
import AdminDashboard from "./components/AdminDashboard";
import FarmerDashboard from "./components/FarmerDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
                        <Route path="/" element={<GetStartedPage/>}/>
                <Route path="/logincred" element={<LoginCred/>}/>
                <Route path="/test" element={<BackendTest/>}/>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                <Route path="/farmer-dashboard" element={<FarmerDashboard/>}/>
      </Routes>
    </Router>
  );
}
