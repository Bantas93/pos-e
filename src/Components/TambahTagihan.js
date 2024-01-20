import { useState, useEffect } from "react";
import { Card, Form, Dropdown } from "react-bootstrap";
import Bulan from "../utils/Bulan";
import NotLogin from "./NotLogin";

const TambahTagihan = () => {
  const handleLogin = localStorage.username;
  const [noMeter, setNoMeter] = useState();
  const [handleNama, setHandleNama] = useState("Tidak Ada");
  const [bulanTagihan, setBulanTagihan] = useState();
  const [tahunTagihan, setTahunTagihan] = useState();
  const [totalPemakaian, setTotalPemakaian] = useState();
  const [dataMeter, setDataMeter] = useState();

  const handleDropdownSelect = (meter) => {
    setNoMeter(meter);
    setHandleNama(meter.nama);
  };

  const handleBulan = (bulan) => {
    setBulanTagihan(bulan);
    console.log(bulan);
  };

  const submit = () => {
    if (!noMeter || !handleNama || !bulanTagihan || !tahunTagihan) {
      window.alert("Data Harus Lengkap !");
      return;
    }
    console.log("Submitting data...");
    fetchUserData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/pelanggan");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setDataMeter(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/tagihan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          noMeter: noMeter.noMeter,
          bulanTagihan: bulanTagihan.value,
          tahunTagihan: tahunTagihan,
          totalPemakaian: totalPemakaian,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        window.alert("Data Tagihan Berhasil Di Tambahkan !");
        console.log(result);
        window.location.href = "/Tagihan";
      } else {
        window.alert("Data Tagihan sudah ada !");
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
            <Card.Title className="text-center">Tambah Tagihan</Card.Title>
            <hr className="mt-4"></hr>
            <div className="mb-3" id="inputNoMeter">
              <p>No Meter :</p>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {noMeter ? noMeter.noMeter : "Pilih No Meter"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dataMeter
                    ? dataMeter.map((meter) => (
                        <Dropdown.Item
                          key={meter.noMeter}
                          onClick={() => handleDropdownSelect(meter)}
                        >
                          {meter.noMeter}
                        </Dropdown.Item>
                      ))
                    : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="mb-3" id="nama">
              <p>Nama Pelanggan : {handleNama}</p>
            </div>

            <div className="mb-3" id="inputBulanTagihan">
              <p>Bulan Tagihan :</p>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {bulanTagihan ? bulanTagihan.nama : "Pilih Bulan"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Bulan
                    ? Bulan().map((bulan) => (
                        <Dropdown.Item
                          key={bulan.value}
                          onClick={() => handleBulan(bulan)}
                        >
                          {bulan.nama}
                        </Dropdown.Item>
                      ))
                    : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Form.Group className="mb-3" id="inputTahunTagihan">
              <p>Tahun Tagihan</p>
              <Form.Control
                name="TahunTagihan"
                type="number"
                placeholder="type here..."
                onChange={(e) => {
                  setTahunTagihan(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="inputTotalPemakaian">
              <p>Total Pemakaian</p>
              <Form.Control
                name="TotalPemakaian"
                type="text"
                placeholder="type here..."
                onChange={(e) => {
                  setTotalPemakaian(e.target.value);
                }}
              />
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Card.Link href="/Tagihan" className="btn btn-danger">
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

export default TambahTagihan;
