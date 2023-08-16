import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import Header from "./Components/Header/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./Pages/Signup/SignUp";
import AuthPage from "./Pages/Signup/AuthPage";
import Login from "./Pages/Login/Login";
import Favorites from "./Pages/Favorite.js/Favorites";
import Agencies from "./Pages/Agency/Agencies";
import SingleAgency from "./Pages/Agency/SingleAgency";
import Blogs from "./Pages/Blogs/Blogs";
import SingleBlogs from "./Pages/Blogs/SingleBlogs";
import Messages from "./Pages/Messages/Messages";
import axios from "axios";
import { BASE_URL } from "./BaseRealEstate";
import UnApprovedAgencies from "./Pages/Agency/UnapprovedAgencies";
function App() {
  const [adminId, setAdminId] = useState(null);
  const [token, setToken] = useState();
  const location = useLocation(); // Get the current location
  const shouldShowHeader =
    location.pathname === "/login" || location.pathname === "/signup";
  const userId = localStorage.getItem("user_Id");
  const getAdminId = async () => {
    await axios
      .get(BASE_URL + "/admins/")
      .then((val) => {
        const arr = [];
        val.data.map((item) => {
          if (!arr.includes(item.user_id)) {
            arr.push(item.user_id);
          }
        });
        console.log(typeof arr);
        setAdminId(arr);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    const gettoken = localStorage.getItem("token");
    setToken(gettoken);
  }, [token]);
  useEffect(() => {
    // Set the default headers for all Axios requests
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "ngrok-skip-browser-warning": "69420",
    };
  }, []);
  useEffect(() => {
    getAdminId();
  }, []);
  return (
    <div className="overflow-hidden pb-10">
      {!shouldShowHeader && <Header token={token} setAdminId={setAdminId} />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<HomePage token={token} adminId={adminId} />}
        />
        <Route element={<AuthPage />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/buy" element={<HomePage />} />
        <Route path="/sell" element={<HomePage />} />
        <Route path="/rent" element={<HomePage />} />
        <Route path="/blog" element={<Blogs token={token} />} />
        <Route path="/blog/:_id" element={<SingleBlogs token={token} />} />
        <Route
          path="/agencies"
          element={<Agencies token={token} adminId={adminId} />}
        />
        {adminId !== null && adminId.includes(userId) && (
          <Route
            path="/unapprovedagencies"
            element={<UnApprovedAgencies token={token} />}
          />
        )}
        <Route path="/agencies/:_id" element={<SingleAgency />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/messages/:id" element={<Messages />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
