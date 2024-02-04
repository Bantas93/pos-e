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

      <div className="container text-white">
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <h3 className="text-center">Wellcome Back,{handleLogin}</h3>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
