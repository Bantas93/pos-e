import NotLogin from "./NotLogin";

const UpdateUser = () => {
  const handleLogin = localStorage.username;

  if (handleLogin == null) {
    return <NotLogin />;
  }

  return (
    <div className="container">
      <h1>Update User</h1>
    </div>
  );
};

export default UpdateUser;
