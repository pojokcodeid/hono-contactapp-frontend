import { useState } from "react";

const ButtonNav = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-sm font-medium text-gray-700 focus:outline-none"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href={`/add-address/${id}`}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Add Address
            </a>
            <a
              href={`/list-address/${id}`}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              View Address
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonNav;
