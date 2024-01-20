import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, Link, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";

const UserManagement = () => {
  const [dataUser, setDataUser] = useState([]);
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "",
      textDecoration: isActive ? "none" : "none",
      fontWeight: isActive ? "bold" : "",
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/user");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setDataUser(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
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
    // window.confirm(`yakin hapus ${id}`);
  };

  const Delete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.alert(`User ${id} deleted successfully.`);
        window.location.reload();
      } else {
        console.error(`Failed to delete user. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/Dashboard">Pos-E</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/Dashboard" style={navLinkStyles}>
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/UserManagement" style={navLinkStyles}>
                User Management
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Pelanggan" style={navLinkStyles}>
                Daftar Pelanggan
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
        <h1>User Management</h1>
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
        <div className="card border-dark p-5 m-3 shadow">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">User Id</th>
                <th scope="col">User</th>
                <th scope="col">Name</th>
                <th scope="col">Created</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((user, id) => (
                <tr key={user.userId}>
                  <th>{id + 1}</th>
                  <th>{user.userId}</th>
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
                      as={Link}
                      to={{
                        pathname: "/UpdateUser",
                        state: { updateUser: user },
                      }}
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
        </div>
      </div>
    </>
  );
};

export default UserManagement;
