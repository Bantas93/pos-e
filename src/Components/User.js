import { Button, Table, Modal, Form } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import NavbarList from "./NavbarList";
import { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";
import { response, deletedResponse } from "../utils/Reponse";
import { updatedResponse } from "../utils/Reponse";

const User = () => {
  const handleLogin = localStorage.username;
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal start
  const [nama, setNama] = useState(dataUser.username);
  const [password, setPassword] = useState(dataUser.password);
  const [selectedRole, setSelectedRole] = useState(dataUser.hakAksesValue);
  const [show, setShow] = useState(false);
  const [submitData, setSubmitData] = useState();
  const handleClose = () => setShow(false);
  const handleCloseSubmit = async () => {
    if (!nama || !password || !selectedRole) {
      window.alert("Data harus lengkap !");
    } else {
      const accept = window.confirm("Yakin ingin update?");
      if (accept) {
        const pushData = {
          username: nama,
          password: password,
          hakAkses: selectedRole,
        };
        await updatedResponse("PATCH", `user/${submitData.username}`, pushData);
        window.alert("User Berhasil di Update");
        setShow(false);
        window.location.reload();
      }
    }
  };
  const handleShow = (user) => {
    console.log(user);
    setShow(true);
    setSubmitData(user);
  };

  // Modal end

  const handleClick = (user) => {
    navigate("/UpdateUser", { state: { user } });
  };

  const Delete = async (id) => {
    await deletedResponse("DELETE", `user/${id}`);
    window.alert(`User deleted successfully.`);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await response("GET", "user");
      setDataUser(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const result = window.confirm(`yakin hapus ${id} ?`);
    if (result) {
      Delete(id);
    } else {
      redirect();
    }
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <>
      <NavbarList />

      <div className="container">
        <h1 className="text-white">User Management</h1>
        <div className="container">
          <Button
            as={Link}
            to={{
              pathname: "/RegistrasiUser",
            }}
            className="m-1 ps-3 pe-3"
            variant="primary"
          >
            Add User
            <TiUserAddOutline className="ms-3" />
          </Button>
        </div>
        <div className="m-3">
          {loading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <Table className="text-center" data-bs-theme="dark" responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map((user, id) => (
                  <tr key={user.userId}>
                    <th>{id + 1}</th>
                    <td>{user.hakAkses}</td>
                    <td>{user.username}</td>
                    <td>{user.createdDate}</td>
                    <td>
                      <Button
                        className="m-1"
                        variant="danger"
                        onClick={() => handleDelete(user.username)}
                      >
                        <TiUserDeleteOutline />
                      </Button>
                      <Button
                        onClick={() => handleClick(user)}
                        className="m-1"
                        variant="primary"
                      >
                        <LiaUserEditSolid />
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(user)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className="text-light"
          data-bs-theme="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" id="inputNama">
              <p>Username</p>
              <Form.Control
                name="nama"
                type="text"
                placeholder="New username"
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="password">
              <p>Password</p>
              <Form.Control
                name="Password"
                type="password"
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="d-flex justify-content-center"
              id="inputRole"
            >
              <p className="p-2">Role :</p>
              <Form.Text>
                <select
                  name="selectedRole"
                  className="ms-2 btn btn-secondary"
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  <option>SELECT ...</option>
                  <option value={1}>ADMIN</option>
                  <option value={2}>SALES</option>
                </select>
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default User;
