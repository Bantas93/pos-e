import { Link } from "react-router-dom";

const NotLogin = () => {
  return (
    <div>
      <h1>
        Anda Belum Login, <Link to="/">Klik untuk Login</Link>
      </h1>
    </div>
  );
};

export default NotLogin;
