import { Link } from "react-router-dom";

const NotLogin = () => {
  return (
    <div className="container">
      <h1 className="text-center m-5">
        Anda Belum Login !<hr></hr>
        <Link to="/">Klik untuk Login</Link>
      </h1>
    </div>
  );
};

export default NotLogin;
