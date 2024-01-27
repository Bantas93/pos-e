import { SiAlienware } from "react-icons/si";

const NotFound = () => {
  return (
    <div className="container p-5 text-white">
      <div
        style={{
          fontSize: "15Rem",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          color: "red",
        }}
      >
        <SiAlienware className="shadow" style={{ borderRadius: "100%" }} />
      </div>

      <h1 className="text-center m-5">Error!</h1>
      <hr></hr>
      <h1 className="text-center">Harap periksa alamat url anda !</h1>
    </div>
  );
};

export default NotFound;
