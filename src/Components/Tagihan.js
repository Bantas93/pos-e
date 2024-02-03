import { useState, useEffect } from "react";
import NavbarList from "./NavbarList";
import { Button, Table, Form, Dropdown, Modal } from "react-bootstrap";
import { Link, redirect } from "react-router-dom";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import NotLogin from "./NotLogin";
import { response, deletedResponse, updatedResponse } from "../utils/Reponse";
import Bulan from "../utils/Bulan";

const Tagihan = () => {
  const handleLogin = localStorage.username;
  const [dataTagihan, setDataTagihan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Start
  const [bulanTagih, setBulanTagih] = useState();
  const [tahunTagih, setTahunTagih] = useState(dataTagihan.tahunTagihan);
  const [total, setTotal] = useState(dataTagihan.totalPemakaian);
  const [show, setShow] = useState(false);
  const [submitData, setSubmitData] = useState(dataTagihan);
  const handleClose = () => setShow(false);
  const handleCloseSubmit = async () => {
    if (!bulanTagih || !tahunTagih || !total) {
      window.alert("Data harus lengkap !");
    } else {
      const accept = window.confirm("Yakin ingin update?");
      if (accept) {
        const pushData = {
          noMeter: dataTagihan.noMeter,
          nama: dataTagihan.nama,
          bulanTagihan: bulanTagih.value,
          tahunTagihan: tahunTagih,
          totalPemakaian: total,
        };
        await updatedResponse(
          "PATCH",
          `tagihan/${submitData.idTagihan}`,
          pushData
        );
        window.alert("Pelanggan berhasil di update");
        setShow(false);
        window.location.reload();
      }
    }
  };
  const handleShow = (user) => {
    setShow(true);
    setSubmitData(user);
  };
  // Modal End

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
        <div className="container">
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
        <div className="m-3">
          {loading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <Table className="text-center" data-bs-theme="dark" responsive="sm">
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
                        onClick={() => handleShow(user)}
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
            <Modal.Title>Update Tagihan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" id="meter">
              <p>No Meter</p>
              <h3>{submitData.noMeter}</h3>
            </Form.Group>

            <Form.Group className="mb-3" id="nama">
              <p>Nama</p>
              <h3>{submitData.nama}</h3>
            </Form.Group>

            <div className="mb-3" id="bulanTagih">
              <p>Bulan Tagihan</p>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {bulanTagih ? bulanTagih.nama : "Pilih Bulan"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Bulan
                    ? Bulan().map((bulan) => (
                        <Dropdown.Item
                          key={bulan.value}
                          onClick={() => setBulanTagih(bulan)}
                        >
                          {bulan.nama}
                        </Dropdown.Item>
                      ))
                    : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Form.Group className="mb-3" id="inputTahunTagih">
              <p>Tahun Tagihan</p>
              <Form.Control
                name="tahunTagih"
                type="number"
                placeholder="type here..."
                onChange={(e) => setTahunTagih(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="totalPemakaian">
              <p>Total pemakaian</p>
              <Form.Control
                name="totalPemakaian"
                type="number"
                placeholder="type here..."
                onChange={(e) => setTotal(e.target.value)}
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

export default Tagihan;
