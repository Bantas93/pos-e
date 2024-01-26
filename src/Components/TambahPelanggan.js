import { useState } from "react";
import { Card, Form, Dropdown } from "react-bootstrap";
import NotLogin from "./NotLogin";
import KodeTarif from "../utils/KodeTarif";

const TambahPelanggan = () => {
  const handleLogin = localStorage.username;
  const [noMeter, setNoMeter] = useState();
  const [kodeTarif, setKodeTarif] = useState();
  const [nama, setNama] = useState();
  const [alamat, setAlamat] = useState();

  const submit = () => {
    if (!noMeter || !kodeTarif || !nama || !alamat) {
      window.alert("Data Harus Lengkap !");
      return;
    }
    fetchUserData();
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/pelanggan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          noMeter: noMeter,
          kodeTarif: kodeTarif.nama,
          nama: nama,
          alamat: alamat,
        }),
      });

      if (response.ok) {
        await response.json();
        window.alert("Data Pelanggan Berhasil Di Tambahkan !");
        window.location.href = "/Pelanggan";
      } else {
        window.alert("Data Pelanggan sudah ada !");
        console.error("Gagal:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <section className="row d-flex justify-content-center align-items-center m-5">
        <Card style={{ width: "22rem" }} className="shadow">
          <Card.Body>
            <Card.Title className="text-center">Tambah Pelanggan</Card.Title>
            <hr className="mt-4"></hr>

            <Form.Group className="mb-3" id="inputNama">
              <p>Nama Pelanggan</p>
              <Form.Control
                name="nama"
                type="text"
                placeholder="type here..."
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="inputAlamat">
              <p>Alamat</p>
              <Form.Control
                name="alamat"
                type="text"
                placeholder="type here..."
                onChange={(e) => {
                  setAlamat(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="inputNoMeter">
              <p>No Meter</p>
              <Form.Control
                name="noMeter"
                type="text"
                placeholder="type here..."
                onChange={(e) => {
                  setNoMeter(e.target.value);
                }}
              />
            </Form.Group>

            <div className="mb-3" id="kodeTarif">
              <p>Kode Tarif</p>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {kodeTarif ? kodeTarif.nama : "Pilih Kode Tarif"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {KodeTarif
                    ? KodeTarif().map((tarif) => (
                        <Dropdown.Item
                          key={tarif.nama}
                          onClick={() => setKodeTarif(tarif)}
                        >
                          {tarif.nama}
                        </Dropdown.Item>
                      ))
                    : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Card.Link href="/Pelanggan" className="btn btn-danger">
                Kembali
              </Card.Link>
              <Card.Link className="btn btn-primary" onClick={submit}>
                Submit
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default TambahPelanggan;
