import { MainPage, CovidChart } from ".";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/covidchart/:id" element={<CovidChart />} />
        </Routes>
      </div>
    </Router>
  );
}
