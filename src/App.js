import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import UserManagement from "./Components/UserManagement";
import UpdateUser from "./Components/UpdateUser";
import RegistrasiUser from "./Components/RegistrasiUser";
import Pelanggan from "./Components/Pelanggan";
import TambahPelanggan from "./Components/TambahPelanggan";
import UpdatePelanggan from "./Components/UpdatePelanggan";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} id="/" />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/RegistrasiUser" element={<RegistrasiUser />} />
          <Route path="/Pelanggan" element={<Pelanggan />} />
          <Route path="/TambahPelanggan" element={<TambahPelanggan />} />
          <Route path="/UpdatePelanggan" element={<UpdatePelanggan />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
