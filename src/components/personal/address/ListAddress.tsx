import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../auth/AxiosConfig";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const ListAddress = () => {
  const { id } = useParams();
  const [personal, setPersonal] = useState({ id: 0, name: "" });
  const [address, setAddress] = useState([]);
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
  const loadDataAddress = async () => {
    try {
      const response = await axiosInstance.get(`/api/address/personal/${id}`);
      if (response.data) {
        setAddress(response.data.data);
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
    loadDataAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (idDelete: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this data?"
      );
      if (confirmDelete) {
        const response = await axiosInstance.delete(`/api/address/${idDelete}`);
        if (response.data) {
          toast.success(response.data.message, {
            position: "top-center",
          });
          window.location.reload();
        }
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
      <div className="flex flex-col p-4 ml-[300px]">
        <div className="p-4">
          <h1 className="font-medium text-3xl">List Address</h1>
          <p className="text-gray-600 mt-6">{personal.name}</p>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {address.map(
                    (address: {
                      id: number;
                      addressName: string;
                      address: string;
                      city: string;
                      province: string;
                      country: string;
                    }) => (
                      <tr key={address.id} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {address.addressName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {address.address +
                            ", " +
                            address.city +
                            address.province +
                            ", " +
                            address.country}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={"/edit-address/" + address.id}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            onClick={() => handleDelete(address.id)}
                            className="ml-4 text-red-600 hover:text-red-900"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/">
            <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ListAddress;
