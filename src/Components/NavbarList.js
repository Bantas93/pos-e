import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const NavbarList = () => {
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

  return (
    <div>
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
      ;
    </div>
  );
};

export default NavbarList;
