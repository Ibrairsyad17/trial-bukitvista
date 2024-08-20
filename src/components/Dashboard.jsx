import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "./Header.jsx";
import ProductTable from "./ProductTable.jsx";

const Dashboard = () => {
  const { state } = useAuth();

  if (!state.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <ProductTable />
    </div>
  );
};

export default Dashboard;
