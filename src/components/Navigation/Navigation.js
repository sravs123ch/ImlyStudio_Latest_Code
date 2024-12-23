import { useState, useEffect, useContext,useMemo  } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  CogIcon,
  Cog6ToothIcon,
  CalendarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  DocumentMagnifyingGlassIcon as DocumentMagnifyingGlassIconSolid,
  UsersIcon as UsersIconSolid,
  FolderIcon as FolderIconSolid,
  CogIcon as CogIconSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserPlusIcon as UserPlusIconSolid,
} from "@heroicons/react/24/solid";

import { BsCalendar } from "react-icons/bs";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { BsPersonAdd } from "react-icons/bs";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import logo from "../../assests/Images/imly-logo-new.jpg";
import {Link,useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

import { useAuth } from "../../Context/AuthContext";
import { PERMISSIONS } from "../../Constants/permissions";
import axios from "axios";
import { GETALLUSERSBYID_API } from "../../Constants/apiRoutes";
import { SiOpenai } from "react-icons/si"; 

const allNavigation = {
  Service: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      iconFilled: HomeIconSolid,

      permission: PERMISSIONS.ACCESS_DASHBOARD,
    },
    {
      name: "Orders",
      href: "/Orders",
      icon: ClipboardDocumentListIcon,
      iconFilled: ClipboardDocumentListIconSolid,
      permission: PERMISSIONS.ACCESS_ORDERS,
    },
    {
      name: "Payments",
      href: "/Payments",
      icon: CreditCardIcon,
      iconFilled: CreditCardIconSolid,
      permission: PERMISSIONS.ACCESS_PAYMENTS,
    },
    {
      name: "Services",
      href: "/services",
      icon: DocumentMagnifyingGlassIcon,
      iconFilled: DocumentMagnifyingGlassIconSolid,
      permission: PERMISSIONS.ACCESS_SERVICES,
    },
    {
      name: "Customers",
      href: "/Customer",
      icon: UsersIcon,
      iconFilled: UsersIconSolid,
      permission: PERMISSIONS.ACCESS_CUSTOMERS,
    },
  ],
  Reporting: [
    {
      name: "Reports",
      href: "/Reports",
      icon: FolderIcon,
      iconFilled: FolderIconSolid,
      permission: PERMISSIONS.ACCESS_REPORTS,
    },
    {
      name: "Production",
      href: "/production",
      icon: CogIcon,
      iconFilled: CogIconSolid,
      permission: PERMISSIONS.ACCESS_PRODUCTION,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: ClipboardDocumentCheckIcon,
      iconFilled: ClipboardDocumentCheckIconSolid,
      permission: PERMISSIONS.ACCESS_TASKS,
    },
    {
      name: "Feedbacks",
      href: "/feedback",
      icon: ChatBubbleLeftEllipsisIcon,
      iconFilled: ChatBubbleLeftEllipsisIconSolid,
      permission: PERMISSIONS.ACCESS_FEEDBACKS,
    },
  ],
  MasterData: [
    {
      name: "Stores",
      href: "/Stores",
      icon: ShoppingBagIcon,
      iconFilled: ShoppingBagIconSolid,
      permission: PERMISSIONS.ACCESS_STORES,
    },
    {
      name: "Project Types",
      href: "/Project",
      icon: DocumentTextIcon,
      iconFilled: DocumentTextIconSolid,
      permission: PERMISSIONS.ACCESS_STORES,
    },
    {
      name: "Users",
      href: "/user",
      icon: UsersIcon,
      iconFilled: UsersIconSolid,
      permission: PERMISSIONS.ACCESS_USERS,
    },
    {
      name: "User Roles",
      href: "/RoleUser",
      icon: UsersIcon,
      iconFilled: UsersIconSolid,
      permission: PERMISSIONS.ACCESS_USERROLES,
    },
    {
      name: "Reference",
      href: "/Reference",
      icon: UserPlusIcon,
      iconFilled: UserPlusIconSolid,
      permission: PERMISSIONS.ACCESS_STORES,
    },
    {
      name: "Calender",
      href: "/Calender",
      icon: CalendarIcon,
      iconFilled: CalendarIconSolid,
      permission: PERMISSIONS.ACCESS_STORES,
    },
    {
      name: "AI ChatBox",
      href: "/aichatbox",
      icon: SiOpenai, // ChatGPT/OpenAI Icon
      iconFilled: SiOpenai, // Use same icon as filled version or replace with custom
      permission: PERMISSIONS.ACCESS_STORES,
    },
    
  ],
};

const userNavigation = [
  { name: "Your profile", href: "/Profile" },
  { name: "Sign out", href: "/" }, // Redirect to login page
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const { isLoggedIn, permissionsID } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation
  // const { logout  } = useAuth();
  const { userData, logout } = useAuth();
  const [logindata, setLogindata] = useState(null);
  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleSettingsClick = (event) => {
    event.preventDefault();
    navigate("/Settings");
    // Handle settings logic here, such as opening a settings modal
  };
  // const navigation = Object.keys(allNavigation).reduce((acc, key) => {
  //   const filteredItems = allNavigation[key].filter((item) =>
  //     permissionsID.includes(item.permission)
  //   );
  //   if (filteredItems.length > 0) {
  //     acc[key] = filteredItems;
  //   }
  //   return acc;
  // }, {});

  // useEffect(() => {
  //   const getUserDetailsFromStorage = () => {
  //     const userData = localStorage.getItem("userData");
  //     if (userData) {
  //       return JSON.parse(userData); // Parse and return user data
  //     } else {
  //       console.error("No user data found in local storage");
  //       return null;
  //     }
  //   };

  //   // Fetch user details from localStorage and set to state
  //   const storedUserData = getUserDetailsFromStorage();
  //   if (storedUserData) {
  //     setLogindata(storedUserData);
  //     console.log("User details loaded:", storedUserData);
  //   }
  // }, []);

  const navigation = Object.keys(allNavigation).reduce((acc, key) => {
    const filteredItems = allNavigation[key].filter((item) =>
      permissionsID.includes(item.permission)
    );
    if (filteredItems.length > 0) {
      acc[key] = filteredItems;
    }
    return acc;
  }, {});

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve the userId from localStorage
    const storedUserId = localStorage.getItem("UserID");
    // If a userId is found in localStorage, set it in the state
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
    }
  }, []);
  useEffect(() => {
    // Ensure userId is valid before making the API call
    if (!userId) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    axios
      .get(`${GETALLUSERSBYID_API}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLogindata(response.data.user); // This will update logindata
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, [userId]);

   // Memoize navigation to avoid unnecessary recalculations
   const memonavigation = useMemo(() => {
    return Object.keys(allNavigation).reduce((acc, key) => {
      const filteredItems = allNavigation[key].filter((item) =>
        permissionsID.includes(item.permission)
      );
      if (filteredItems.length > 0) {
        acc[key] = filteredItems;
      }
      return acc;
    }, {});
  }, [permissionsID]); 
  
  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex grow flex-col  overflow-y-auto  bg-white px-2 ">
                <div
                  className="flex flex-col grow bg-white px-6 pb-4" // Add left padding to the entire container
                  style={{
                    overflowY: "auto",
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none", // For Internet Explorer and Edge
                  }}
                >
                  <div className="flex items-center justify-center">
                    <img alt="Your Company" src={logo} className="h-18 w-32" />
                    <hr className="border-gray-200 my-4" />
                  </div>
                  <hr className="border-gray-300" />
                  <nav className="flex flex-col mt-2 flex-1 w-full">
                    <ul role="list" className="space-y-4 w-full">
                      {Object.entries(memonavigation).map(([key, items]) => (
                        <li key={key} className="w-full">
                          <h3 className="text-sm font-bold text-gray-700 mb-2 text-left pl-4">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h3>
                          <ul role="list" className="space-y-1 w-full">
                            {items.map((item) => (
                              <li key={item.name} className="w-full">
                                <a
                                  href={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={classNames(
                                    location.pathname.startsWith(item.href)
                                      ? "bg-custom-darkblue text-white motion-preset-slide-right motion-duration-300"
                                      : "text-gray-900 hover:bg-custom-lightblue hover:text-gray-700   ",
                                    "group flex items-center p-2 text-xs font-medium w-full pl-6 rounded-md"
                                  )}
                                >
                                  <div className="flex items-center">
                                    {/* Show filled icon if selected or hovered */}
                                    <item.icon
                                      aria-hidden="true"
                                      className={classNames(
                                        location.pathname.startsWith(item.href)
                                          ? "hidden text-white"
                                          : "group-hover:hidden",
                                        "h-4 w-4 shrink-0 mr-2"
                                      )}
                                    />
                                    <item.iconFilled
                                      aria-hidden="true"
                                      className={classNames(
                                        location.pathname.startsWith(item.href)
                                          ? "text-white"
                                          : "hidden group-hover:block", // Show filled icon on hover
                                        "h-4 w-4 shrink-0 mr-2"
                                      )}
                                    />
                                    {item.name}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </nav>
               
               <div className="mt-auto flex w-full">
  <button
    onClick={handleSettingsClick}
    className={`group flex items-center p-2 text-xs font-medium w-full pl-4 mt-2 rounded-md ${
      location.pathname.startsWith("/Settings")
        ? "bg-custom-darkblue text-white motion-preset-slide-right motion-duration-300"
        : "text-gray-900 hover:bg-custom-lightblue hover:text-gray-700"
    }`}
  >
    <div className="relative">
      {/* Default Cog Icon */}
      <Cog6ToothIcon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ml-2 mr-2 transition-opacity duration-200 ${
          location.pathname.startsWith("/Settings")
            ? "opacity-0"
            : "text-gray-700 group-hover:opacity-0"
        }`}
      />
      {/* Solid Cog Icon */}
      <Cog6ToothIconSolid
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ml-2 mr-2 absolute inset-0 transition-opacity duration-200 ${
          location.pathname.startsWith("/Settings")
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </div>
    Settings
  </button>
</div>


                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Normal Screen View */}

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col shadow-md border border-gray-200">
          <div
            className="flex flex-col grow bg-white px-6 pb-4" // Add left padding to the entire container
            style={{
              overflowY: "auto",
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none", // For Internet Explorer and Edge
            }}
          >
            {/* Logo Section */}
            <div className="flex items-center justify-center">
              <img alt="Your Company" src={logo} className="h-18 w-32" />
              <hr className="border-gray-200 my-4" />
            </div>
            <hr className="border-gray-300" />
            {/* Navigation Section */}

            <nav className="flex flex-col mt-2 flex-1 w-full">
              <ul role="list" className="space-y-4 w-full">
                {Object.entries(memonavigation).map(([key, items]) => (
                  <li key={key} className="w-full">
                    <h3 className="text-sm font-bold text-gray-700 mb-2 text-left pl-4">
                      {key.replace(/([A-Z])/g, " $1")}
                    </h3>
                    <ul role="list" className="space-y-1 w-full">
                      {items.map((item) => (
                        <li key={item.name} className="w-full">
                          <a
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              location.pathname.startsWith(item.href)
                                ? "bg-custom-darkblue text-white motion-preset-slide-right motion-duration-300"
                                : "text-gray-900 hover:bg-custom-lightblue hover:text-gray-700   ",
                              "group flex items-center p-2 text-xs font-medium w-full pl-6 rounded-md"
                            )}
                          >
                            <div className="flex items-center">
                              {/* Show filled icon if selected or hovered */}
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  location.pathname.startsWith(item.href)
                                    ? "hidden text-white"
                                    : "group-hover:hidden",
                                  "h-4 w-4 shrink-0 mr-2"
                                )}
                              />
                              <item.iconFilled
                                aria-hidden="true"
                                className={classNames(
                                  location.pathname.startsWith(item.href)
                                    ? "text-white"
                                    : "hidden group-hover:block", // Show filled icon on hover
                                  "h-4 w-4 shrink-0 mr-2"
                                )}
                              />
                              {item.name}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          <div className="mt-auto flex w-full">
  <button
    onClick={handleSettingsClick}
    className={`group flex items-center p-2 text-xs font-medium w-full pl-4 mt-2 rounded-md ${
      location.pathname.startsWith("/Settings")
        ? "bg-custom-darkblue text-white motion-preset-slide-right motion-duration-300"
        : "text-gray-900 hover:bg-custom-lightblue hover:text-gray-700"
    }`}
  >
    <div className="relative">
      {/* Default Cog Icon */}
      <Cog6ToothIcon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ml-2 mr-2 transition-opacity duration-200 ${
          location.pathname.startsWith("/Settings")
            ? "opacity-0"
            : "text-gray-700 group-hover:opacity-0"
        }`}
      />
      {/* Solid Cog Icon */}
      <Cog6ToothIconSolid
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ml-2 mr-2 absolute inset-0 transition-opacity duration-200 ${
          location.pathname.startsWith("/Settings")
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </div>
    Settings
  </button>
</div>


          </div>
        </div>

        <div className="lg:pl-100">
          <div
            className="fixed top-0 left-0 right-0 z-40 flex  bg-white h-12 w-full items-center gap-x-4 border-b border-gray-200 px-2 shadow-sm sm:gap-x-4 sm:px-4 lg:px-6"
            // style={{ backgroundColor: "#C0C0C0" }}
          >
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              // className="-m-1.5 p-1.5 text-white lg:hidden"
              className="-m-1.5 p-1.5 text-black lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-5 w-5" />
            </button>

            <div
              aria-hidden="true"
              className="h-5 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 justify-between items-center gap-x-3 lg:gap-x-4 ml-2 sm:ml-0">
              <form
                action="#"
                method="GET"
                className="relative w-full sm:w-1/4 flex mx-auto"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-4 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="block h-9 w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 sm:text-sm" // Increased height here
                />
              </form>

              <div className="flex justify-end items-center gap-x-3 lg:gap-x-4">
                {/* Notification Button */}
                <button
                  type="button"
                  // className="-m-1.5 p-1.5 text-white hover:text-gray-500"
                  className="-m-1.5 p-1.5 text-black hover:text-gray-500 hover:motion-preset-shake  "
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-5 w-5" />
                </button>

                <div
                  aria-hidden="true"
                  // className="hidden lg:block lg:h-5 lg:w-px lg:bg-white"
                  className="hidden lg:block lg:h-5 lg:w-px lg:bg-black"
                />

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1 flex items-center p-1">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="Profile"
                      // src={
                      //   logindata?.ProfileImage ||
                      //   "https://via.placeholder.com/150/000000/FFFFFF/?text=Unknown+User"
                      // }
                      src={
                        logindata?.ProfileImage
                          ? logindata.ProfileImage
                          : "https://via.placeholder.com/150/000000/FFFFFF/?text=Unknown+User"
                      }                      
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center ml-2">
                      <span
                        aria-hidden="true"
                        // className="text-sm font-semibold leading-6 text-white"
                        className="text-sm font-semibold leading-6 text-black"
                      >
                        {logindata && logindata.FirstName && logindata.LastName
                          ? `${logindata.FirstName} ${logindata.LastName}`
                          : "Loading..."}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-4 w-4 text-black"
                      />
                    </span>
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 motion-duration-300 motion-preset-expand">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                          onClick={
                            item.name === "Sign out" ? handleSignOut : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-0">
            <div className="px-2 sm:px-4 lg:px-6"></div>
          </main>
        </div>
      </div>
    </>
  );
}



// export default function Navigation() {
//   const { isLoggedIn, permissionsID, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleSignOut = () => {
//     logout();
//     navigate("/");
//   };

//   const navigation = useMemo(() => {
//     return Object.keys(allNavigation).reduce((acc, key) => {
//       const filteredItems = allNavigation[key].filter((item) =>
//         permissionsID.includes(item.permission)
//       );
//       if (filteredItems.length > 0) acc[key] = filteredItems;
//       return acc;
//     }, {});
//   }, [permissionsID]);

//   const NavigationMenu = ({ navigation }) => (
//     <ul role="list" className="space-y-4 w-full">
//       {Object.entries(navigation).map(([key, items]) => (
//         <li key={key} className="w-full">
//           <h3 className="text-sm font-bold text-gray-700 mb-2 text-left pl-4">
//             {key.replace(/([A-Z])/g, " $1")}
//           </h3>
//           <ul role="list" className="space-y-1 w-full">
//             {items.map((item) => {
//               const isActive = location.pathname.startsWith(item.href);
//               return (
//                 <li key={item.name} className="w-full">
//                   <Link
//                     to={item.href}
//                     onClick={() => setSidebarOpen(false)}
//                     className={`group flex items-center p-2 text-xs font-medium w-full pl-6 rounded-md ${
//                       isActive
//                         ? "bg-custom-darkblue text-white"
//                         : "text-gray-900 hover:bg-custom-lightblue"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       {isActive ? (
//                         <item.iconFilled className="h-4 w-4 mr-2" />
//                       ) : (
//                         <item.icon className="h-4 w-4 mr-2" />
//                       )}
//                       {item.name}
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <>
//       {/* Mobile Sidebar */}
//       <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="lg:hidden">
//         <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
//         <DialogPanel className="fixed inset-0 flex w-full max-w-xs transform">
//           <button onClick={() => setSidebarOpen(false)} className="absolute top-4 left-4">
//             <XMarkIcon className="h-6 w-6 text-white" />
//           </button>
//           <div className="flex flex-col bg-white p-4">
//             <NavigationMenu navigation={navigation} />
//           </div>
//         </DialogPanel>
//       </Dialog>

//       {/* Desktop Sidebar */}
//       <div className="hidden lg:flex lg:w-60 lg:flex-col bg-white shadow-md">
//         <div className="flex flex-col h-full px-6 pb-4">
//           <img alt="Logo" src={logo} className="h-18 w-32 mx-auto" />
//           <NavigationMenu navigation={navigation} />
//           <button
//             onClick={() => navigate("/Settings")}
//             className={`mt-auto flex items-center p-2 text-xs font-medium w-full ${
//               location.pathname.startsWith("/Settings")
//                 ? "bg-custom-darkblue text-white"
//                 : "hover:bg-custom-lightblue"
//             }`}
//           >
//             <Cog6ToothIcon className="h-4 w-4 mr-2" />
//             Settings
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
