import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NotLogin from "./components/NotLogin";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import UpdateUser from "./components/UpdateUser";
import RegistrasiUser from "./components/RegistrasiUser";
import Pelanggan from "./components/Pelanggan";
import TambahPelanggan from "./components/TambahPelanggan";
import UpdatePelanggan from "./components/UpdatePelanggan";
import Tagihan from "./components/Tagihan";
import TambahTagihan from "./components/TambahTagihan";
import UpdateTagihan from "./components/UpdateTagihan";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/NotLogin" element={<NotLogin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/RegistrasiUser" element={<RegistrasiUser />} />
          <Route path="/Pelanggan" element={<Pelanggan />} />
          <Route path="/TambahPelanggan" element={<TambahPelanggan />} />
          <Route path="/UpdatePelanggan" element={<UpdatePelanggan />} />
          <Route path="/Tagihan" element={<Tagihan />} />
          <Route path="/TambahTagihan" element={<TambahTagihan />} />
          <Route path="/UpdateTagihan" element={<UpdateTagihan />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
