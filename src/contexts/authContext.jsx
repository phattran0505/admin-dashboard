import { createContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/utils";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../redux/authSlice";
import { toastError, toastSuccess } from "../shared/Toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutStart());
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
          timeout: 3000,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(logoutSuccess());
        toastSuccess(result.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(logoutFailure());
      return toastError(error.response.data.message);
    }
  };
  return (
    <AuthContext.Provider value={{ handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
