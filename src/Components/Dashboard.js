import { Container, Navbar, Nav, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NotLogin from "./NotLogin";

const Dashboard = () => {
  const handleLogin = localStorage.getItem("username");
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "",
      textDecoration: isActive ? "none" : "none",
      fontWeight: isActive ? "bold" : "",
    };
  };

  if (handleLogin == null) {
    console.log(handleLogin);
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
              <Nav.Link as={NavLink} to="/UserManagement" style={navLinkStyles}>
                User Management
              </Nav.Link>
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
        <div className="d-flex justify-content-center align-items-center mt-5">
          <h3 className="text-center" style={{ fontSize: "3Rem" }}>
            Wellcome Back,
            <Card className="mt-5 p-5 shadow">
              <h1 style={{ fontSize: "5Rem" }}>{handleLogin}</h1>
            </Card>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
