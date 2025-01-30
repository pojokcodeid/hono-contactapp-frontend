import { BrowserRouter, Route, Routes } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Home from "../components/Home";
import Login from "../components/Login";
import { ToastContainer } from "react-toastify";
import Register from "../components/Register";
import AddContact from "../components/personal/AddContact";
import AddAddress from "../components/personal/AddAddress";
import ListAddress from "../components/personal/ListAddress";
import Logout from "../components/Logout";

const RouteNavigation = () => {
  const refreshToken = secureLocalStorage.getItem("refreshToken");
  const buildNav = () => {
    if (refreshToken) {
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/add-address/:id" element={<AddAddress />} />
              <Route path="/list-address/:id" element={<ListAddress />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    } else {
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    }
  };
  return (
    <>
      {buildNav()}
      <ToastContainer />
    </>
  );
};

export default RouteNavigation;
