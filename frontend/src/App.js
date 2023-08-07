import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);
  return (
    <div className="overflow-hidden">
      {/* <SignUp /> */}
      {/* {!token ? (
        <Auth />
      ) : ( */}
      <HomePage />
      {/* <Routes>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
      </Routes> */}
      {/* )} */}
    </div>
  );
}

export default App;
