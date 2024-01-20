import NotLogin from "./NotLogin";

const UpdatePelanggan = () => {
  const handleLogin = localStorage.username;
  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <h1>Update Pelanggan</h1>
    </div>
  );
};

export default UpdatePelanggan;
