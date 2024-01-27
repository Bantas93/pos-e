import { Button } from "react-bootstrap";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarList from "./NavbarList";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/pelanggan");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setDataPelanggan(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
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
            {loading ? (
              <>
                <div className="loader"></div>
              </>
            ) : (
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
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Pelanggan;
