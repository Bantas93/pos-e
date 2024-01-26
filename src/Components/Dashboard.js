import { Card } from "react-bootstrap";
import NotLogin from "./NotLogin";
import NavbarList from "./NavbarList";
const Dashboard = () => {
  const handleLogin = localStorage.getItem("username");
  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <>
      <NavbarList />
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <h3 className="text-center" style={{ fontSize: "3Rem" }}>
            Wellcome Back,
          </h3>
          <div className="d-flex jusstify-content-center align-items-center">
            <Card className="mt-5 p-5 shadow">
              <h1 style={{ fontSize: "5Rem" }}>{handleLogin}</h1>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
