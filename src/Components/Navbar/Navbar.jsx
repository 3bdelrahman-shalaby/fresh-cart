import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; // Font Awesome icons
import { TokenContext } from "../../Context/TokenContext";
import logo from "../../assets/freshcart-logo.svg"
export default function Navbar() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(TokenContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  function logout() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")

  }

  return (
    <nav className="fixed  container transition-colors shadow-xl shadow-gray-400 dark:shadow-gray-900 top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-black shadow-md ">
      <div className="max-w-screen-xl navbarrr flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/home"
          className="flex bg-white rounded items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            className="h-8"
            alt="Flowbite Logo"
          />

        </NavLink>

        <div className="flex md:order-2 items-center space-x-3 md:space-x-4 rtl:space-x-reverse">
          {/*  تبديل  */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl text-gray-700 dark:text-yellow-300 p-2 rounded focus:outline-none"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>


          <ul className="hidden md:flex flex-row items-center space-x-4">
            {token ? <li>
              <a
                onClick={() => logout()}
                href="#"
                className="block nav font-bold text-gray-900 dark:text-white"
              >
                LogOut
              </a>
            </li> : <> <li>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive
                    ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                    : "block nav font-bold text-gray-900 dark:text-white"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
                <NavLink
                  to="/Register"
                  className={({ isActive }) =>
                    isActive
                      ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                      : "block nav font-bold text-gray-900 dark:text-white"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>}

          </ul>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* روابط الموبايل */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"
            }`}
          id="navbar-cta"
        >
          {token ? <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                    : "block nav font-bold py-2 px-3 text-gray-900 dark:text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                    : "block nav font-bold py-2 px-3 text-gray-900 dark:text-white"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                    : "block nav font-bold py-2 px-3 text-gray-900 dark:text-white"
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  isActive
                    ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                    : "block nav font-bold py-2 px-3 text-gray-900 dark:text-white"
                }
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "block nav font-bold py-2 px-3 text- text-purple-600 dark:text-purple-600 text-xl font-extrabold"
                    : "block py-2 nav font-bold px-3 text-gray-900 dark:text-white"
                }
              >
                Cart
              </NavLink>
            </li>
          </ul> : null}
        </div>
      </div>
    </nav>
  );
}
