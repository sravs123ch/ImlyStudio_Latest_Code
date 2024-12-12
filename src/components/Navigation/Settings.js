// import React from 'react';
// import image from '../../assests/Settings/image.jpg';

// const Settings = () => {
//   return (
//     // <div className="main-container">
//     //   <div className="body-container">
//     //   <h2 className="heading">Payments</h2>
//     //     <div>
//     //       <img
//     //         src={image}
//     //         alt="Profile"
//     //         className="w-full"
//     //       />
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="main-container">
//     <div className="body-container">
//       {/* Heading */}
//       <h2 className="heading text-2xl font-bold mb-4 text-center">Settings</h2> 
//       {/* Image Section */}
//     </div>
//       <img
//         src={image}
//         alt="Profile"
//         className="w-[60%] h-[60%] mx-auto"
//       />
//   </div>
  
//   );
// };

// export default Settings;

// import React from 'react';
// import image from '../../assests/Settings/image.jpg';

// const Settings = () => {
//   return (
   
//     <div className="main-container">
//     <div className="body-container">
//     </div>
//       <img
//         src={image}
//         alt="Photo"
//         className="w-full h-[90%]"
//       />
//   </div>
  
//   );
// };

// export default Settings;


import React, { useState, useRef, useEffect } from "react";
import { FiTrash, FiEye } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from "../Loading/LoadingAnimation";
import { createProject, updateProject, getProjectTypeById } from "../../Constants/apiRoutes";
import { useParams } from "react-router-dom";
import { RiCloseLine } from 'react-icons/ri';
import { FiUpload } from 'react-icons/fi';

// const AddProject = () => {
//     const [formData, setFormData] = useState({
//         storeId: "",
//         projectName: "",
//         isActive: false,
//         imageFile: null,
//         imagePreview: null,
//     });
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const { ProjectTypeID } = useParams();
//     const [projectType, setProjectType] = useState("");
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     imagePreview: reader.result,
//                 }));
//             };
//             reader.readAsDataURL(file);
//             setFormData((prevData) => ({
//                 ...prevData,
//                 imageFile: file,
//             }));
//         }
//     };

//     const handleCancel = () => {
//         navigate("/Project"); // Navigate to the project list page
//     };

//     const handleDelete = () => {
//         setFormData((prevData) => ({
//             ...prevData,
//             imagePreview: null,
//             imageFile: null,
//         }));
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const handleView = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//         setErrors({ ...errors, [name]: "" });
//     };
//     const validateForm = () => {
//         const formErrors = {};

//         if (!formData.projectName.trim()) {
//             formErrors.projectName = "Project Name is required.";
//         }

//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // No errors = valid
//     };
//     useEffect(() => {
//         if (ProjectTypeID) {
//             axios
//                 .get(`${getProjectTypeById}/${ProjectTypeID}`)
//                 .then((response) => {
//                     // Validate that the response structure matches the expected format
//                     if (response.data && response.data.message === "Project Type retrieved successfully") {
//                         setProjectType(response.data.data); // Update state with project type data
//                     } else {
//                         console.error("Unexpected response structure:", response.data);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching project type data:', error);
//                 });
//         }
//     }, [ProjectTypeID]);
//     useEffect(() => {
//         if (editMode) {
//             setFormData({
//                 projectName: projectType.ProjectTypeName?.replace(/['"]/g, '') || "",
//                 isActive: projectType.Status || "",
//                 imageFile: projectType.FileUrl, // Update if required from store
//                 imagePreview: projectType.FileUrl, // Update if required from store
//             });
//         }
//     }, [editMode, projectType]);

//     const handleSubmit = async () => {
//         if (validateForm()) {
//             setLoading(true);
//             const projectData = new FormData(); // Create FormData object
//             projectData.append('ProjectTypeName', String(formData.projectName));
//             projectData.append('Status', formData.isActive ? 'Active' : 'Inactive'); // Match backend expectations
//             projectData.append('UploadDocument', formData.imageFile);
//             projectData.append('CreatedBy', 'admin');

//             try {
//                 const response = await axios.post(
//                     createProject,
//                     projectData,
//                     {
//                         headers: {
//                             'Content-Type': 'multipart/form-data',
//                         },
//                     }
//                 );

//                 // Show success toast notification
//                 toast.success(response.data.message || 'Project added successfully!', {
//                     position: 'top-right',
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });

//                 // Reset form fields
//                 setFormData({
//                     storeId: "",         // Clear storeId
//                     projectName: "",     // Clear projectName
//                     isActive: false,     // Reset isActive to false
//                     imageFile: null,     // Clear imageFile
//                     imagePreview: null,  // Clear imagePreview
//                 });
//                 // Clear file input field
//                 const fileInput = document.getElementById("fileInput"); // Ensure the file input has this ID
//                 if (fileInput) {
//                     fileInput.value = "";
//                 }
//                 if (fileInputRef.current) {
//                     fileInputRef.current.value = '';
//                 }
//                 setTimeout(() => {
//                     handleCancel(); // Call the handleCancel function after the delay
//                 }, 3000);

//             } catch (error) {
//                 // Show error toast notification
//                 toast.error(error.response?.data?.message || 'Failed to add project!', {
//                     position: 'top-right',
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });
//             }
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         if (ProjectTypeID) {
//             setEditMode(Boolean(ProjectTypeID)); // Set editMode based on categoryData
//         }
//     }, [ProjectTypeID]);
//     const handleProjectUpdate = async () => {
//         setLoading(true);
//         const projectData = new FormData(); // Create FormData object
//         projectData.append('ProjectTypeName', formData.projectName);
//         projectData.append('Status', formData.isActive); // Match backend expectations
//         projectData.append('UploadDocument', formData.imageFile);
//         projectData.append('CreatedBy', 'admin');
//         projectData.append('UpdatedBy', 'admin');

//         try {
//             const response = await axios.put(
//                 `${updateProject}/${ProjectTypeID}`, // Include project ID in the URL
//                 projectData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );

//             // Show success toast notification
//             toast.success(response.data.message || 'Project updated successfully!', {
//                 position: 'top-right',
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             // Reset form fields
//             setFormData({
//                 storeId: "",         // Clear storeId
//                 projectName: "",     // Clear projectName
//                 isActive: false,     // Reset isActive to false
//                 imageFile: null,     // Clear imageFile
//                 imagePreview: null,  // Clear imagePreview
//                 projectId: "",       // Clear projectId for subsequent submissions
//             });

//             // Clear file input field
//             const fileInput = document.getElementById("fileInput"); // Ensure the file input has this ID
//             if (fileInput) {
//                 fileInput.value = "";
//             }
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = '';
//             }
//             setTimeout(() => {
//                 handleCancel(); // Call the handleCancel function after the delay
//             }, 3000);
//         } catch (error) {
//             // Show error toast notification
//             toast.error(error.response?.data?.message || 'Failed to update project!', {
//                 position: 'top-right',
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//         setLoading(false);
//     };
//     return (
//         <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-56 w-auto mt-4 p-6 rounded-lg">
//             <div className="mt-6 p-6 bg-white">
//                 <ToastContainer /> {loading && <LoadingAnimation />}
//                 <h2 className="heading">
//                     {editMode ? "Update Project" : "Add  Company"}
//                 </h2>
//                 <hr className="border-gray-300 my-4 mb-4" />

//                 <div>
//                     {/* Project Name */}
//                     <div className="mt-8 mb-4 flex items-center">
//                         <label className="block font-semibold w-1/3 text-right pr-4 mb-6">
//                             Company Name <span className="text-red-500">*</span>:
//                         </label>
//                         <div className="w-2/3">
//                             <input
//                                 type="text"
//                                 name="projectName"
//                                 value={formData.projectName}
//                                 onChange={handleInputChange}
//                                 className={`border p-2 w-full sm:w-1/2 rounded-md ${errors.projectName ? "border-red-500" : "border-gray-300"
//                                     }`}
//                                 placeholder="Enter Project Name"
//                             />
//                             <p className={`text-red-500 text-sm h-5 ${errors.projectName ? "visible" : "invisible"}`}>
//                                 {errors.projectName}
//                             </p>
//                         </div>
//                     </div>


//                     {/* Upload Image */}
//                     <div className="mb-4 flex items-start">
//                         <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//                             Upload Image :
//                         </label>
//                         <div className="w-2/3">
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageUpload}
//                                 className="border border-gray-300 p-2 w-full sm:w-1/2 rounded-md"
//                                 ref={fileInputRef}
//                             />
//                             {formData.imagePreview && (
//                                 <div className="relative w-24 h-24 z-28 group overflow-hidden border rounded-md">
//                                     <img
//                                         src={formData.imagePreview}
//                                         alt="Preview"
//                                         className="object-cover w-full h-full"
//                                     />
//                                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                         <button
//                                             onClick={handleDelete}
//                                             className="text-white bg-red-600 p-1 rounded-full mr-2"
//                                         >
//                                             <FiTrash size={14} title="Delete" />
//                                         </button>
//                                         <button
//                                             onClick={() => handleView()}
//                                             className="text-white bg-blue-600 p-1 rounded-full"
//                                         >
//                                             <FiEye size={14} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Modal to view image */}
//                     {isModalOpen && (
//                         <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
//                             <div className="bg-white p-4 rounded-md relative" style={{ width: '500px', height: '500px' }}>
//                                 <button
//                                     onClick={handleCloseModal}
//                                     className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
//                                 >
//                                     <RiCloseLine size={18} />
//                                 </button>
//                                 <img
//                                     src={formData.imagePreview}
//                                     // alt="Full View"
//                                     className="w-full h-full object-contain"
//                                 />
//                             </div>
//                         </div>
//                     )}

//    <div className="mb-4 flex items-start">
//                         <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//                             Upload Logo :
//                         </label>
//                         <div className="w-2/3">
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageUpload}
//                                 className="border border-gray-300 p-2 w-full sm:w-1/2 rounded-md"
//                                 ref={fileInputRef}
//                             />
//                             {formData.imagePreview && (
//                                 <div className="relative w-24 h-24 z-28 group overflow-hidden border rounded-md">
//                                     <img
//                                         src={formData.imagePreview}
//                                         alt="Preview"
//                                         className="object-cover w-full h-full"
//                                     />
//                                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                         <button
//                                             onClick={handleDelete}
//                                             className="text-white bg-red-600 p-1 rounded-full mr-2"
//                                         >
//                                             <FiTrash size={14} title="Delete" />
//                                         </button>
//                                         <button
//                                             onClick={() => handleView()}
//                                             className="text-white bg-blue-600 p-1 rounded-full"
//                                         >
//                                             <FiEye size={14} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="mt-6 flex ml-28 justify-center space-x-4">
//                         <button
//                             type="button"
//                             className="button-base save-btn"
//                             onClick={editMode ? handleProjectUpdate : handleSubmit}
//                         >
//                             {editMode ? 'Update' : 'Save'}
//                         </button>

//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AddProject = () => {
//   const [formData, setFormData] = useState({
//       storeId: "",
//       projectName: "",
//       isActive: false,
//       imageFile: null,
//       imagePreview: null,
//       logoFile: null,
//       logoPreview: null,
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const { ProjectTypeID } = useParams();
//   const [projectType, setProjectType] = useState("");
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   // Handle project image upload
//   const handleProjectImageUpload = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//               setFormData((prevData) => ({
//                   ...prevData,
//                   imagePreview: reader.result,
//               }));
//           };
//           reader.readAsDataURL(file);
//           setFormData((prevData) => ({
//               ...prevData,
//               imageFile: file,
//           }));
//       }
//   };

//   // Handle logo upload
//   const handleLogoUpload = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//               setFormData((prevData) => ({
//                   ...prevData,
//                   logoPreview: reader.result,
//               }));
//           };
//           reader.readAsDataURL(file);
//           setFormData((prevData) => ({
//               ...prevData,
//               logoFile: file,
//           }));
//       }
//   };

//   // Handle modal view
//   const handleView = () => {
//       setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//       setIsModalOpen(false);
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//           ...prevData,
//           [name]: value,
//       }));
//       setErrors({ ...errors, [name]: "" });
//   };

//   // Validate form fields
//   const validateForm = () => {
//       const formErrors = {};
//       if (!formData.projectName.trim()) {
//           formErrors.projectName = "Project Name is required.";
//       }
//       setErrors(formErrors);
//       return Object.keys(formErrors).length === 0;
//   };

//   // Handle submit (create or update project)
//   const handleSubmit = async () => {
//       if (validateForm()) {
//           setLoading(true);
//           const projectData = new FormData();
//           projectData.append('ProjectTypeName', String(formData.projectName));
//           projectData.append('Status', formData.isActive ? 'Active' : 'Inactive');
//           projectData.append('UploadDocument', formData.imageFile);
//           projectData.append('Logo', formData.logoFile); // Add logo to form data
//           projectData.append('CreatedBy', 'admin');

//           try {
//               const response = await axios.post(createProject, projectData, {
//                   headers: {
//                       'Content-Type': 'multipart/form-data',
//                   },
//               });
//               toast.success(response.data.message || 'Project added successfully!', {
//                   position: 'top-right',
//                   autoClose: 5000,
//               });
//               setFormData({
//                   projectName: "",
//                   isActive: false,
//                   imageFile: null,
//                   imagePreview: null,
//                   logoFile: null,
//                   logoPreview: null,
//               });
//               if (fileInputRef.current) {
//                   fileInputRef.current.value = '';
//               }
//               setTimeout(() => {
//                   navigate("/Project");
//               }, 3000);
//           } catch (error) {
//               toast.error(error.response?.data?.message || 'Failed to add project!', {
//                   position: 'top-right',
//                   autoClose: 5000,
//               });
//           }
//           setLoading(false);
//       }
//   };

//   return (
//       <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-56 w-auto mt-4 p-6 rounded-lg">
//           <div className="mt-6 p-6 bg-white">
//               <ToastContainer /> {loading && <LoadingAnimation />}
//               <h2 className="heading">
//                   {editMode ? "Update Company" : "Add Company"}
//               </h2>
//               <hr className="border-gray-300 my-4 mb-4" />

//               <div>
//                   {/* Project Name */}
//                   <div className="mt-8 mb-4 flex items-center">
//                       <label className="block font-semibold w-1/3 text-right pr-4 mb-6">
//                       Company Name <span className="text-red-500">*</span>:
//                       </label>
//                       <div className="w-2/3">
//                           <input
//                               type="text"
//                               name="projectName"
//                               value={formData.projectName}
//                               onChange={handleInputChange}
//                               className={`border p-2 w-full sm:w-1/2 rounded-md ${errors.projectName ? "border-red-500" : "border-gray-300"}`}
//                               placeholder="Enter Project Name"
//                           />
//                           <p className={`text-red-500 text-sm h-5 ${errors.projectName ? "visible" : "invisible"}`}>
//                               {errors.projectName}
//                           </p>
//                       </div>
//                   </div>

// {/* Project Image Upload */}
// <div className="mb-4 flex items-start">
//   <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//     Upload Image:
//   </label>
//   <div className="w-1/3">
//     <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleProjectImageUpload}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center">
//         <FiUpload size={48} className="mb-4" />
//          {/* Upload icon */}
//         <p className="text-gray-700 mb-2 text-lg">Upload Project Image</p>
//         <p className="text-sm text-gray-500 mb-4">Click to choose an image file</p>
//       </label>
//     </div>

//     {formData.imagePreview && (
//       <div className="relative w-24 h-24 z-28 group overflow-hidden border rounded-md mt-4">
//         <img
//           src={formData.imagePreview}
//           alt="Preview"
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <button
//             onClick={() => setFormData(prevData => ({ ...prevData, imagePreview: null, imageFile: null }))}
//             className="text-white bg-red-600 p-1 rounded-full mr-2"
//           >
//             <FiTrash size={14} title="Delete" />
//           </button>
//           <button
//             onClick={handleView}
//             className="text-white bg-blue-600 p-1 rounded-full"
//           >
//             <FiEye size={14} />
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

// {/* Logo Upload */}
// <div className="mb-4 flex items-start">
//   <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//     Upload Logo:
//   </label>
//   <div className="w-1/3">
//     <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleLogoUpload}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center">
//         <FiUpload size={48} className="mb-4" /> {/* Upload icon */}
//         <p className="text-gray-700 mb-2 text-lg">Upload Logo</p>
//         <p className="text-sm text-gray-500 mb-4">Click to choose a logo file</p>
//       </label>
//     </div>

//     {formData.logoPreview && (
//       <div className="relative w-24 h-24 z-28 group overflow-hidden border rounded-md mt-4">
//         <img
//           src={formData.logoPreview}
//           alt="Logo Preview"
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <button
//             onClick={() => setFormData(prevData => ({ ...prevData, logoPreview: null, logoFile: null }))}
//             className="text-white bg-red-600 p-1 rounded-full mr-2"
//           >
//             <FiTrash size={14} title="Delete" />
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

//               </div>

//               {/* Submit and Cancel Buttons */}
//               <div className="mt-4 flex justify-end">
//                   <button
//                       onClick={handleSubmit}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                   >
//                       {loading ? "Saving..." : "Save Company"}
//                   </button>
//               </div>
//           </div>
//       </div>
//   );
// };


// export default AddProject;
import { FcImageFile } from "react-icons/fc";
import { FaRegFileImage } from "react-icons/fa";
  
const AddProject = () => {
    const [formData, setFormData] = useState({
      companyName: "",
      imageFile: null,
      logoFile: null,
      imagePreview: null,
      logoPreview: null,
    });
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Store the selected image for modal
  
    const imageInputRef = useRef(null);
    const logoInputRef = useRef(null);
  
    // Handle project image upload
    const handleProjectImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            imagePreview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
        setFormData((prevData) => ({
          ...prevData,
          imageFile: file,
        }));
      }
    };
  
    // Handle logo upload
    const handleLogoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            logoPreview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
        setFormData((prevData) => ({
          ...prevData,
          logoFile: file,
        }));
      }
    };
  
    // Handle modal view for project image or logo
    const handleView = (imageType) => {
      // Set the selected image based on the type (image or logo)
      const imageToShow = imageType === 'image' ? formData.imagePreview : formData.logoPreview;
      setSelectedImage(imageToShow);
      setIsModalOpen(true);
    };
  
    // Close modal
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedImage(null); // Clear selected image
    };
  
    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-56 w-auto mt-4 p-6 rounded-lg">
        <div className="mt-6 p-6 bg-white">
          {/* Modal for Image Preview */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="relative bg-white p-4 rounded-lg">
                <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh]" />
              
                 <button
                          onClick={handleCloseModal}
                            className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
                        >
                            <RiCloseLine size={18} />
                        </button> 
              </div>
            </div>
          )}
  
          <h2 className="heading">Settings</h2>
          <hr className="border-gray-300 my-4 mb-4" />
  
          {/* Company Name */}
          <div className="mt-8 mb-4 flex items-center">
            <label className="block font-semibold w-1/3 text-right pr-4 mb-6">
              Company Name <span className="text-red-500">*</span>:
            </label>
            <div className="w-2/3">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className={`border p-2 w-full sm:w-1/2 rounded-md`}
                placeholder="Enter Company Name"
              />
            </div>
          </div>
  
         
           {/* <div className="mb-4 flex items-start">
  <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
    Upload Image:
  </label>
  <div className="flex items-center w-1/3"> 
    <div className="flex-1">
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleProjectImageUpload}
          className="hidden"
          ref={imageInputRef}
          id="project-image-upload"
        />
        <label htmlFor="project-image-upload" className="w-full h-full flex flex-col items-center justify-center -mt-3">
          <FaRegFileImage size={30} className="text-gray-400 mb-2"/>
   
          <p className="text-gray-700 -mb-4 text-sm">Upload Image</p>
        </label>
      </div>
    </div>

  </div>
    {formData.imagePreview && (
      <div className="ml-4 relative w-24 h-24 z-28 group overflow-hidden border rounded-md">
        <img
          src={formData.imagePreview}
          alt="Preview"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setFormData(prevData => ({ ...prevData, imagePreview: null, imageFile: null }))} 
            className="text-white bg-red-600 p-1 rounded-full mr-2"
          >
            <FiTrash size={14} title="Delete" />
          </button>
          <button
            onClick={() => handleView('image')} // Open the project image modal
            className="text-white bg-blue-600 p-1 rounded-full"
          >
            <FiEye size={14} />
          </button>
        </div>
      </div>
    )}
</div>  */}
          {/* <FiUpload size={40} className="mb-4" /> */}
          {/* <FiUpload size={36} className="text-custom-blue-table mb-2" /> */}
          {/* <FcImageFile size={36}/> */}
          {/* <div className="mb-4 flex items-start">
  <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
    Upload Image:
  </label>
  <div className="flex items-center w-1/3"> 
    <div className="flex-1">
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleProjectImageUpload}
          className="hidden"
          ref={imageInputRef}
          id="project-image-upload"
        />
        <label htmlFor="project-image-upload" className="w-full h-full flex flex-col items-center justify-center -mt-3">
          <FaRegFileImage size={30} className="text-gray-400 mb-2"/>
   
          <p className="text-gray-700 -mb-4 text-sm">Upload Image</p>
        </label>
    {formData.imagePreview && (
      <div className="ml-4 relative w-24 h-24 z-28 group overflow-hidden border rounded-md">
        <img
          src={formData.imagePreview}
          alt="Preview"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setFormData(prevData => ({ ...prevData, imagePreview: null, imageFile: null }))} 
            className="text-white bg-red-600 p-1 rounded-full mr-2"
          >
            <FiTrash size={14} title="Delete" />
          </button>
          <button
            onClick={() => handleView('image')} // Open the project image modal
            className="text-white bg-blue-600 p-1 rounded-full"
          >
            <FiEye size={14} />
          </button>
        </div>
      </div>
    )}
      </div>
    </div>

  </div>
</div>  */}

<div className="mb-4 flex items-start">
  <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
    Upload Image:
  </label>

  {/* Dashed Border Container with Upload Section and Preview */}
  <div className="w-1/3">
    <label
      htmlFor="project-image-upload"
      className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-start cursor-pointer gap-12"
    >
      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center ml-20">
        <FaRegFileImage size={30} className="text-gray-400 mb-2" />
        <p className="text-gray-700 text-sm">Upload Image</p>
      </div>

      {/* Image Preview */}
      {formData.imagePreview && (
        <div className="ml-4 relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
          <img
            src={formData.imagePreview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  imagePreview: null,
                  imageFile: null,
                }))
              }
              className="text-white bg-red-600 p-1 rounded-full mr-2"
            >
              <FiTrash size={14} title="Delete" />
            </button>
            <button
              onClick={() => handleView('image')}
              className="text-white bg-blue-600 p-1 rounded-full"
            >
              <FiEye size={14} />
            </button>
          </div>
        </div>
      )}
    </label>

    {/* File Input (Hidden) */}
    <input
      type="file"
      accept="image/*"
      onChange={handleProjectImageUpload}
      className="hidden"
      id="project-image-upload"
    />
  </div>
</div>



<div className="mb-4 flex items-start">
  <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
    Upload Logo:
  </label>

  {/* Dashed Border Container with Upload Section and Preview */}
  <div className="w-1/3">
    <label
      htmlFor="logo-upload"
      className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-start cursor-pointer gap-12"
    >
      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center ml-20">
        <FiUpload size={30} className="text-gray-400 mb-2" />
        <p className="text-gray-700 text-sm">Upload Logo</p>
      </div>


      {/* Logo Preview */}
      {formData.logoPreview && (
        <div className="ml-4 relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
          <img
            src={formData.logoPreview}
            alt="Logo Preview"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  logoPreview: null,
                  logoFile: null,
                }))
              }
              className="text-white bg-red-600 p-1 rounded-full mr-2"
            >
              <FiTrash size={14} title="Delete" />
            </button>
            <button
              onClick={() => handleView('logo')}
              className="text-white bg-blue-600 p-1 rounded-full"
            >
              <FiEye size={14} />
            </button>
          </div>
        </div>
      )}
    </label>

    {/* File Input (Hidden) */}
    <input
      type="file"
      accept="image/*"
      onChange={handleLogoUpload}
      className="hidden"
      ref={logoInputRef}
      id="logo-upload"
    />
  </div>
</div>

  
          {/* Submit Button */}
          <div className="mt-4 flex justify-end">
            <button
            //   onClick={handleSubmit}
            //   className="bg-blue-500 text-white p-2 rounded-lg"
               className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Company
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default AddProject;
