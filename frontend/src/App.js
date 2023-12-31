import { Navigate, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense, useState } from "react";
import { getloggeduser } from "./redux/features/login/loginAPI";
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";
import { Bikes } from "./components/Bikes";
import { Auth } from "./components/Auth";
import { Signin } from "./views/Signin";
import { validjwt } from "./utils/fnc";
import api from "./axios/axiosconfig";
import { Main } from "./views/Main";
import { useEffect } from "react";
import Cookies from "js-cookie";
import "antd/dist/antd.min.css";
import "./App.css";

const  Bike = lazy(()=> import("./components/Bike"));
const  Dashboard = lazy(()=> import("./views/Dashboard"));
const  Profile = lazy(()=> import("./views/Profile"));

function App() {
  const user = useSelector((state) => state.login.accessToken);
  const status = useSelector((state) => state.login.status);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if(token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    if (!user && token) {
      validjwt(() => dispatch(getloggeduser()));
    }
    setloading(false);
  }, [user, dispatch]);

  return (
    <div className="App">
      {status === "loading" || loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Auth role={[]} element={<Main />} />}>
              <Route index element={<Bikes />} />
              <Route path="/bike/:id" element={<Bike />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:id" element={<Auth role={['admin']} element={<Profile />}/>} />
              <Route
                path="/dashboard"
                element={<Auth role={["admin"]} element={<Dashboard />} />}
              />
            </Route>
            <Route path="login" element={<Signin />} />
            <Route path="register" element={<Signin register={true} />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;

const Loader = () => {
  return (
    <div className="overlay d-flex justify-center align-center">
      <Bars
        height="80"
        width="80"
        color="#1890ff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
