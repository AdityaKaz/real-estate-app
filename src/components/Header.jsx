import NestIcon from "../assets/nest_icon.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center p-2 px-4 lg:p-3 lg:px-10 w-full">
        <Link to="/">
          <div className="flex items-center cursor-pointer">
            <img
              src={NestIcon}
              alt="Nest Logo"
              className="h-6 w-6 mr-1 lg:h-9 lg:w-9 lg:mr-2"
            />
            <h1 className="font-extrabold text-lg flex lg:text-2xl">
              <span className="text-[#2A3642]">Nest</span>
              <span className="text-[#49575C]">ify</span>
            </h1>
          </div>
        </Link>
        <form className="bg-slate-100 p-1 rounded-lg flex items-center w-full max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px] lg:p-1.5">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full text-sm lg:text-base"
          />
          <FaSearch className="text-slate-600 ml-1 text-base lg:text-xl" />
        </form>
        <ul className="flex gap-2 text-xs sm:text-sm lg:gap-4 lg:text-base">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:text-black cursor-pointer font-bold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:text-black cursor-pointer font-bold">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-700 hover:text-black cursor-pointer font-bold">
              Sign-in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
