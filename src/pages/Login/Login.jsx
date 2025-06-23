import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";
import { useGoogleLogin } from "@react-oauth/google";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { loginStart, loginSuccess, loginFailure } from "../../redux/authSlice";
import { toastError } from "../../shared/Toastify";
import Loader from "../../shared/Loader";

import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/admin/login`,
        JSON.stringify(info),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(loginSuccess(result.data));
        setIsLoading(false);
        navigate("/analytics");
      }
    } catch (error) {
      dispatch(loginFailure());
      setIsLoading(false);
      return toastError(error?.response?.data?.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      dispatch(loginStart());
      setGoogleLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/auth/admin/google-login`,
          {
            code: credentialResponse.code,
          },
          { withCredentials: true }
        );
        const result = res.data;
        if (result.success) {
          dispatch(loginSuccess(result.data));
          setGoogleLoading(false);
          navigate("/analytics");
        }
      } catch (error) {
        dispatch(loginFailure());
        setGoogleLoading(false);
        return toastError(error?.response?.data?.message);
      }
    },
    onError: (error) => {
      return toastError(error?.response?.data?.message);
    },
    flow: "auth-code",
  });
  return (
    <div className={cx("login-container")}>
      <form onSubmit={handleSubmit}>
        <div className={cx("login-form")}>
          <div className={cx("login-content")}>
            <Link to={"/"} className={cx("login-logo")}>
              <img
                src={
                  "https://res.cloudinary.com/djmeybzjk/image/upload/v1750653889/logo_vlxhld.svg"
                }
                alt="logo"
              />
            </Link>
            <div className={cx("login-welcome")}>
              Welcome back <br /> Please login to your admin account
            </div>
            <div className={cx("login-input")}>
              <label className={cx("login-label")}>Email</label>
              <input type="text" id="email" onChange={handleChange} />
            </div>
            <div className={cx("login-input")}>
              <div className={cx("login-label-container")}>
                <label className={cx("login-label")}>Password</label>
              </div>
              <input type="password" id="password" onChange={handleChange} />
            </div>
            <div className={cx("login-buttons")}>
              <button type="submit" className={cx("login-button")}>
                {isLoading ? (
                  <Loader isloading={isLoading} />
                ) : (
                  <>
                    <span className={cx("button-icon")}>
                      <i style={{ display: "flex", alignItems: "center" }}>
                        <FiArrowRightCircle size={20} />
                      </i>
                    </span>
                    Login
                  </>
                )}
              </button>
              <button
                type="button"
                className={cx("login-button")}
                onClick={googleLogin}
              >
                {googleLoading ? (
                  <Loader isloading={googleLoading} />
                ) : (
                  <>
                    <img
                      src={
                        "https://res.cloudinary.com/djmeybzjk/image/upload/v1750653889/google_p4ircn.svg"
                      }
                      alt="google"
                    />
                    Login with Google
                  </>
                )}
              </button>
            </div>
            <div className={cx("test-account")}>
              <div className={cx("test-header")}>
                <div className={cx("test-icon")}>🔑</div>
                <h4>Test Account</h4>
              </div>
              <div className={cx("account-info")}>
                <div className={cx("info-row")}>
                  <div className={cx("info-col")}>
                    <div className={cx("info-label")}>Email</div>
                    <div className={cx("info-value")}>
                      admin_example@gmail.com
                    </div>
                  </div>
                  <div className={cx("info-col")}>
                    <div className={cx("info-label")}>Password</div>
                    <div className={cx("info-value")}>admin123</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
