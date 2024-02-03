import { Button, Table } from "react-bootstrap";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarList from "./NavbarList";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";
import { deletedResponse, response } from "../utils/Reponse";

const Pelanggan = () => {
  const handleLogin = localStorage.username;
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (pelanggan) => {
    navigate("/UpdatePelanggan", { state: { pelanggan } });
  };

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
    await deletedResponse("DELETE", `pelanggan/${id}`);
    window.alert(`Pelanggan deleted successfully.`);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await response("GET", "pelanggan");
      setDataPelanggan(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <>
      <NavbarList />

      <div className="container">
        <h1 className="text-white">Daftar Pelanggan</h1>
        <div className="container">
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
        <div className="m-3">
          {loading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <Table className="text-center" data-bs-theme="dark" responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pelanggan</th>
                  <th>Alamat</th>
                  <th>No Meter</th>
                  <th>Kode Tarif</th>
                  <th>Beban</th>
                  <th>Tarif Per Kwh</th>
                  <th>Action</th>
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
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default Pelanggan;
