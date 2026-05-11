import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import useDarkMode from "../../hooks/useDarkMode";
import MananLogo from "../../assets/manan-logo.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import CustomButton from "../CustomButton";

const normalRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Members", href: "/members", current: false },
  { name: "Events", href: "/events", current: false },
  { name: "Gallery", href: "/gallery", current: false },
];
const profileExistsRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Members", href: "/members", current: false },
  { name: "Events", href: "/events", current: false },
  { name: "Gallery", href: "/gallery", current: false },
  { name: "Complete Profile", href: "/complete-profile", current: false },
];
const profileDoesNotExistsRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Members", href: "/members", current: false },
  { name: "Events", href: "/events", current: false },
  { name: "Gallery", href: "/gallery", current: false },
  { name: "Complete Profile", href: "/complete-profile", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar(props) {
  const { user, profileExists, permission } = props;
  const [routes, setRoutes] = useState(normalRoutes);
  const [theme, setTheme] = useDarkMode();
  const [currentPage, setCurrentPage] = useState(0);
  const loginPath = props.loginPath || "/member-login";

  useEffect(() => {
    const routesHandler = (loggedInUser, profileData) => {
      if (loggedInUser && !profileData) {
        setRoutes(profileDoesNotExistsRoutes);
      } else if (loggedInUser && profileData) {
        setRoutes(profileExistsRoutes);
      } else {
        setRoutes(normalRoutes);
      }
    };
    routesHandler(user, profileExists);
  }, [user, profileExists]);

  return (
    <Disclosure
      as="nav"
      className="bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm absolute w-screen top-0 left-0 z-20"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <ImCross className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <GiHamburgerMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <motion.div
                    className="Logo-Wrapper"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 20,
                    }}
                  >
                    <img className="w-8 h-8" src={MananLogo} alt="manan" />
                  </motion.div>
                  <div className="text-gray-800 dark:text-white pl-1 md:pl-3 text-[24px]">
                    <motion.span
                      animate={{ x: 0, opacity: 1 }}
                      initial={{ x: -10, opacity: 0 }}
                      transition={{ ease: "easeOut", duration: 2 }}
                      className="Logo-Text-Wrapper inline-block font-extrabold text-gray-700 dark:text-gray-50"
                    >
                      Manan
                    </motion.span>
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center justify-center space-x-4">
                      {routes.map((item, index) => (
                        <NavLink
                          onClick={() => setCurrentPage(index)}
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            currentPage === index
                              ? "bg-gray-800 text-white"
                              : "dark:text-gray-300 text-gray-700 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!user && (
                  <NavLink to={loginPath} className="hidden md:block pr-3">
                    <CustomButton>
                      Member Login
                    </CustomButton>
                  </NavLink>
                )}
                <button
                  type="button"
                  className="bg-[#FB5343] p-1 rounded-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  {theme === "dark" ? (
                    <BsFillMoonFill
                      onClick={() => setTheme(theme)}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <BsFillSunFill
                      onClick={() => setTheme(theme)}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </button>
                {props.user && (
                  <Menu as="div" className="ml-3 relative">
                    <motion.div
                      animate={{ scale: 1 }}
                      initial={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 20,
                      }}
                    >
                      <Menu.Button className="bg-gray-300  flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>

                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.image || MananLogo}
                          alt="member"
                          referrerPolicy="no-referrer"
                        />
                      </Menu.Button>
                    </motion.div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {permission === "admin" && (
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to="/add-events">
                                <div
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Add Event
                                </div>
                              </NavLink>
                            )}
                          </Menu.Item>
                        )}
                        {permission === "admin" && (
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to="/add-gallery">
                                <div
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Add Gallery Image
                                </div>
                              </NavLink>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={props.onSignOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                {/* Profile dropdown */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 BackgroundBlur">
              <div>
                {routes.map((item, index) => (
                  <Disclosure.Button
                    key={item.name}
                    as="div"
                    className={classNames(
                      currentPage === index
                        ? "bg-gray-200 text-gray-700"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={currentPage === index ? "page" : undefined}
                  >
                    <NavLink
                      onClick={() => setCurrentPage(index)}
                      to={item.href}
                    >
                      {item.name}
                    </NavLink>
                  </Disclosure.Button>
                ))}
              </div>
              {!user && (
                <NavLink to={loginPath}>
                  <Disclosure.Button
                    as="div"
                    className={classNames(
                      "text-gray-400 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                    )}
                  >
                    Sign In
                  </Disclosure.Button>
                </NavLink>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
