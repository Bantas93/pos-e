import NotLogin from "./NotLogin";
import { useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Card, Form } from "react-bootstrap";

const UpdateUser = () => {
  const handleLogin = localStorage.username;
  let location = useLocation();
  const navigate = useNavigate();
  const data = location.state.user;
  const [nama, setNama] = useState(data.username);
  const [password, setPassword] = useState(data.password);
  const [selectedRole, setSelectedRole] = useState(data.hakAksesValue);

  const handleSubmit = () => {
    if (!nama || !password) {
      window.alert("Username dan Password harus diisi");
      return;
    } else {
      const accept = window.confirm("Yakin ingin update ?");
      if (accept) {
        submit();
      } else {
        redirect();
      }
    }
  };

  const submit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/user/${data.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: nama,
            password: password,
            hakAkses: selectedRole,
          }),
        }
      );

      if (response.ok) {
        window.alert("User Berhasil di Update");
        navigate("/User");
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <section className="row d-flex justify-content-center align-items-center m-5">
        <Card style={{ width: "22rem" }} className="shadow">
          <Card.Body>
            <Card.Title className="text-center">Update User</Card.Title>
            <hr className="mt-4"></hr>
            <Form.Group className="mb-3" id="inputNama">
              <p>Username</p>
              <Form.Control
                name="nama"
                type="text"
                placeholder="type here..."
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="password">
              <p>Password</p>
              <Form.Control
                name="Password"
                type="password"
                placeholder="type here..."
                onChange={(e) => setPassword(e.target.value)}
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
                  className="ms-2"
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  <option value={2}>SALES</option>
                  <option value={1}>ADMIN</option>
                </select>
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Card.Link href="/User" className="btn btn-danger">
                Kembali
              </Card.Link>
              <Card.Link className="btn btn-primary" onClick={handleSubmit}>
                Update
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default UpdateUser;
