import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { dispatch } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white px-4 py-1.5 bg-red-500 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;
