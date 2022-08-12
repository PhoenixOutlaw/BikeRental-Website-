import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./views/Main";
import 'antd/dist/antd.css';
import { Signin } from "./views/Signin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<h1>bikes</h1>} />
          <Route path="/dashboard" element={<h1>dashboard</h1>} />
        </Route>
        <Route path="login" element={<Signin />} />
        <Route path="register" element={<Signin  register={true} />} />
      </Routes>
    </div>
  );
}

export default App;
