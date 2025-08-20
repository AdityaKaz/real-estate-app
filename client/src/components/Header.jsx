import NestIcon from "../assets/nest_icon.png";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const hidePaths = ["/sign-in", "/sign-up"];
  const shouldHideElements = hidePaths.includes(location.pathname);

  return (
    <header className="bg-slate-200 shadow-md">
      <div
        className="grid grid-cols-3 items-center
                      py-2 px-2 sm:px-4 lg:py-3 lg:px-10 w-full"
      >
        <Link to="/" className="flex items-center">
          <img
            src={NestIcon}
            alt="Nest Logo"
            className="h-5 w-5 mr-0.5 sm:h-6 sm:w-6 lg:h-9 lg:w-9 lg:mr-1"
          />
          <h1 className="font-extrabold text-base sm:text-lg lg:text-2xl">
            <span className="text-black">Nest</span>
            <span className="text-slate-600">ify</span>
          </h1>
        </Link>
        {!shouldHideElements && (
          <form className="justify-self-center w-full max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px]">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg shadow">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-full text-sm lg:text-base"
              />
              <FaSearch className="text-slate-600 ml-1 text-base lg:text-xl" />
            </div>
          </form>
        )}
        {!shouldHideElements && (
          <ul className="flex gap-2 text-xs sm:text-sm lg:gap-4 lg:text-base justify-self-end">
            <Link to="/">
              <li className="hidden sm:inline text-slate-600 hover:text-black cursor-pointer font-bold">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-600 hover:text-black cursor-pointer font-bold">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              {currentUser && currentUser.photoUrl ? (
                <img
                  src={currentUser.photoUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <li className="text-slate-600 hover:text-black cursor-pointer font-bold">
                  Sign-in
                </li>
              )}
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
  