import secureLocalStorage from "react-secure-storage";
import profile from "../assets/profile.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const user = secureLocalStorage.getItem("user") as {
    id: number;
    name: string;
  };
  return (
    <div
      className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] 
    overflow-y-auto text-center border-r border-transparent shadow"
    >
      <div className="text-gray-100 text-xl">
        <Link to="/">
          <div className="p-2.5 mt-1 flex items-center">
            <div className="overflow-hidden rounded-full w-[50px] h-[50px] mb-2">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-bold text-gray-600 text-[15px] ml-3">
              {user?.name}
            </h1>
          </div>
        </Link>
        <div className="my-2 bg-gray-200 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center 
        rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-400 text-gray-200"
        >
          <a
            href="/add-contact"
            className="text-[15px] ml-4 text-gray-600 font-bold"
          >
            Add Contact
          </a>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center 
        rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-400 text-gray-200"
        >
          <a
            href="/logout"
            className="text-[15px] ml-4 text-gray-600 font-bold"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
