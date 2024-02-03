import { Button, Table } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import NavbarList from "./NavbarList";
import { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";
import { response, deletedResponse } from "../utils/Reponse";

const User = () => {
  const handleLogin = localStorage.username;
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
