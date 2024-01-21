import { useState } from "react";
import NotLogin from "./NotLogin";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import Bulan from "../utils/Bulan";
import { Dropdown, Card, Form } from "react-bootstrap";

const UpdateTagihan = () => {
  const handleLogin = localStorage.username;
  let location = useLocation();
  const navigate = useNavigate();
  const data = location.state.user;
  const id = data.idTagihan;
  const [bulanTagih, setBulanTagih] = useState();
  const [tahunTagih, setTahunTagih] = useState(data.tahunTagihan);
  const [total, setTotal] = useState(data.totalPemakaian);

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
        `http://localhost:8080/api/v1/tagihan/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noMeter: data.noMeter,
            nama: data.nama,
            bulanTagihan: bulanTagih.value,
            tahunTagihan: tahunTagih,
            totalPemakaian: total,
          }),
        }
      );

      if (response.ok) {
        console.log(`Berhasil Update !`);
        window.alert("Data Berhasil di Update");
        navigate("/Tagihan");
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
        <Card style={{ width: "22rem" }} className="shadow">
          <Card.Body>
            <Card.Title className="text-center">Update Tagihan</Card.Title>
            <hr className="mt-4"></hr>
            <Form.Group className="mb-3" id="meter">
              <p>No Meter</p>
              <h3>{data.noMeter}</h3>
            </Form.Group>

            <Form.Group className="mb-3" id="nama">
              <p>Nama</p>
              <h3>{data.nama}</h3>
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
                value={tahunTagih}
                onChange={(e) => setTahunTagih(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="totalPemakaian">
              <p>Total pemakaian</p>
              <Form.Control
                name="totalPemakaian"
                type="number"
                placeholder="type here..."
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Card.Link href="/Tagihan" className="btn btn-danger">
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

export default UpdateTagihan;
