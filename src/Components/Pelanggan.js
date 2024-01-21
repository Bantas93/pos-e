import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";

const Pelanggan = () => {
  const handleLogin = localStorage.username;

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "",
      textDecoration: isActive ? "none" : "none",
      fontWeight: isActive ? "bold" : "",
      border: isActive ? "1px dotted black" : "",
      borderRadius: isActive ? "10px" : "",
      padding: isActive ? "10px" : "",
      marginTop: isActive ? "5px" : "",
      boxShadow: isActive ? "0 0 5px rgba(0, 0, 0, 0.3)" : "",
    };
  };

  const [dataPelanggan, setDataPelanggan] = useState([]);
  const navigate = useNavigate();

  const handleClick = (pelanggan) => {
    navigate("/UpdatePelanggan", { state: { pelanggan } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/pelanggan");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setDataPelanggan(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const result = window.confirm(
      `Yakin hapus Pelanggan ini ? (no meter :${id})`
    );
    if (result) {
      Delete(id);
    } else {
      redirect();
    }
  };

  const Delete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/pelanggan/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        window.alert(`Pelanggan ${id} deleted successfully.`);
        window.location.reload();
      } else {
        console.error(`Failed to delete pelanggan. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

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
              {localStorage.getItem("hakAksesValue") === "1" ? (
                <Nav.Link as={NavLink} to="/User" style={navLinkStyles}>
                  User Management
                </Nav.Link>
              ) : (
                ""
              )}
              <Nav.Link as={NavLink} to="/Pelanggan" style={navLinkStyles}>
                Daftar Pelanggan
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Tagihan" style={navLinkStyles}>
                Daftar Tagihan
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/"
                style={navLinkStyles}
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
        <h1>Daftar Pelanggan</h1>
        <div className="container text-end">
          <Button
            as={Link}
            to={{
              pathname: "/TambahPelanggan",
            }}
            className="m-1 ps-3 pe-3"
            variant="primary"
          >
            Tambah Pelanggan
            <TiUserAddOutline className="ms-3" />
          </Button>
        </div>
        <div className="card border-dark p-5 m-3 shadow">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Pelanggan</th>
                <th scope="col">Alamat</th>
                <th scope="col">No Meter</th>
                <th scope="col">Kode Tarif</th>
                <th scope="col">Beban</th>
                <th scope="col">Tarif Per Kwh</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataPelanggan.map((pelanggan, id) => (
                <tr key={pelanggan.noMeter}>
                  <th>{id + 1}</th>
                  <th>{pelanggan.nama}</th>
                  <td>{pelanggan.alamat}</td>
                  <td>{pelanggan.noMeter}</td>
                  <td>{pelanggan.kodeTarif}</td>
                  <td>{pelanggan.beban}</td>
                  <td>{pelanggan.tarifPerKwh}</td>
                  <td>
                    <Button
                      className="m-1"
                      variant="danger"
                      onClick={() => handleDelete(pelanggan.noMeter)}
                    >
                      <TiUserDeleteOutline />
                    </Button>
                    <Button
                      onClick={() => handleClick(pelanggan)}
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

export default Pelanggan;
