import { useState, useEffect } from "react";
import NavbarList from "./NavbarList";
import { Button } from "react-bootstrap";
import { Link, useNavigate, redirect } from "react-router-dom";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";
import { response, deletedResponse } from "../utils/Reponse";

const Tagihan = () => {
  const handleLogin = localStorage.username;
  const [dataTagihan, setDataTagihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (user) => {
    navigate("/UpdateTagihan", { state: { user } });
  };

  const handleDelete = (id) => {
    const result = window.confirm(`Yakin hapus Tagihan ini ?`);
    if (result) {
      Delete(id);
    } else {
      redirect();
    }
  };

  const Delete = async (id) => {
    await deletedResponse("DELETE", `tagihan/${id}`);
    window.alert(`Tagihan deleted successfully.`);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await response("GET", "tagihan");
      setDataTagihan(data);
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
        <h1 className="text-white">Daftar Tagihan</h1>
        <div className="container text-end">
          <Button
            as={Link}
            to={{
              pathname: "/TambahTagihan",
            }}
            className="m-1 ps-3 pe-3"
            variant="primary"
          >
            Tambah Tagihan
            <TiUserAddOutline className="ms-3" />
          </Button>
        </div>
        <div className="card border-white p-5 m-3 shadow" data-bs-theme="dark">
          {loading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <table className="table text-center" data-bs-theme="dark">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Pelanggan</th>
                  <th scope="col">No Meter</th>
                  <th scope="col">Bulan Tagihan</th>
                  <th scope="col">Tahun Tagihan</th>
                  <th scope="col">Total Pemakaian</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataTagihan.map((user, id) => (
                  <tr key={user.idTagihan}>
                    <th>{id + 1}</th>
                    <th>{user.nama}</th>
                    <td>{user.noMeter}</td>
                    <td>{user.bulanTagihanName}</td>
                    <td>{user.tahunTagihan}</td>
                    <td>{user.totalPemakaian}</td>
                    <td>
                      <Button
                        className="m-1"
                        variant="danger"
                        onClick={() => handleDelete(user.idTagihan)}
                      >
                        <TiUserDeleteOutline />
                      </Button>
                      <Button
                        onClick={() => handleClick(user)}
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
          )}
        </div>
      </div>
    </>
  );
};

export default Tagihan;
