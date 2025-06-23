import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

function Loading() {
  return (
    <div className={cx("loading-overlay")}>
      <div className={cx("spinner")}>
        <div className={cx("double-bounce1")}></div>
        <div className={cx("double-bounce2")}></div>
      </div>
    </div>
  );
}

export default Loading;
