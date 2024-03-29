import { Button, Table, Form, Modal } from "react-bootstrap";
import { Link, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarList from "./NavbarList";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";
import { response, deletedResponse, updatedResponse } from "../utils/Reponse";

const Pelanggan = () => {
  const handleLogin = localStorage.username;
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Start
  const kodeTarif = dataPelanggan.kodeTarif;
  const [nama, setNama] = useState(dataPelanggan.nama);
  const [alamat, setAlamat] = useState(dataPelanggan.alamat);
  const [show, setShow] = useState(false);
  const [submitData, setSubmitData] = useState(dataPelanggan);
  const handleClose = () => setShow(false);
  const handleCloseSubmit = async () => {
    if (!nama || !alamat) {
      window.alert("Data harus lengkap !");
    } else {
      const accept = window.confirm("Yakin ingin update?");
      if (accept) {
        const pushData = {
          kodeTarif: kodeTarif,
          nama: nama,
          alamat: alamat,
        };
        await updatedResponse(
          "PATCH",
          `pelanggan/${submitData.noMeter}`,
          pushData
        );
        window.alert("Pelanggan berhasil di update");
        setShow(false);
        window.location.reload();
      }
    }
  };
  const handleShow = (pelanggan) => {
    setShow(true);
    setSubmitData(pelanggan);
  };
  // Modal End

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
                        onClick={() => handleShow(pelanggan)}
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
        <Modal
          show={show}
          onHide={handleClose}
          className="text-light"
          data-bs-theme="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Pelanggan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" id="meter">
              <p>No Meter</p>
              <h3>{submitData.noMeter}</h3>
            </Form.Group>

            <Form.Group className="mb-3" id="meter">
              <p>Kode Tarif</p>
              <h3>{submitData.kodeTarif}</h3>
            </Form.Group>

            <Form.Group className="mb-3" id="inputNama">
              <p>Nama Pelanggan</p>
              <Form.Control
                name="nama"
                type="text"
                placeholder="type here..."
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="alamat">
              <p>Alamat</p>
              <Form.Control
                name="alamat"
                type="text"
                placeholder="type here..."
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Pelanggan;
