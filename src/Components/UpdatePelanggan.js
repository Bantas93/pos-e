import NotLogin from "./NotLogin";
import { useLocation, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";

const UpdatePelanggan = () => {
  const handleLogin = localStorage.username;
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.pelanggan;
  const noMeter = data.noMeter;
  const kodeTarif = data.kodeTarif;
  const [nama, setNama] = useState(data.nama);
  const [alamat, setAlamat] = useState(data.alamat);

  const handleSubmit = () => {
    const accept = window.confirm("Yakin ingin update ?");
    if (accept) {
      submit();
    } else {
      redirect();
    }
  };

  const submit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/pelanggan/${noMeter}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kodeTarif: kodeTarif,
            nama: nama,
            alamat: alamat,
          }),
        }
      );

      if (response.ok) {
        window.alert("Pelanggan Berhasil di Update");
        navigate("/Pelanggan");
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <section className="row d-flex justify-content-center align-items-center m-5">
        <Card className="shadow CardW" data-bs-theme="dark">
          <Card.Body>
            <Card.Title className="text-center">Update Pelanggan</Card.Title>
            <hr className="mt-4"></hr>
            <Form.Group className="mb-3" id="meter">
              <p>No Meter</p>
              <h3>{data.noMeter}</h3>
            </Form.Group>

            <Form.Group className="mb-3" id="meter">
              <p>Kode Tarif</p>
              <h3>{data.kodeTarif}</h3>
            </Form.Group>

            <Form.Group className="mb-3" id="inputNama">
              <p>Nama Pelanggan</p>
              <Form.Control
                name="nama"
                type="text"
                placeholder="type here..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="alamat">
              <p>Alamat</p>
              <Form.Control
                name="alamat"
                type="text"
                placeholder="type here..."
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Card.Link href="/Pelanggan" className="btn btn-danger">
                Kembali
              </Card.Link>
              <Card.Link className="btn btn-primary" onClick={handleSubmit}>
                Update
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default UpdatePelanggan;
