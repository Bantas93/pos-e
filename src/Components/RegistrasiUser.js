import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import NotLogin from "./NotLogin";

const RegistrasiUser = () => {
  const handleLogin = localStorage.username;
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [selectedRole, setSelectedRole] = useState(2);

  const submit = () => {
    if (!username || !password) {
      window.alert("Username dan Password harus diisi");
      return;
    }
    fetchUserData();
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          hakAkses: selectedRole,
        }),
      });

      if (response.ok) {
        await response.json();
        window.alert("User berhasil di POST !");
        window.location.href = "/User";
      } else {
        window.alert("Data sudah ada !");
        console.error("Gagal:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <section className="row d-flex justify-content-center align-items-center m-5">
        <Card className="shadow CardW" data-bs-theme="dark">
          <Card.Body>
            <Card.Title className="text-center">Registrasi User</Card.Title>
            <hr className="mt-4"></hr>
            <Form.Group className="mb-3" id="inputUsername">
              <p>Username</p>
              <Form.Control
                name="username"
                type="text"
                placeholder="type here..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" id="inputPassword">
              <p>Password</p>
              <Form.Control
                name="password"
                type="password"
                placeholder="type here..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="d-flex justify-content-center"
              id="inputRole"
            >
              <p>Hak Akses :</p>
              <Form.Text>
                <select
                  name="selectedRole"
                  value={selectedRole}
                  className="ms-2"
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  <option id="sales" value={2}>
                    SALES
                  </option>
                  <option id="admin" value={1}>
                    ADMIN
                  </option>
                </select>
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Card.Link href="/User" className="btn btn-danger">
                Kembali
              </Card.Link>
              <Card.Link className="btn btn-primary" onClick={submit}>
                Submit
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default RegistrasiUser;
