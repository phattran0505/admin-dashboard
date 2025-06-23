import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import styles from "./AddNewMovie.module.scss";
const cx = classNames.bind(styles);
// Sample categories and countries data
const CATEGORIES = [
  {
    name: "Hành Động",
    slug: "hanh-dong",
  },
  {
    name: "Tình Cảm",
    slug: "tinh-cam",
  },
  {
    name: "Cổ Trang",
    slug: "co-trang",
  },
  {
    name: "Viễn Tưởng",
    slug: "vien-tuong",
  },
  { name: "Kinh Dị", slug: "kinh-di" },
  {
    name: "Hài Hước",
    slug: "hai-huoc",
  },
];

const COUNTRIES = [
  {
    name: "Trung Quốc",
    slug: "trung-quoc",
  },
  {
    name: "Hàn Quốc",
    slug: "han-quoc",
  },
  {
    name: "Nhật Bản",
    slug: "nhat-ban",
  },
  {
    name: "Thái Lan",
    slug: "thai-lan",
  },
  { name: "Âu Mỹ", slug: "au-my" },
  {
    name: "Đài Loan",
    slug: "dai-loan",
  },
  {
    name: "Việt Nam",
    slug: "viet-nam",
  },
];

function AddNewMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    slug: "",
    origin_name: "",
    type: "series",
    poster_url: "",
    thumb_url: "",
    sub_docquyen: false,
    time: "",
    episode_current: "",
    quality: "HD",
    lang: "",
    year: new Date().getFullYear(),
    category: [],
    country: [],
    posterPreview: null,
    thumbPreview: null,
    content: "",
    video_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Generate slug automatically from name
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");

      setMovie((prev) => ({
        ...prev,
        name: value,
        slug: slug,
      }));
    } else {
      setMovie((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => {
        const [name, slug] = option.value.split("|");
        return { name, slug };
      });

    setMovie((prev) => ({
      ...prev,
      [name]: selectedValues,
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewField =
        field === "poster_url" ? "posterPreview" : "thumbPreview";
      const reader = new FileReader();

      reader.onloadend = () => {
        setMovie((prev) => ({
          ...prev,
          [field]: file,
          [previewField]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/movies");
  };

  return (
    <div className={cx("add-movie-container")}>
      <div className={cx("form-header")}>
        <h2>Thêm Phim Mới</h2>
        <Link to="/movies" className={cx("back-button")}>
          <MdOutlineKeyboardArrowLeft size={20} />
          Back
        </Link>
      </div>

      <form className={cx("add-movie-form")} onSubmit={handleSubmit}>
        <div className={cx("form-grid")}>
          <div className={cx("form-column")}>
            <div className={cx("form-group")}>
              <label htmlFor="name">Tên Phim</label>
              <input
                type="text"
                id="name"
                name="name"
                value={movie.name}
                onChange={handleInputChange}
                required
                placeholder="Nhập tên phim"
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="origin_name">Tên Gốc</label>
              <input
                type="text"
                id="origin_name"
                name="origin_name"
                value={movie.origin_name}
                onChange={handleInputChange}
                required
                placeholder="Tên gốc của phim"
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={movie.slug}
                onChange={handleInputChange}
                required
                readOnly
                placeholder="Tự động tạo từ tên phim"
              />
              <small>Slug sẽ tự động tạo từ tên phim</small>
            </div>

            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label htmlFor="type">Loại Phim</label>
                <select
                  id="type"
                  name="type"
                  value={movie.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="series">Series (Phim Bộ)</option>
                  <option value="single">Single (Phim Lẻ)</option>
                  <option value="hoathinh">Hoạt Hình</option>
                  <option value="tvshow">TV Show</option>
                </select>
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="year">Năm Phát Hành</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={movie.year}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label htmlFor="quality">Chất Lượng</label>
                <select
                  id="quality"
                  name="quality"
                  value={movie.quality}
                  onChange={handleInputChange}
                  required
                >
                  <option value="HD">HD</option>
                  <option value="SD">SD</option>
                  <option value="HDCam">HDCam</option>
                  <option value="FHD">FHD</option>
                  <option value="4K">4K</option>
                </select>
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="lang">Ngôn Ngữ</label>
                <input
                  type="text"
                  id="lang"
                  name="lang"
                  value={movie.lang}
                  onChange={handleInputChange}
                  required
                  placeholder="VN, Vietsub, Thuyết minh..."
                />
              </div>
            </div>

            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label htmlFor="time">Thời Lượng</label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={movie.time}
                  onChange={handleInputChange}
                  placeholder="45 phút/tập"
                />
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="episode_current">Số Tập</label>
                <input
                  type="text"
                  id="episode_current"
                  name="episode_current"
                  value={movie.episode_current}
                  onChange={handleInputChange}
                  placeholder="Hoàn Tất (30/30)"
                />
              </div>
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="content">Nội Dung Phim</label>
              <textarea
                id="content"
                name="content"
                value={movie.content}
                onChange={handleInputChange}
                required
                placeholder="Nhập nội dung phim"
                className={cx("content-textarea")}
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="video_url">URL Video</label>
              <div className={cx("video-url-input")}>
                <input
                  type="text"
                  id="video_url"
                  name="video_url"
                  value={movie.video_url}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập URL video (ví dụ: https://player.phimapi.com/player/?url=...)"
                  className={cx("url-input")}
                />
                <button type="button" className={cx("preview-button")} onClick={() => window.open(movie.video_url, '_blank')}>
                  Xem trước
                </button>
              </div>
              <small className={cx("url-hint")}>URL video phải bắt đầu bằng https://player.phimapi.com/player/?url=</small>
            </div>
            
            <div className={cx("form-group")}>
              <label htmlFor="category">Thể Loại</label>
              <select
                id="category"
                name="category"
                multiple
                size="5"
                onChange={handleMultiSelectChange}
                required
                className={cx("multi-select")}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={`${cat.name}|${cat.slug}`}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <small>
                Nhấn Ctrl (hoặc Command trên Mac) để chọn nhiều thể loại
              </small>
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="country">Quốc Gia</label>
              <select
                id="country"
                name="country"
                multiple
                size="3"
                onChange={handleMultiSelectChange}
                required
                className={cx("multi-select")}
              >
                {COUNTRIES.map((country) => (
                  <option
                    key={country.slug}
                    value={`${country.name}|${country.slug}`}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
              <small>
                Nhấn Ctrl (hoặc Command trên Mac) để chọn nhiều quốc gia
              </small>
            </div>
          </div>

          <div className={cx("form-column")}>
            <div className={cx("thumbnail-upload")}>
              <label>Poster (Ảnh dọc)</label>
              <div className={cx("thumbnail-preview", "poster-preview")}>
                {movie.posterPreview ? (
                  <img src={movie.posterPreview} alt="Movie poster preview" />
                ) : (
                  <div className={cx("upload-placeholder")}>
                    <span>Tải lên ảnh poster</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="poster_url"
                name="poster_url"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "poster_url")}
                className={cx("file-input")}
              />
              <label htmlFor="poster_url" className={cx("upload-button")}>
                Chọn Ảnh Poster
              </label>
              <div className={cx("form-group", "url-input")}>
                <label htmlFor="poster_url_direct">
                  Hoặc nhập URL Poster trực tiếp
                </label>
                <input
                  type="text"
                  id="poster_url_direct"
                  name="poster_url"
                  value={
                    typeof movie.poster_url === "string" ? movie.poster_url : ""
                  }
                  onChange={handleInputChange}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
            </div>

            <div className={cx("thumbnail-upload")}>
              <label>Thumbnail (Ảnh ngang)</label>
              <div className={cx("thumbnail-preview", "thumb-preview")}>
                {movie.thumbPreview ? (
                  <img src={movie.thumbPreview} alt="Movie thumbnail preview" />
                ) : (
                  <div className={cx("upload-placeholder")}>
                    <span>Tải lên ảnh thumbnail</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="thumb_url"
                name="thumb_url"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "thumb_url")}
                className={cx("file-input")}
              />
              <label htmlFor="thumb_url" className={cx("upload-button")}>
                Chọn Ảnh Thumbnail
              </label>
              <div className={cx("form-group", "url-input")}>
                <label htmlFor="thumb_url_direct">
                  Hoặc nhập URL Thumbnail trực tiếp
                </label>
                <input
                  type="text"
                  id="thumb_url_direct"
                  name="thumb_url"
                  value={
                    typeof movie.thumb_url === "string" ? movie.thumb_url : ""
                  }
                  onChange={handleInputChange}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={cx("form-actions")}>
          <button
            type="button"
            className={cx("cancel-button")}
            onClick={() => navigate("/movies")}
          >
            Hủy
          </button>
          <button type="submit" className={cx("submit-button")}>
            Thêm Phim
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewMovie;
