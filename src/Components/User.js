import { Button } from "react-bootstrap";
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
  const [loading, setLoadinng] = useState(true);
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
      const data = await response("GEt", "user");
      setDataUser(data);
      setLoadinng(false);
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
        <div className="container text-end">
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
        <div className="card border-white p-5 m-3 shadow" data-bs-theme="dark">
          {loading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <table className="table text-center" data-bs-theme="dark">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Role</th>
                  <th scope="col">Name</th>
                  <th scope="col">Created</th>
                  <th scope="col">Action</th>
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
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
