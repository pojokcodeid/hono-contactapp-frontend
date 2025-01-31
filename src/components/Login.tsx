import { useState } from "react";
import { axiosInstance } from "../auth/AxiosConfig";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });
      if (response.data) {
        secureLocalStorage.setItem("acessToken", response.data.data.token);
        secureLocalStorage.setItem(
          "refreshToken",
          response.data.data.refreshToken
        );
        secureLocalStorage.setItem("user", {
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
        });
        toast.success(response.data.message, {
          position: "top-center",
        });
        self.location.href = "/";
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errMessage = JSON.parse(error.request.response);
        toast.error(errMessage.message, {
          position: "top-center",
        });
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
