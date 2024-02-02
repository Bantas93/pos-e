import NotLogin from "./NotLogin";
import { useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { updatedResponse } from "../utils/Reponse";

const UpdateUser = () => {
  const handleLogin = localStorage.username;
  const location = useLocation();
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
    const submitData = {
      username: nama,
      password: password,
      hakAkses: selectedRole,
    };
    await updatedResponse("PATCH", `user/${data.username}`, submitData);
    window.alert("User Berhasil di Update");
    navigate("/User");
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <section className="row d-flex justify-content-center align-items-center m-5">
        <Card className="shadow CardW" data-bs-theme="dark">
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
