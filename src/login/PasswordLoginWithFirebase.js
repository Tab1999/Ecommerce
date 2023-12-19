import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAndLogin from "./RegisterAndLogin";
import HomeScreen from "./Home"; 
import ForgotPassword from "./ForgotPassword";
import App from "../App";

function PasswordLoginWithFirebase(){
    return(
        // <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<RegisterAndLogin/>} />
                    {/* <Route path="/home" element={<PasswordLoginWithFirebase/>} /> */}
                    <Route path="/reset" element={<ForgotPassword/>} />
                </Routes>
            </div>
        // </BrowserRouter>
    )
}
export default PasswordLoginWithFirebase;