import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../auth/AxiosConfig";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const AddAddress = () => {
  const { id } = useParams();
  const [personal, setPersonal] = useState({ id: 0, name: "" });
  const [addressName, setAddressName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const redirect = useNavigate();
  const loadData = async () => {
    try {
      const response = await axiosInstance.get(`/api/personal/${id}`);
      if (response.data) {
        setPersonal(response.data.data);
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
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/address", {
        addressName,
        address,
        city,
        province,
        country,
        personalId: Number(id),
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        setAddressName("");
        setAddress("");
        setCity("");
        setProvince("");
        setCountry("");
        redirect("/");
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
          <h1 className="font-medium text-3xl">Add Address</h1>
          <p className="text-gray-600 mt-6">{personal.name}</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 space-y-6">
              <div className="flex items-center">
                <label
                  htmlFor="name"
                  className="text-sm text-gray-700 mr-4 w-1/9 font-medium"
                >
                  Address Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-3/4"
                  placeholder="address name"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="address"
                  className="text-sm text-gray-700 mr-4 w-1/9 font-medium"
                >
                  Adress
                </label>
                <input
                  type="text"
                  id="address"
                  className="border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-3/4"
                  placeholder="jl. raya no. 1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="city"
                  className="text-sm text-gray-700 mr-4 w-1/9 font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-3/4"
                  placeholder="(ex. Depok)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="province"
                  className="text-sm text-gray-700 mr-4 w-1/9 font-medium"
                >
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  className="border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-3/4"
                  placeholder="(ex. DKI Jakarta)"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="country"
                  className="text-sm text-gray-700 mr-4 w-1/9 font-medium"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-3/4"
                  placeholder="(ex. indonesia)"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
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

              <Link to="/">
                <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
