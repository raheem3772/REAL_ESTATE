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
import HomePageData from "./Pages/HomePage/HomePageData";
import Search from "./Pages/Search/Search";
import Buy from "./Pages/Buy/Buy";
import Rent from "./Pages/Rent/Rent";
import Properties from "./Pages/Sell/Sell";
import MyProperty from "./Pages/Sell/MyProperty";
import Footer from "./Components/Footer/Footer";
import Reviews from "./Pages/Reviews/Reviews";
import SingleMessage from "./Pages/Messages/SingleMessage";
import Profile from "./Pages/Profile/Profile";
import SingleProperty from "./Pages/Sell/SingleProperty";
import Aboutus from "./Pages/AboutUS/Aboutus";
function App() {
  const [refreshSearchData, setRefreshSearchData] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [agencyMainValidation, setAgencyMainValidation] = useState([]);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [token, setToken] = useState();
  const location = useLocation(); // Get the current location
  const shouldShowHeader =
    location.pathname === "/login" || location.pathname === "/signup";
  const shouldShowFooter =
    location.pathname === "/messages" || location.pathname === "messages/:id";
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
        setAdminId(arr);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/agencymain/")
      .then((val) => {
        const arr = [];
        val.data.map((item) => {
          if (!arr.includes(item._id)) {
            arr.push(item._id);
          }
        });
        setAgencyMainValidation(arr);
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
      {!shouldShowHeader && (
        <Header
          token={token}
          setAdminId={setAdminId}
          adminId={adminId}
          agencyMainValidation={agencyMainValidation}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route
          element={
            <HomePage
              token={token}
              adminId={adminId}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              minPrice={minPrice}
              maxPrice={maxPrice}
              dropdownSearch={dropdownSearch}
              setDropdownSearch={setDropdownSearch}
              setRefreshSearchData={setRefreshSearchData}
              refreshSearchData={refreshSearchData}
            />
          }
        >
          <Route
            path="/home"
            element={<HomePageData token={token} adminId={adminId} />}
          />
          <Route path="/buy" element={<Buy />} />
          <Route
            path="/properties"
            element={
              <Properties
                adminId={adminId}
                token={token}
                agencyMainValidation={agencyMainValidation}
              />
            }
          />
          <Route
            path="/myproperty"
            element={
              <MyProperty
                adminId={adminId}
                token={token}
                agencyMainValidation={agencyMainValidation}
              />
            }
          />
          <Route path="/rent" element={<Rent />} />
          <Route
            path="/search/:id"
            element={
              <Search
                token={token}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                dropdownSearch={dropdownSearch}
                setDropdownSearch={setDropdownSearch}
                refreshSearchData={refreshSearchData}
              />
            }
          />
        </Route>
        <Route path="/reviews" element={<Reviews />} />
        <Route element={<AuthPage />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/favorite" element={<Favorites />} />
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
        <Route
          path="/agencies/:_id"
          element={<SingleAgency adminId={adminId} token={token} />}
        />
        <Route path="/properties/:_id" element={<SingleProperty />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/messages/:id" element={<SingleMessage />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
      {!shouldShowHeader && !shouldShowFooter && (
        <Footer
          // token={token}
          // setAdminId={setAdminId}
          agencyMainValidation={agencyMainValidation}
        />
      )}
    </div>
  );
}

export default App;
