import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";

const Pelanggan = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "",
      textDecoration: isActive ? "none" : "none",
      fontWeight: isActive ? "bold" : "",
    };
  };

  const [dataPelanggan, setDataPelanggan] = useState([]);

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
              {dataPelanggan.map((user, id) => (
                <tr key={user.userId}>
                  <th>{id + 1}</th>
                  <th>{user.nama}</th>
                  <td>{user.alamat}</td>
                  <td>{user.noMeter}</td>
                  <td>{user.kodeTarif}</td>
                  <td>{user.beban}</td>
                  <td>{user.tarifPerKwh}</td>
                  <td>
                    <Button
                      as={Link}
                      to={{
                        pathname: "/UpdatePelanggan",
                        state: user.kodeTarif,
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

export default Pelanggan;
