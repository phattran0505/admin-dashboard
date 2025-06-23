import ClipLoader from "react-spinners/ClipLoader";

function Loader({ isloading, color }) {
  return (
    <ClipLoader
      color={color || "#000"}
      size={18}
      loading={isloading}
      speedMultiplier={1}
    ></ClipLoader>
  );
}

export default Loader;
