import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./views/Main";
import { Signin } from "./views/Signin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getloggeduser } from "./redux/features/login/loginAPI";
import { Bars } from "react-loader-spinner";
import { validjwt } from "./utils/fnc";
import { Auth } from "./components/Auth";
import { Bikes } from "./components/Bikes";
import { Bike } from "./components/Bike";

function App() {
  const user = useSelector((state) => state.login.accessToken);
  const status = useSelector((state) => state.login.status);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!user && token) {
      validjwt(() => dispatch(getloggeduser()));
    }
    setloading(false);
  }, [user, dispatch]);

  return (
    <div className="App">
      {status === "loading" || loading ? (
        <div className="overlay d-flex justify-center align-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Auth role={[]} element={<Main />} />}>
            <Route index element={<Bikes />} />
            <Route path="/bike/:id" element={<Bike />} />
            <Route
              path="/dashboard"
              element={<Auth role={["admin"]} element={<h1>dashboard</h1>} />}
            />
          </Route>
          <Route path="login" element={<Signin />} />
          <Route path="register" element={<Signin register={true} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
