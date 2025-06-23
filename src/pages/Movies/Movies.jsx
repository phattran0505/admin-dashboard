import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { useEffect, useState, useCallback } from "react";
import { BiSortAZ, BiSortZA, BiSortUp, BiSortDown } from "react-icons/bi";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import classNames from "classnames/bind";
import axios from "axios";

import { filterCategories } from "../../assets/data";
import { toastError } from "../../shared/Toastify";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import styles from "./Movies.module.scss";

const cx = classNames.bind(styles);

function Movies() {
  const navigate = useNavigate();
  const [page, setPage] = useState({});
  const [keyword, setKeyword] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortYear, setSortYear] = useState("desc");
  const [sortRating, setSortRating] = useState("desc");

  const [filters, setFilters] = useState({
    genres: "hanh-dong",
    country: "",
    year: "",
    page: 1,
  });
  const [tempFilters, setTempFilters] = useState({
    genres: "hanh-dong",
    country: "",
    year: "",
  });

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

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    setSortOrder("desc");
    setSortYear("desc");
    setSortRating("desc");
    // Scroll to table
    const tableElement = document.querySelector(`.${cx("movies-table")}`);
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearch = async (searchKeyword) => {
    if (!searchKeyword.trim()) {
      fetchMovies();
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${searchKeyword}`,
        {
          params: {
            category: filters.genres,
            country: filters.country,
            year: filters.year,
            page: 1,
          },
        }
      );
      const result = res.data.data;
      setPage(result.params.pagination);
      setMovies(result.items);
    } catch (error) {
      return toastError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortName = () => {
    const sortedMoves = [...movies].sort((a, b) => {
      if (sortOrder === "desc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setMovies(sortedMoves);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortYear = () => {
    const sortedMoves = [...movies].sort((a, b) =>
      sortYear === "desc" ? a.year - b.year : b.year - a.year
    );
    setMovies(sortedMoves);
    setSortYear(sortYear === "asc" ? "desc" : "asc");
  };

  const handleSortRating = () => {
    const sortedMoves = [...movies].sort((a, b) =>
      sortRating === "desc"
        ? Number(a.tmdb.vote_average) - Number(b.tmdb.vote_average)
        : Number(b.tmdb.vote_average) - Number(a.tmdb.vote_average)
    );
    setMovies(sortedMoves);
    setSortRating(sortRating === "asc" ? "desc" : "asc");
  };

  const clearFilters = () => {
    const defaultFilters = {
      genres: "hanh-dong",
      country: "",
      year: "",
      page: 1,
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    setShowFilters(false);
    setKeyword("");
    setSortOrder("desc");
    setSortYear("desc");
    setSortRating("desc");
  };

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://phimapi.com/v1/api/the-loai/${filters.genres}`,
        {
          params: {
            page: filters.page,
            country: filters.country,
            year: filters.year,
          },
        }
      );
      const result = res.data.data;
      setPage(result.params.pagination);
      setMovies(result.items);
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
        fetchMovies();
      }
    }, 1000); // Đợi 1 giây sau khi ngừng nhập

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [keyword, filters]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className={cx("movies-page")}>
      <div className={cx("movies-header")}>
        <h2>Movies List</h2>
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
            onClick={() => navigate("/movies/add")}
          >
            Add New Movie
          </button>
        </div>
      </div>

      <div className={cx("search-bar")}>
        <input
          type="text"
          placeholder="Search movies..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {showFilters && (
        <div className={cx("filters-section")}>
          <div className={cx("filters-grid")}>
            {filterCategories.map((category, index) => (
              <div className={cx("filter-group")} key={index}>
                <label style={{ textTransform: "capitalize" }}>
                  {category.name}
                </label>
                <select
                  name={category.name}
                  value={tempFilters[category.name]}
                  onChange={handleFilterChange}
                >
                  {category.categories.map((item, index) => (
                    <option key={index} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
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

      <div className={cx("movies-table")}>
        {isLoading && <Loading />}
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th onClick={handleSortName} style={{ cursor: "pointer" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  Title
                  {sortOrder === "asc" ? <BiSortAZ /> : <BiSortZA />}
                </div>
              </th>
              <th>Genre</th>
              <th onClick={handleSortYear} style={{ cursor: "pointer" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  Year
                  {sortYear === "asc" ? <BiSortUp /> : <BiSortDown />}
                </div>
              </th>
              <th onClick={handleSortRating} style={{ cursor: "pointer" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  Rating
                  {sortRating === "asc" ? <BiSortUp /> : <BiSortDown />}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <img
                      src={`https://phimimg.com/${movie?.thumb_url}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = movie?.poster_url;
                      }}
                      alt={""}
                    />
                  </td>
                  <td>{movie?.name}</td>
                  <td className={cx("genre-cell")}>
                    {movie?.category.map((cat) => cat?.name).join(", ")}
                  </td>
                  <td>{movie?.year}</td>
                  <td>{Number(movie?.tmdb?.vote_average).toFixed(1)}</td>
                  <td>
                    <div className={cx("action-buttons")}>
                      <button className={cx("edit-btn")}>
                        <FiEdit2 />
                      </button>
                      <button className={cx("delete-btn")}>
                        <FiTrash2 />
                      </button>
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

      {movies.length > 0 && (
        <Pagination
          currentPage={page.currentPage}
          totalPages={page.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Movies;
