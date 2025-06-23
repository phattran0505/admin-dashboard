import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { BiSortAZ, BiSortZA } from "react-icons/bi";  
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastError, toastSuccess } from "../../shared/Toastify";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";

import styles from "./Users.module.scss";
const cx = classNames.bind(styles);

function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState({});
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortEmail, setSortEmail] = useState("desc");
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    gender: "",
    page: 1,
  });
  const [tempFilters, setTempFilters] = useState({
    role: "",
    status: "",
    gender: "",
  });

  const handlePageChange = (pageNumber) => {
    setFilters((prev) => ({
      ...prev,
      page: pageNumber,
    }));
    setSortOrder("desc");
    setSortEmail("desc");
    // Scroll to table
    const tableElement = document.querySelector(`.${cx("users-table")}`);
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      ...tempFilters,
      page: 1,
    }));
  };

  const handleSearch = async (searchKeyword) => {
    if (!searchKeyword.trim()) {
      fetchUsers();
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/users/search?keyword=${searchKeyword}`,
        {
          params: {
            limit: 10,
            page: filters.page,
            role: filters.role,
            status: filters.status,
            gender: filters.gender,
          },
        }
      );
      const result = res.data;
      if (result.success) {
        // Sort users to keep admins on top
        const sortedUsers = result.data.sort((a, b) => {
          if (a.role === "admin" && b.role !== "admin") return -1;
          if (a.role !== "admin" && b.role === "admin") return 1;
          return 0;
        });
        setPage(result.pagination);
        setUsers(sortedUsers);
      }
    } catch (error) {
      return toastError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.delete(`${BASE_URL}/admin/users/${userId}`);
      const result = res.data;
      if (result.success) {
        toastSuccess("Xóa người dùng thành công");
        // Reset search keyword and filters
        setKeyword("");
        setFilters((prev) => ({
          ...prev,
          page: 1
        }));
        // Fetch users again
        await fetchUsers();
      }
    } catch (error) {
      toastError(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa người dùng"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      // Always keep admin on top
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;

      // Sort by username if both are admin or both are not admin
      if (sortOrder === "desc") {
        return a.username.localeCompare(b.username);
      }
      return b.username.localeCompare(a.username);
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortEmail = () => {
    const sortedUsers = [...users].sort((a, b) => {
      // Always keep admin on top
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;

      // Sort by email if both are admin or both are not admin
      if (sortEmail === "desc") {
        return a.email.localeCompare(b.email);
      }
      return b.email.localeCompare(a.email);
    });
    setUsers(sortedUsers);
    setSortEmail(sortEmail === "asc" ? "desc" : "asc");
  };

  const getSingleUser = (userId) => {
    const user = users.find((user) => user._id === userId);
    navigate(`/users/edit/${userId}`, { state: { singleUser: user } });
  };

  const clearFilters = () => {
    const defaultFilters = {
      role: "",
      status: "",
      gender: "",
      page: 1,
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    setShowFilters(false);
    setKeyword("");
    setSortOrder("desc");
    setSortEmail("desc");
  };

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/users/filter`, {
        params: {
          limit: 10,
          page: filters.page,
          role: filters.role,
          status: filters.status,
          gender: filters.gender,
        },
      });
      const result = res.data;
      if (result.success) {
        // Sort users to keep admins on top
        const sortedUsers = result.data.sort((a, b) => {
          if (a.role === "admin" && b.role !== "admin") return -1;
          if (a.role !== "admin" && b.role === "admin") return 1;
          return 0;
        });
        setPage(result.pagination);
        setUsers(sortedUsers);
      }
    } catch (error) {
      return toastError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      if (keyword.length > 0) {
        handleSearch(keyword);
      } else {
        fetchUsers();
      }
    }, 1000);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [keyword, filters]);

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className={cx("users-page")}>
      <div className={cx("users-header")}>
        <h2>Users List</h2>
        <div className={cx("header-actions")}>
          <button
            className={cx("filter-btn", { active: showFilters })}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            Filters
          </button>
          <button
            className={cx("add-btn")}
            onClick={() => navigate("/users/add")}
          >
            Add New User
          </button>
        </div>
      </div>

      <div className={cx("search-bar")}>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {showFilters && (
        <div className={cx("filters-section")}>
          <div className={cx("filters-grid")}>
            <div className={cx("filter-group")}>
              <label>Role</label>
              <select
                name="role"
                value={tempFilters.role}
                onChange={handleFilterChange}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className={cx("filter-group")}>
              <label>Status</label>
              <select
                name="status"
                value={tempFilters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className={cx("filter-group")}>
              <label>Gender</label>
              <select
                name="gender"
                value={tempFilters.gender}
                onChange={handleFilterChange}
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className={cx("filter-actions")}>
            <button className={cx("clear-filters-btn")} onClick={clearFilters}>
              Clear Filters
            </button>
            <button
              className={cx("apply-filters-btn")}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <div className={cx("users-table")}>
        {isLoading && <Loading />}
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th onClick={handleSortName} style={{ cursor: "pointer" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  Name {sortOrder === "asc" ? <BiSortAZ /> : <BiSortZA />}
                </div>
              </th>
              <th onClick={handleSortEmail} style={{ cursor: "pointer" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  Email {sortEmail === "asc" ? <BiSortAZ /> : <BiSortZA />}
                </div>
              </th>
              <th>Role</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img src={user?.avatar} alt={user?.name} />
                  </td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>
                    <span
                      className={cx("role-badge", user?.role.toLowerCase())}
                    >
                      {user?.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={cx(
                        "gender-badge",
                        user?.gender?.toLowerCase() || "other"
                      )}
                    >
                      {user?.gender || "Other"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={cx(
                        "status-badge",
                        user?.status?.toLowerCase() || "inactive"
                      )}
                    >
                      {user?.status}
                    </span>
                  </td>
                  <td>
                    <div className={cx("action-buttons")}>
                      {user.role !== "admin" && (
                        <>
                          <button
                            className={cx("edit-btn")}
                            onClick={() => getSingleUser(user._id)}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className={cx("delete-btn")}
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className={cx("no-results")}>
                  Không tìm thấy kết quả nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {users.length > 0 && (
        <Pagination
          currentPage={page.currentPage}
          totalPages={page.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Users;
