import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import SideBar from "./components/SideBar/SideBar";
import Analytics from "./pages/Analytics/Analytics";
import Header from "./components/Header/Header";
import Movies from "./pages/Movies/Movies";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import AddNewMovie from "./pages/AddNewMovie/AddNewMovie";
import AddNewUser from "./pages/AddNewUser/AddNewUser";
import ProfileSetting from "./pages/ProfileSetting/ProfileSetting";
import Profile from "./pages/Profile/Profile";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state?.auth.user);
  const isLoginPage = location.pathname === "/";

  // Redirect to analytics if user is logged in and trying to access login page
  if (user && isLoginPage) {
    return <Navigate to="/analytics" replace />;
  }

  // Redirect to login if user is not logged in and trying to access protected routes
  if (!user && !isLoginPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div id="App">
      {isLoginPage ? (
        <div className="login-container">
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </div>
      ) : (
        <div className="page-container">
          <SideBar />
          <main className="main-content">
            <Header />
            <div className="content-wrapper">
              <Routes>
                <Route path="/analytics" element={<Analytics />}></Route>
                <Route path="/movies" element={<Movies />}></Route>
                <Route path="/users" element={<Users />}></Route>
                <Route path="/movies/add" element={<AddNewMovie />}></Route>
                <Route path="/users/add" element={<AddNewUser />}></Route>
                <Route path="/users/edit/:id" element={<AddNewUser />}></Route>
                <Route path="/setting" element={<ProfileSetting />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
              </Routes>
            </div>
          </main>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
