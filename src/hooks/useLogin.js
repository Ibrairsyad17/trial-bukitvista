import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/login`,
        {
          username,
          password,
        },
      );
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        dispatch({ type: "LOGIN", payload: token });
        window.location.href = "/dashboard";
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
      setError("Terjadi kesalahan saat login");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    error,
    setIsLoading,
    handleLogin,
  };
};

export default useLogin;
