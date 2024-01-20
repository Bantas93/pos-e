import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(0);
  const [dataUser, setDataUser] = useState({});
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  function submit() {
    // console.log(inputUsername);
    // console.log(inputPassword);
    console.log(dataUser);
    // localStorage.setItem("userData", JSON.stringify(dataUser));
    navigate("/Dashboard");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/user");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setDataUser(data);
        console.log();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="container-fluid d-flex flex-column align-items-center bg-login">
      <section
        className="card shadow-lg p-4 mb-2 bg-body-tertiary rounded "
        style={{ width: "22rem", opacity: "95%", marginTop: "120px" }}
      >
        <div className="card-body">
          <h4 className="text-center" style={{ letterSpacing: "2px" }}>
            LOGIN
          </h4>
          <hr />
          <div className="mb-3">
            <p>Username</p>
            <input
              id="inputUsername"
              value={inputUsername}
              type="text"
              className="form-control"
              onChange={(e) => setInputUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <p>Password</p>
            <input
              id="inputPassword"
              value={inputPassword}
              type="password"
              className="form-control"
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary m-2" onClick={submit}>
              Login
            </button>
          </div>
        </div>
        <p
          className="text-dark text-center"
          style={{ letterSpacing: "1px", fontWeight: "bold" }}
        >
          Belum punya akun ?
          <Link to="/" style={{ color: "green" }}>
            klik disini
          </Link>
        </p>
      </section>
    </main>
  );
};
export default Login;
