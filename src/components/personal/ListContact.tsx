import { useEffect, useState } from "react";
import { axiosInstance } from "../../auth/AxiosConfig";
import ButtonNav from "./ButtonNav";
import { Link } from "react-router-dom";

const ListContact = () => {
  const [personals, setPersonals] = useState([]);
  const loadData = async () => {
    const response = await axiosInstance.get("/api/personal/user");
    if (response.data) {
      setPersonals(response.data.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 ml-[300px]">
      {personals.map((personal: { id: number; name: string }) => (
        <div
          key={personal.id}
          className="w-80 bg-white shadow rounded border border-transparent hover:border-blue-500"
        >
          <Link to={`/edit-contact/${personal.id}`} key={personal.id}>
            <div className="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-gray-600 font-medium">{personal.name}</h1>
              <ButtonNav id={personal.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListContact;
