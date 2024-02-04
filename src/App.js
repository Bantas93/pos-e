import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NotLogin from "./components/NotLogin";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import RegistrasiUser from "./components/RegistrasiUser";
import Pelanggan from "./components/Pelanggan";
import TambahPelanggan from "./components/TambahPelanggan";
import Tagihan from "./components/Tagihan";
import TambahTagihan from "./components/TambahTagihan";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/NotLogin" element={<NotLogin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/User" element={<User />} />
          <Route path="/RegistrasiUser" element={<RegistrasiUser />} />
          <Route path="/Pelanggan" element={<Pelanggan />} />
          <Route path="/TambahPelanggan" element={<TambahPelanggan />} />
          <Route path="/Tagihan" element={<Tagihan />} />
          <Route path="/TambahTagihan" element={<TambahTagihan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
