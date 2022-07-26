import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/layout/Home";
import Login from "../pages/layout/Login";


const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                
            </Routes>
        </BrowserRouter>
    );
};
export default Router;