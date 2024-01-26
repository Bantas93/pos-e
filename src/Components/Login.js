import { useState } from "react";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  function submit() {
    if (!inputUsername || !inputPassword) {
      window.alert("Data Harus Lengkap !");
      return;
    }
    fetchUserData();
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("username", inputUsername);
        localStorage.setItem("isLogin", result.isLogin);
        localStorage.setItem("lastLogin", result.lastLogin);
        localStorage.setItem("hakAksesValue", result.hakAksesValue);
        window.location.href = "/Dashboard";
      } else {
        window.alert("Data tidak ditemukan!");
        console.error("Gagal:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="container-fluid d-flex justify-content-center align-items-center bg-login">
      <section
        className="card shadow-lg p-4 mb-2 bg-body-tertiary rounded "
        style={{ width: "22rem", opacity: "95%" }}
      >
        <div className="card-body">
          <h4 className="text-center" style={{ letterSpacing: "10px" }}>
            POS-E
          </h4>
          <h6 className="text-center" style={{ letterSpacing: "2px" }}>
            Login User
          </h6>
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
      </section>
    </main>
  );
};
export default Login;
