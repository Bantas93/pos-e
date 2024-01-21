import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
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

      <h1 className="text-center m-5">Halaman tidak ditemukan !</h1>
      <hr></hr>
      <h1 className="text-center">Periksa Url !</h1>
    </div>
  );
};

export default NotFound;
