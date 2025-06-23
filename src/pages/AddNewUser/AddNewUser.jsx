import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastSuccess, toastError } from "../../shared/Toastify";
import { avatarList } from "../../../../client/src/assets/data/data";
import styles from "./AddNewUser.module.scss";
const cx = classNames.bind(styles);

function AddNewUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { singleUser } = location.state || {};

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: singleUser?.username || "",
    email: singleUser?.email || "",
    password: "",
    confirmPassword: "",
    phone: singleUser?.phone || "",
    role: singleUser?.role || "user",
    status: singleUser?.status || "inactive",
    gender: singleUser?.gender || "other",
    avatar: singleUser?.avatar || null,
  });
  const isEditMode = id ? true : false;
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatar: avatarUrl,
    }));
    setShowAvatarModal(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username?.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password only for new users or if password is being changed
    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (
      formData.phone &&
      !/^\d{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ""))
    ) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        let res;
        if (isEditMode && id) {
          // Sử dụng API updateUser
          res = await axios.put(`${BASE_URL}/admin/users/update/${id}`, formData);
          const result = res.data;
          if (result.success) {
            toastSuccess("Cập nhật người dùng thành công");
          }
        } else {
          // Sử dụng API addNewUser
          res = await axios.post(`${BASE_URL}/admin/users/add`, formData);
          const result = res.data;
          if (result.success) {
            toastSuccess("Thêm người dùng mới thành công");
          }
        }

        navigate("/users");
      } catch (error) {
        toastError(
          error?.response?.data?.message ||
            "Có lỗi xảy ra khi lưu thông tin người dùng"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={cx("add-user-container")}>
      <div className={cx("form-header")}>
        <h2>{isEditMode ? "Edit User" : "Add New User"}</h2>
        <Link to="/users" className={cx("back-button")}>
          <MdOutlineKeyboardArrowLeft size={20} />
          Back
        </Link>
      </div>

      <form className={cx("add-user-form")} onSubmit={handleSubmit}>
        <div className={cx("form-grid")}>
          <div className={cx("form-column")}>
            <div className={cx("form-group")}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={handleInputChange}
                className={errors.username ? cx("error-input") : ""}
                placeholder="Enter username"
              />
              {errors.username && (
                <span className={cx("error-message")}>{errors.username}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className={errors.email ? cx("error-input") : ""}
                placeholder="user@example.com"
              />
              {errors.email && (
                <span className={cx("error-message")}>{errors.email}</span>
              )}
            </div>

            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label htmlFor="password">
                  {isEditMode ? "New Password (Optional)" : "Password"}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  className={errors.password ? cx("error-input") : ""}
                  placeholder="******"
                />
                {errors.password && (
                  <span className={cx("error-message")}>{errors.password}</span>
                )}
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? cx("error-input") : ""}
                  placeholder="******"
                />
                {errors.confirmPassword && (
                  <span className={cx("error-message")}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className={errors.phone ? cx("error-input") : ""}
                placeholder="(Optional) Enter phone number"
              />
              {errors.phone && (
                <span className={cx("error-message")}>{errors.phone}</span>
              )}
            </div>

            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role || "user"}
                  onChange={handleInputChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || "inactive"}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || "other"}
                  onChange={handleInputChange}
                >
                    <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className={cx("form-column")}>
            <div className={cx("avatar-upload")}>
              <label>Profile Picture</label>
              <div className={cx("avatar-preview")}>
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="User avatar preview"
                    className={cx("preview-image")}
                  />
                ) : (
                  <div className={cx("upload-placeholder")}>
                    <span>Select Avatar</span>
                  </div>
                )}
              </div>
              <div className={cx("avatar-actions")}>
                <button
                  type="button"
                  className={cx("select-avatar-btn")}
                  onClick={() => setShowAvatarModal(true)}
                >
                  Choose from our list
                </button>
                <div className={cx("or-divider")}>OR</div>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={cx("file-input")}
                />
                <label htmlFor="avatar" className={cx("upload-button")}>
                  Upload Image
                </label>
              </div>
              <small className={cx("avatar-tip")}>
                Recommended: Square image, 300x300 pixels or larger
              </small>
            </div>
          </div>
        </div>

        <div className={cx("form-actions")}>
          <button
            type="button"
            className={cx("cancel-button")}
            onClick={() => navigate("/users")}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={cx("submit-button")}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEditMode ? "Edit User" : "Add User"}
          </button>
        </div>
      </form>

      {showAvatarModal && (
        <div className={cx("avatar-modal")}>
          <div className={cx("modal-content")}>
            <div className={cx("modal-header")}>
              <h3>Select Avatar</h3>
              <button
                type="button"
                className={cx("close-btn")}
                onClick={() => setShowAvatarModal(false)}
              >
                ×
              </button>
            </div>
            <div className={cx("avatar-grid")}>
              {avatarList.map((item, index) => (
                <div
                  key={index}
                  className={cx("avatar-item", {
                    selected: formData.avatar === item.avatar,
                  })}
                  onClick={() => handleAvatarSelect(item.avatar)}
                >
                  <img src={item.avatar} alt={`Avatar ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewUser;
