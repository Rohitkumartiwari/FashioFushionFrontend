import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import AddRanchForm from "./Page/AddRanchForm";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-ranch-form" element={<AddRanchForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
