import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  CREATEORUPDATE_USERS_API,
  GETALLROLESS_API,
  GETALLUSERSBYID_API,
} from "../../Constants/apiRoutes";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";
import { DataContext } from "../../Context/DataContext";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Heroicons v2 syntax


const genderOptions = [
    { id: "M", name: "Male" },
    { id: "F", name: "Female" },
  ];


const Profile = () => {
    // const { userID } = useParams();
  const [UserId, setUserId] = useState(null);
  const [logindata, setLogindata] = useState(null);

  // Fetch the userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("UserID");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch user data based on userId
  useEffect(() => {
    if (!UserId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    axios
      .get(`${GETALLUSERSBYID_API}/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLogindata(response.data.user); // Update logindata with user details
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, []);


  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, setUserDeatails } = useContext(UserContext);

  // const isEditMode = Boolean(
  //   location.state?.userDetails?.user || userDetails?.user
  // );

  const [formData, setFormData] = useState(
    location.state?.userDetails || {
      // TenantID: 1,
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Gender: "",
      RoleID: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
      ProfileImage: null,
      Comments: "",
      StoreID: "",
    }
  );
  const [roles, setRoles] = useState([]);
  const [countryMap, setCountryMap] = useState({});
  const [StoreMap, setStoreMap] = useState({});
  const [stateMap, setStateMap] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [cityMap, setCityMap] = useState({});

  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const { storesData } = useContext(DataContext);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const { citiesData, statesData, countriesData } = useContext(DataContext);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    if (countriesData && statesData && citiesData) {
      setCountries(countriesData.data || []);
      setStates(statesData.data || []);
      setCities(citiesData.data || []);
    }
  }, [countriesData, statesData, citiesData]);

  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(GETALLROLESS_API);
      const data = await response.json();
      if (data.StatusCode === "SUCCESS") {
        setRoles(data.roles);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (storesData) {
      setStores(storesData || []);
    }
  }, [storesData]);

  // const isEditMode = Boolean(
  //   location.state?.userDetails?.user || userDetails?.user
  // );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        ProfileImage: file,
      });
    }
  };

  const [selectedGender, setSelectedGender] = useState(formData.Gender || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setFormData({
      ...formData,
      Gender: gender.id,
    });
  };

  const [selectedRole, setSelectedRole] = useState(formData.RoleID || "");
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleRoleChange = (role) => {
  //   setSelectedRole(role);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     RoleID: role.id,
  //   }));
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const validationError = validateUserData();
    if (validationError) {
      toast.error(validationError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Exit function if validation fails
    }
  
    try {
      const isEditMode = Boolean(formData.UserID);
  
      setIsLoading(true); // Show loading animation
      const formDataToSend = new FormData();
      if (!isEditMode) {
        formDataToSend.append("TenantID", 1);
      }
      Object.keys(formData).forEach((key) => {
        if (key === "ProfileImage" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      const apiUrl = CREATEORUPDATE_USERS_API; // API URL
      const method = "post"; // Using POST for both create and update
      const response = await axios({
        method,
        url: apiUrl,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.StatusCode === "SUCCESS") {
        toast.success("Profile Updated successfully!"); // Success message
        
        // Reset form data and exit edit mode
        setFormData({});
        setIsEditing(false);
        setTimeout(() => {
            window.location.reload();
          navigate("/Profile");
        }, 50);
  
        // Navigate to Profile page after a short delay
      } else {
        // Handle errors or unexpected responses
        toast.error(response.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("User submission failed:", error);
  
      if (error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };
  
  const handleCancel = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsEditing(false); 
      setIsLoading(false); 
    }, 500); 
  };
  

  const handleStoreChange = (selectedStore) => {
    if (!selectedStore) return;

    setSelectedStore(selectedStore);
    setFormData({
      ...formData,
      StoreID: selectedStore.StoreID, // Use StoreID directly from the store object
      StoreName: selectedStore.StoreName,
    });
  };

  const handleCountryChange = (selectedCountry) => {
    if (!selectedCountry) return;

    const countryID =
      countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

    setSelectedCountry(selectedCountry);
    setFormData({
      ...formData,
      CountryID: countryID,
      CountryName: selectedCountry.CountryName,
    });
    setSelectedState("");
    setSelectedCity("");
    setFilteredStates(
      states.filter((state) => state.CountryID === selectedCountry.CountryID)
    );
  };

  const handleStateChange = (state) => {
    if (!state) return;

    const stateID = stateMap[state.StateName] || state.StateID;

    setSelectedState(state);
    setSelectedCity("");
    setFormData({
      ...formData,
      StateID: stateID,
      StateName: state.StateName,
    });
    setFilteredCities(cities.filter((city) => city.StateID === state.StateID));
  };

  const handleCityChange = (city) => {
    if (!city) return;

    const cityID = cityMap[city.CityName] || city.CityID;

    setSelectedCity(city);
    setFormData({
      ...formData,
      CityID: cityID,
      CityName: city.CityName,
    });
  };

  const [dependenciesLoaded, setDependenciesLoaded] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // Check if all dependencies (countries, states, cities, stores) are loaded
  useEffect(() => {
    if (
      countries?.length &&
      states?.length &&
      cities?.length &&
      stores?.length &&
      !dependenciesLoaded
    ) {
      setDependenciesLoaded(true); // Set to true only when all dependencies are available
    }
  }, [countries, states, cities, stores]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId === "new") {
        setFormData({});
        setUserDataLoaded(true);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          setError("Authentication token is missing.");
          return;
        }

        const response = await axios.get(`${GETALLUSERSBYID_API}/${UserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const fetchedUserData = response.data.user;

        if (!fetchedUserData) {
          setError("User not found.");
          return;
        }

        // Ensure dropdown selections are mapped correctly
        const selectedCountry = countries.find(
          (country) => country.CountryName === fetchedUserData.CountryName
        );
        const selectedState = states.find(
          (state) => state.StateName === fetchedUserData.StateName
        );
        const selectedCity = cities.find(
          (city) => city.CityName === fetchedUserData.CityName
        );
        const selectedGender = genderOptions.find(
          (g) => g.id === fetchedUserData.Gender
        );
        const selectedStore = stores.find(
          (store) => store.StoreID === fetchedUserData.StoreID
        );
        setLogindata(response.data.user);

        // Set form data and dropdown selections
        setFormData({
          ...fetchedUserData,
          CountryID: selectedCountry?.CountryID || null,
          StateID: selectedState?.StateID || null,
          CityID: selectedCity?.CityID || null,
          Gender: selectedGender?.id || null,
          StoreID: selectedStore?.StoreID || null,
        });

        // const selectedRole = roles.find(role => role.RoleID === fetchedUser=Data.RoleID);
        // setSelectedRole(selectedRole || null);

        setSelectedCountry(selectedCountry);
        setSelectedState(selectedState);
        setSelectedCity(selectedCity);
        setSelectedGender(selectedGender);
        setSelectedStore(selectedStore);
        setUserDataLoaded(true);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details.");
      } finally {
        setIsLoading(false);
      }
    };

    // Trigger fetch only if dependencies are loaded and userId is not new
    if (dependenciesLoaded && !userDataLoaded) {
      fetchUserDetails();
    }
  }, [userId, dependenciesLoaded, userDataLoaded]);

  useEffect(() => {
    if (formData.RoleID && roles.length > 0) {
      const role = roles.find((r) => r.RoleID === formData.RoleID);
      if (role) {
        setSelectedRole(role);
      }
    }
  }, [formData.RoleID, roles]);

  // Wait for both user data and dependencies to load before rendering form
  if (!dependenciesLoaded || !userDataLoaded) {
    return <div>Loading...</div>;
  }

  // Validation
  const validateUserData = () => {
    const newErrors = {};
    if (!formData.StoreName) {
      newErrors.StoreNameError = "Store Name is required.";
    }

    if (!formData.RoleID) {
      newErrors.RoleIdError = "Role is required.";
    }
    if (!formData.FirstName) {
      newErrors.FirstNameError = "First Name is required.";
    }
    if (!formData.AddressLine1) {
      newErrors.AddressLine1Error = "Address Line 1 is required.";
    }
    // if (!formData.LastName) {
    //   newErrors.LastNameError = "Last Name is required.";
    // }
    if (!formData.Email) {
      newErrors.EmailError = "Email is required.";
    }
    if (!formData.CountryID) {
      newErrors.CountryIdError = "Country is required.";
    }
    if (!formData.Password) {
      newErrors.PasswordError = "Password is required.";
    }
    if (!formData.StateID) {
      newErrors.StateIdError = "State is required.";
    }
    if (!formData.PhoneNumber) {
      newErrors.PhoneNumberError = "Phone Number is required.";
    }
    if (!formData.CityID) {
      newErrors.CityIdError = "City is required.";
    }
    if (!formData.ZipCode) {
      newErrors.ZipCodeError = "Zip Code is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  const handleRoleChange = (selectedRole) => {
    setSelectedRole(selectedRole);
    setFormData((prevFormData) => ({
      ...prevFormData,
      RoleID: selectedRole?.RoleID || "",
    }));
    setQuery(""); // Reset the search query after selection
  };
 

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
   // Fetch user details on mount or when the "Update" button is clicked
   const fetchUserDetails = async () => {
    if (UserId === "new") {
      setFormData({});
      setUserDataLoaded(true);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage.");
        setError("Authentication token is missing.");
        return;
      }

      const response = await axios.get(`${GETALLUSERSBYID_API}/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const fetchedUserData = response.data.user;

      if (!fetchedUserData) {
        setError("User not found.");
        return;
      }

      // Ensure dropdown selections are mapped correctly
      const selectedCountry = countries.find(
        (country) => country.CountryName === fetchedUserData.CountryName
      );
      const selectedState = states.find(
        (state) => state.StateName === fetchedUserData.StateName
      );
      const selectedCity = cities.find(
        (city) => city.CityName === fetchedUserData.CityName
      );
      const selectedGender = genderOptions.find(
        (g) => g.id === fetchedUserData.Gender
      );
      const selectedStore = stores.find(
        (store) => store.StoreID === fetchedUserData.StoreID
      );

      setLogindata(response.data.user);

      // Set form data and dropdown selections
      setFormData({
        ...fetchedUserData,
        CountryID: selectedCountry?.CountryID || null,
        StateID: selectedState?.StateID || null,
        CityID: selectedCity?.CityID || null,
        Gender: selectedGender?.id || null,
        StoreID: selectedStore?.StoreID || null,
      });

      setSelectedCountry(selectedCountry);
      setSelectedState(selectedState);
      setSelectedCity(selectedCity);
      setSelectedGender(selectedGender);
      setSelectedStore(selectedStore);
      setUserDataLoaded(true);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch on initial mount and when "Update" button is clicked
//   useEffect(() => {
//     if (dependenciesLoaded && !userDataLoaded) {
//       fetchUserDetails();
//     }
//   }, [dependenciesLoaded, userDataLoaded, UserId]);

  const handleUpdateButtonClick = () => {
    // Fetch user details when "Update" button is clicked
    setIsEditing(true); // Enable edit mode
    fetchUserDetails();  // Fetch data again
  };
  return (
    
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-56 w-auto mt-10 p-6 bg-white rounded-lg">
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      <h2 className="text-2xl font-semibold">Profile</h2>
    </div>
  
    <div className="mt-6">
      {/* User Details */}
      {logindata && (
        <>
          <div className="user-details">
            <div className="flex items-center space-x-4 mt-4">
            <img
        src={logindata.ProfileImage}
        alt={`${logindata.FirstName} ${logindata.LastName}`}
        className="w-24 h-24 rounded-full object-cover border cursor-pointer"
        onClick={openModal} 
      />
              <div>
              {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close the modal when clicking outside
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the modal
          >
            <img
              src={logindata.ProfileImage}
              alt={`${logindata.FirstName} ${logindata.LastName}`}
              className="w-96 h-96 object-cover"
            />
<button
  className="absolute top-0 right-0 m-1 text-white bg-red-500 p-1 rounded-full"
  onClick={closeModal} // Close the modal when clicking the close button
>
  <XMarkIcon className="w-6 h-6" /> {/* Icon size */}
</button>

          </div>
        </div>
      )}
                <p className="text-lg font-bold">
                  {logindata.FirstName} {logindata.LastName}
                </p>
                <p className="text-sm text-gray-500">{logindata.Email}</p>
                <p className="text-sm text-gray-500">{logindata.PhoneNumber}</p>
              </div>
             
            </div>
            {!isEditing && (

// <div className="w-full max-w-4xl mx-auto p-6">
//   {/* Full Name & Employee ID Section */}
//   <div className="grid grid-cols-2 gap-6 mb-6">
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Full Name:</p>
//       <p className="text-lg text-gray-600 ml-2">{logindata.FirstName} {logindata.LastName}</p>
//     </div>
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Employee ID:</p>
//       <p className="text-lg text-gray-600 ml-2">{logindata.EmployeeID}</p>
//     </div>
//   </div>

//   {/* Store Name & Role Section */}
//   <div className="grid grid-cols-2 gap-6 mb-6">
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Store Name:</p>
//       <p className="text-lg text-gray-600 ml-2">{logindata.StoreName}</p>
//     </div>
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Role Name:</p>
//       <p className="text-lg text-gray-600">{selectedRole?.RoleName}</p>
//     </div>
//   </div>

//   {/* Email & Phone Section */}
//   <div className="grid grid-cols-2 gap-6 mb-6">
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Email:</p>
//       <p className="text-lg text-gray-600 ml-2">{logindata.Email}</p>
//     </div>
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Phone Number:</p>
//       <p className="text-lg text-gray-600">{logindata?.PhoneNumber}</p>
//     </div>
//   </div>

//   {/* Address Section */}
//   <div className="grid grid-cols-2 gap-6 mb-6">
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Address Line 1:</p>
//       <p className="text-lg text-gray-600 ml-2">{logindata.AddressLine1}</p>
//     </div>
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Address Line 2:</p>
//       <p className="text-lg text-gray-600">{logindata?.AddressLine2}</p>
//     </div>
//   </div>

//   {/* Location Section */}
//   <div className="grid grid-cols-2 gap-6 mb-6">
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">Country Name:</p>
//       <p className="text-lg text-gray-600 ml-2">{logindata.CountryName}</p>
//     </div>
//     <div className="flex items-center">
//       <p className="text-lg font-medium text-gray-700">State Name:</p>
//       <p className="text-lg text-gray-600">{logindata?.StateName}</p>
//     </div>
//   </div>

//   {/* Update Button */}
//   {/* <div className="text-right">
//     <button
//       onClick={() => setIsEditing(true)}
//       className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full transition duration-300 ease-in-out"
//     >
//       Update
//     </button>
//   </div> */}
//    <div className="text-right">
//         <button
//           onClick={handleUpdateButtonClick}
//           className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full transition duration-300 ease-in-out"
//         >
//           Update
//         </button>
// </div>
// </div>
<div className="w-full max-w-4xl mx-auto p-6">
  {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Profile</h2> */}

  {/* Full Name & Employee ID Section */}
  <div className="grid grid-cols-2 gap-6 mb-2 pb-4">
    {/* <div className="space-y-1">
      <p className="text-sm font-semibold text-gray-500">Full Name</p>
      <p className="text-lg font-medium text-gray-700">{logindata.FirstName} {logindata.LastName}</p>
    </div> */}
    <div className="flex items-center">
  <p className="text-sm font-semibold text-gray-500 w-1/3">Full Name</p>
  <span className="text-gray-800 mr-8">:</span>
  <p className="text-lg font-medium text-gray-700">{logindata.FirstName} {logindata.LastName}</p>
</div>

    <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500 w-1/3">Employee ID</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{logindata.EmployeeID}</p>
    </div>
  </div>

  {/* Store Name & Role Section */}
  <div className="grid grid-cols-2 gap-6 mb-2 pb-4">
  <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Store Name</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{logindata.StoreName}</p>
    </div>
    <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Role</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{selectedRole?.RoleName}</p>
    </div>
  </div>

  {/* Email & Phone Section */}
  <div className="grid grid-cols-2 gap-6 mb-2 pb-4">
  <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Email</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700  w-1/3">{logindata.Email}</p>
    </div>
    <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Phone Number</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700  w-1/3">{logindata?.PhoneNumber}</p>
    </div>
  </div>

  {/* Address Section */}
  <div className="grid grid-cols-2 gap-6 mb-2 pb-4">
  <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Address Line 1</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{logindata.AddressLine1}</p>
    </div>
    <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Address Line 2</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{logindata?.AddressLine2}</p>
    </div>
  </div>

  {/* Location Section */}
  <div className="grid grid-cols-2 gap-6 mb-2">
  <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">Country</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{logindata.CountryName}</p>
    </div>
    <div className="flex items-center">
      <p className="text-sm font-semibold text-gray-500  w-1/3">State</p>
      <span className="text-gray-800 mr-8">:</span>
      <p className="text-lg font-medium text-gray-700">{logindata?.StateName}</p>
    </div>
  </div>

  {/* Update Button */}
  <div className="flex justify-end">
    <button
      onClick={handleUpdateButtonClick}
      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300"
    >
      Update
    </button>
  </div>
</div>

)}

      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
          <LoadingAnimation />
        </div>
      )}
       {isEditing && (
        <form className="w-full " onSubmit={handleFormSubmit}>
          <div className="flex justify-between items-center mb-6">
            {/* <h2 className="heading mb-4 px-24">Users</h2> */}
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-2 px-10 md:px-24">
        
            <div className="w-full xl:w-3/4">
  <label
    htmlFor="storeName"
    className="block text-sm font-medium text-gray-700"
  >
    Store Name <span className="text-red-500">*</span>
  </label>
  <div className="mt-2 mb-1 block w-full rounded-md border py-2 px-4 shadow-sm sm:text-sm bg-gray-100 text-gray-900">
    {selectedStore?.StoreName || "No store selected"}
  </div>
  {!formData.StoreName && errors.StoreNameError && (
    <p className="text-red-500 text-sm mt-1 ">
      {errors.StoreNameError}
    </p>
  )}
</div>

<div className="w-full xl:w-3/4">
  <label
    htmlFor="RoleID"
    className="block text-sm font-medium text-gray-700"
  >
    Role Name <span className="text-red-500">*</span>
  </label>
  <div className="mt-2 mb-1 block w-full rounded-md border py-2 px-4 shadow-sm sm:text-sm bg-gray-100 text-gray-900">
    {selectedRole?.RoleName || "No role selected"}
  </div>
  {!formData.RoleID && errors.RoleIdError && (
    <p className="text-red-500 text-sm mt-1 ">
      {errors.RoleIdError}
    </p>
  )}
</div>


            {/* First Name */}
            <div className="flex items-center">
              <div className="w-full ">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName || ""}
                  onChange={handleFormChange}
                  required
                  className={`mt-2 mb-1 block w-full xl:w-3/4 rounded-md border  shadow-sm py-2 px-4  sm:text-sm ${
                    !formData.FirstName && errors.FirstNameError ? "border-red-400" : "border-gray-400"
                  }`}
                />
                {!formData.FirstName && errors.FirstNameError && (
                  <p className="text-red-500 text-sm mt-1 ">
                    {errors.FirstNameError}
                  </p>
                )}
              </div>
            </div>
            {/* Address Line 1 */}
            <div className="flex items-center">
              <div className="w-full ">
                <label
                  htmlFor="AddressLine1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="AddressLine1"
                  name="AddressLine1"
                  value={formData.AddressLine1 || ""}
                  onChange={handleFormChange}
                  required
                  className={`mt-2 mb-1 block w-full xl:w-3/4 rounded-md border shadow-sm py-2 px-4  sm:text-sm"
                  ${!formData.AddressLine1 &&
                    errors.AddressLine1Error
                      ? "border-red-400"
                      : "border-gray-400"
                  }`}
                />
                {!formData.AddressLine1 && errors.AddressLine1Error && (
                  <p className="text-red-500 text-sm mt-1 ">
                    {errors.AddressLine1Error}
                  </p>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                value={formData.LastName || ""}
                onChange={handleFormChange}
                required
             
                className={`mt-2 mb-1 block w-full xl:w-3/4 rounded-md border shadow-sm py-2 px-4  sm:text-sm border-gray-400
                `}
              />
            
            </div>

            {/* Address Line 2 */}
            <div>
              <label
                htmlFor="AddressLine2"
                className="block text-sm font-medium text-gray-700"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="AddressLine2"
                name="AddressLine2"
                value={formData.AddressLine2 || ""}
                onChange={handleFormChange}
                className="mt-2 mb-1 block w-full xl:w-3/4 rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email || ""}
                onChange={handleFormChange}
                required
                className={`mt-2 mb-1 block w-full xl:w-3/4 rounded-md border shadow-sm py-2 px-4  sm:text-sm ${!formData.Email &&
                  errors.EmailError ? "border-red-400" : "border-gray-400"
                }`}
              />
              {!formData.Email && errors.EmailError && (
                <p className="text-red-500 text-sm mt-1 ">
                  {errors.EmailError}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full xl:w-3/4 ">
                <label
                  htmlFor="Country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <Combobox
                  as="div"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="Country"
                      name="Country"
                      className={`block w-full rounded-md border  py-2 px-4 shadow-sm  sm:text-sm mt-2 mb-1 ${!formData.CountryID &&
                        errors.CountryIdError
                          ? "border-red-400"
                          : "border-gray-400"
                      }`}
                      onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
                      displayValue={(country) => country?.CountryName || ""} // Display selected country name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full xl:w-3/4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {countries
                        .filter((country) =>
                          country.CountryName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        )
                        .map((country) => (
                          <Combobox.Option
                            key={country.CountryID}
                            value={country} // Pass the full country object to onChange
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                          >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">
                              {country.CountryName}
                            </span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {!formData.CountryID && errors.CountryIdError && (
                  <p className="text-red-500 text-sm mt-1 ">
                    {errors.CountryIdError}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className=" xl:w-3/4">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="Password"
                  name="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.Password || ""}
                  onChange={handleFormChange}
                  className={`mt-2 mb-1 block w-full  rounded-md border shadow-sm py-2 px-4  sm:text-sm ${ !formData.Password && 
                    errors.PasswordError ? "border-red-400" : "border-gray-400"
                  }`}
                />
                <span
                  className="absolute right-2 top-1/2 pb-1 transform -translate-y-1/2 cursor-pointer "
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <VisibilityOffIcon
                      fontSize="small"
                      className="opacity-75"
                    />
                  ) : (
                    <VisibilityIcon fontSize="small" className="opacity-75" />
                  )}
                </span>
              </div>
              {!formData.Password && errors.PasswordError && (
                <p className="text-red-500 text-sm mt-1 ">
                  {errors.PasswordError}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full xl:w-3/4 ">
                <label
                  htmlFor="State"
                  className="block text-sm font-medium text-gray-700"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <Combobox
                  as="div"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="State"
                      name="State"
                      className={`block w-full rounded-md border  py-2 px-4 shadow-sm  sm:text-sm mt-2 mb-1 ${ !formData.StateID &&
                        errors.StateIdError
                          ? "border-red-400"
                          : "border-gray-400"
                      }`}
                      onChange={(event) => setQuery(event.target.value)} // Handle the search query
                      displayValue={(state) => state?.StateName || ""} // Show the selected state name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full xl:w-3/4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredStates.map((state) => (
                        <Combobox.Option
                          key={state.StateID}
                          value={state}
                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                        >
                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                            {state.StateName}
                          </span>
                          <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {!formData.StateID && errors.StateIdError && (
                  <p className="text-red-500 text-sm mt-1 ">
                    {errors.StateIdError}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="PhoneNumber"
                name="PhoneNumber"
                value={formData.PhoneNumber || ""}
                onChange={handleFormChange}
                required
                className={`mt-2 mb-1 block w-full xl:w-3/4 rounded-md border  shadow-sm py-2 px-4  sm:text-sm ${ !formData.PhoneNumber &&
                  errors.PhoneNumberError ? "border-red-400" : "border-gray-400"
                }`}
              />
              {!formData.PhoneNumber && errors.PhoneNumberError && (
                <p className="text-red-500 text-sm mt-1 ">
                  {errors.PhoneNumberError}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full xl:w-3/4 ">
                <label
                  htmlFor="City"
                  className="block text-sm font-medium text-gray-700"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <Combobox
                  as="div"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="City"
                      name="City"
                      className={`block w-full rounded-md border  py-2 px-4 shadow-sm  sm:text-sm mt-2 mb-1 ${
                        !formData.CityID && errors.CityIdError
                          ? "border-red-400"
                          : "border-gray-400"
                      }`}
                      onChange={(event) => setQuery(event.target.value)} // Handle the search query
                      displayValue={(city) => city?.CityName || ""} // Show the selected city name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full xl:w-3/4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredCities
                        .filter((city) =>
                          city.CityName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) // Filter based on query
                        .map((city) => (
                          <Combobox.Option
                            key={city.CityID}
                            value={city}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                          >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">
                              {city.CityName}
                            </span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {!formData.CityID && errors.CityIdError && (
                  <p className="text-red-500 text-sm mt-1 ">
                    {errors.CityIdError}
                  </p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div className="w-full xl:w-3/4">
              <label
                htmlFor="Gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <Combobox
                value={selectedGender}
                onChange={handleGenderChange}
                as="div"
              >
                <div className="relative mt-1">
                  <Combobox.Input
                    className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(gender) => gender?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full xl:w-3/4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {genderOptions.map((gender) => (
                      <Combobox.Option
                        key={gender.id}
                        value={gender}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {gender.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            <div>
              <label
                htmlFor="ZipCode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ZipCode"
                name="ZipCode"
                value={formData.ZipCode || ""}
                onChange={handleFormChange}
                required
                className={`mt-2 mb-1 block w-full xl:w-3/4 rounded-md border shadow-sm py-2 px-4  sm:text-sm ${!formData.ZipCode && 
                  errors.ZipCodeError ? "border-red-400" : "border-gray-400"
                }`}
              />
              {!formData.ZipCode && errors.ZipCodeError && (
                <p className="text-red-500 text-sm mt-1 ">
                  {errors.ZipCodeError}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label
                htmlFor="ProfileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="ProfileImage"
                name="ProfileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 mb-1 block w-full xl:w-3/4 rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Comments */}
            <div className="sm:col-span-1">
              <label
                htmlFor="Comments"
                className="block text-sm font-medium text-gray-700"
              >
                Comments
              </label>
              <textarea
                id="Comments"
                name="Comments"
                value={formData.Comments || ""}
                onChange={handleFormChange}
                rows={1}
                className="mt-2 mb-1 block w-full xl:w-3/4 rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              className="button-base save-btn"
              onClick={handleFormSubmit}
            >
              {userId !== "new" ? "Update Profile" : "Create User"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="button-base cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
    
    )}
      </div>
   
        </>
      )}
    </div>
  </div>
  

  );
};

export default Profile;