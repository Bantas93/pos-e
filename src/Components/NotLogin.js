import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const NotLogin = () => {
  return (
    <div className="container p-5">
      <div
        style={{
          fontSize: "15Rem",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          color: "red",
        }}
      >
        <MdErrorOutline className="shadow" style={{ borderRadius: "100%" }} />
      </div>

      <h1 className="text-center m-5">Anda belum Login !</h1>
      <hr></hr>
      <Link to="/" className="text-center">
        <h1>Klik disini</h1>
      </Link>
    </div>
  );
};

export default NotLogin;
