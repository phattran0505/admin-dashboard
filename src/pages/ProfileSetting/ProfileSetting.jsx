import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastSuccess, toastError } from "../../shared/Toastify";
import { loginSuccess } from "../../redux/authSlice";
import useAxiosJWT from "../../config/axiosConfig";

import styles from "./ProfileSetting.module.scss";
const cx = classNames.bind(styles);

function ProfileSetting() {
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const [settings, setSettings] = useState({
    desktop: user?.adminInfo?.notificationOptions?.desktop,
    mail: user?.adminInfo?.notificationOptions?.mail,
  });

  const [userInfo, setUserInfo] = useState({
    username: user?.username || "",
    email: user?.email || "",
    gender: user?.gender || "other",
    phone: user?.phone || "",
    role: user?.role || "user",
    avatar: user?.avatar || "",
    newPassword: "",
    confirmPassword: "",
    adminInfo: user?.adminInfo || null,
  });

  const [avatarPreview, setAvatarPreview] = useState(userInfo.avatar);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (setting) => {
    const newSettings = {
      ...settings,
      [setting]: !settings[setting],
    };
    setSettings(newSettings);
    await handleUpdateNotification(newSettings);
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      adminInfo: {
        ...prev.adminInfo,
        [name]: value,
      },
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setUserInfo((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      toastError("Mật khẩu và xác nhận mật khẩu không khớp");
      return false;
    }
    return true;
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updateData = {
        username: userInfo.username,
        email: userInfo.email,
        gender: userInfo.gender,
        phone: userInfo.phone,
        avatar: userInfo.avatar,
      };

      if (userInfo.newPassword) {
        updateData.password = userInfo.newPassword;
      }

      // If user is admin, include admin specific info
      if (userInfo.role === "admin") {
        updateData.adminInfo = {
          ...userInfo.adminInfo,
          lastLogin: new Date(),
          loginHistory: {
            timestamp: new Date(),
            ipAddress: "client-ip", // You might want to get this from the client
            device: navigator.userAgent,
          },
        };

        // Use admin update endpoint
        const response = await axios.put(
          `${BASE_URL}/admin/update-profile/${user._id}`,
          updateData
        );
        const result = response.data;
        if (result.success) {
          toastSuccess("Cập nhật thông tin admin thành công");
          dispatch(loginSuccess({ ...user, ...result.data }));
          setTimeout(() => {
            window.location.href = "/users";
          }, 1500);
        }
      }

      setEditMode(false);
      setUserInfo((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toastError(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNotification = async (newSettings) => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/notification/update`,
        newSettings,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(
          loginSuccess({
            ...user,
            adminInfo: {
              ...user.adminInfo,
              notificationOptions: newSettings,
            },
          })
        );
      }
    } catch (error) {
      toastError(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    }
  };

  useEffect(() => {
    const contentWrapper = document.querySelector(".content-wrapper");
    if (contentWrapper) {
      contentWrapper.scrollTop = 0;
    }
  }, []);
  return (
    <div className={cx("profile-setting")}>
      <div className={cx("profile-setting_container")}>
        <div className={cx("profile-setting_content")}>
          <div className={cx("col-left")}>
            {/* Avatar Section */}
            <div className={cx("profile-setting_avatar")}>
              <div className={cx("profile-avatar_content")}>
                <img src={avatarPreview} alt="user-avatar" />
                <div className={cx("profile-avatar_edit")}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <div
                    className={cx("upload-container")}
                    onClick={handleAvatarClick}
                  >
                    <div className={cx("upload-message")}>
                      <button type="button" className={cx("btn-upload")}>
                        {selectedFileName || "Change Image"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className={cx("profile-setting_info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("info-title")}>Account Information</h3>
                <button
                  type="button"
                  className={cx("edit-button")}
                  onClick={() => setEditMode(!editMode)}
                  disabled={isLoading}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <form className={cx("profile-form")} onSubmit={handleSaveChanges}>
                {/* Basic Info */}
                <div className={cx("form-row")}>
                  <div className={cx("form-group")}>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={userInfo.username}
                      onChange={handleUserInfoChange}
                      disabled={!editMode || isLoading}
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleUserInfoChange}
                      disabled={!editMode || isLoading}
                    />
                  </div>
                </div>

                <div className={cx("form-row")}>
                  <div className={cx("form-group")}>
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={userInfo.gender}
                      onChange={handleUserInfoChange}
                      disabled={!editMode || isLoading}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={cx("form-group")}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleUserInfoChange}
                      disabled={!editMode || isLoading}
                    />
                  </div>
                </div>

                {/* Admin Specific Fields */}
                {userInfo.role === "admin" && (
                  <div className={cx("admin-info-section")}>
                    <h4 className={cx("section-title")}>Admin Information</h4>
                    <div className={cx("form-row")}>
                      <div className={cx("form-group")}>
                        <label htmlFor="position">Position</label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={userInfo.adminInfo?.position || ""}
                          onChange={handleAdminInfoChange}
                          disabled={!editMode || isLoading}
                        />
                      </div>
                      <div className={cx("form-group")}>
                        <label htmlFor="department">Department</label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={userInfo.adminInfo?.department || ""}
                          onChange={handleAdminInfoChange}
                          disabled={!editMode || isLoading}
                        />
                      </div>
                    </div>
                    <div className={cx("form-group")}>
                      <label htmlFor="notes">Admin Notes</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={userInfo.adminInfo?.notes || ""}
                        onChange={handleAdminInfoChange}
                        disabled={!editMode || isLoading}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Password Change Section */}
                {editMode && (
                  <>
                    <div className={cx("change-password-section")}>
                      <h4 className={cx("section-title")}>Change Password</h4>
                      <div className={cx("form-row")}>
                        <div className={cx("form-group")}>
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={userInfo.newPassword}
                            onChange={handleUserInfoChange}
                            disabled={isLoading}
                          />
                        </div>
                        <div className={cx("form-group")}>
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userInfo.confirmPassword}
                            onChange={handleUserInfoChange}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={cx("form-actions")}>
                      <button
                        type="submit"
                        className={cx("save-button")}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Settings Column */}
          <div className={cx("col-right")}>
            <div className={cx("account-setting")}>
              <div className={cx("setting-block")}>
                <div className={cx("setting-block_title")}>
                  Notification Settings
                </div>
                <div className={cx("list-option")}>
                  <div className={cx("list-option_item")}>
                    <div className={cx("option-label")}>
                      Show desktop notifications
                    </div>
                    <div className={cx("toggle-switch-container")}>
                      <label className={cx("toggle-switch")}>
                        <input
                          type="checkbox"
                          checked={settings.desktop}
                          onChange={() => handleToggle("desktop")}
                        />
                        <span className={cx("toggle-slider")}></span>
                      </label>
                    </div>
                  </div>
                  <div className={cx("list-option_item")}>
                    <div className={cx("option-label")}>
                      Show email notifications
                    </div>
                    <div className={cx("toggle-switch-container")}>
                      <label className={cx("toggle-switch")}>
                        <input
                          type="checkbox"
                          checked={settings.mail}
                          onChange={() => handleToggle("mail")}
                        />
                        <span className={cx("toggle-slider")}></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
