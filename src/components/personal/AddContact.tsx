import { useState } from "react";
import Sidebar from "../Sidebar";
import { axiosInstance } from "../../auth/AxiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const AddContact = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/personal", { name });
      if (response.data) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        navigate("/");
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
      <Sidebar />
      <div className="p-4 ml-[300px]">
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Add Contact</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 space-y-6">
              <div className="flex items-center">
                <label
                  htmlFor="name"
                  className="text-sm text-gray-700 mr-4 w-1/9 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-3/4"
                  placeholder="Enter contact name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
