// import React, { useState, useRef, useEffect } from "react";
// import { FiTrash, FiEye } from 'react-icons/fi';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LoadingAnimation from "../Loading/LoadingAnimation";
// import { createProject, updateProject, getProjectTypeById } from "../../Constants/apiRoutes";
// import { useParams } from "react-router-dom";
// import { RiCloseLine } from 'react-icons/ri';
// import { FiUpload } from 'react-icons/fi';
// import { FcImageFile } from "react-icons/fc";
// import { FaRegFileImage } from "react-icons/fa";

// const AddProject = () => {
//     const [formData, setFormData] = useState({
//       companyName: "",
//       imageFile: null,
//       logoFile: null,
//       imagePreview: null,
//       logoPreview: null,
//     });

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null); // Store the selected image for modal

//     const imageInputRef = useRef(null);
//     const logoInputRef = useRef(null);

//     // Handle project image upload
//     const handleProjectImageUpload = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setFormData((prevData) => ({
//             ...prevData,
//             imagePreview: reader.result,
//           }));
//         };
//         reader.readAsDataURL(file);
//         setFormData((prevData) => ({
//           ...prevData,
//           imageFile: file,
//         }));
//       }
//     };

//     // Handle logo upload
//     const handleLogoUpload = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setFormData((prevData) => ({
//             ...prevData,
//             logoPreview: reader.result,
//           }));
//         };
//         reader.readAsDataURL(file);
//         setFormData((prevData) => ({
//           ...prevData,
//           logoFile: file,
//         }));
//       }
//     };

//     // Handle modal view for project image or logo
//     const handleView = (imageType) => {
//       // Set the selected image based on the type (image or logo)
//       const imageToShow = imageType === 'image' ? formData.imagePreview : formData.logoPreview;
//       setSelectedImage(imageToShow);
//       setIsModalOpen(true);
//     };

//     // Close modal
//     const handleCloseModal = () => {
//       setIsModalOpen(false);
//       setSelectedImage(null); // Clear selected image
//     };

//     return (
//       <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-56 w-auto mt-4 p-6 rounded-lg">
//         <div className="mt-6 p-6 bg-white">
//           {/* Modal for Image Preview */}
//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="relative bg-white p-4 rounded-lg">
//                 <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh]" />

//                  <button
//                           onClick={handleCloseModal}
//                             className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
//                         >
//                             <RiCloseLine size={18} />
//                         </button>
//               </div>
//             </div>
//           )}

//           <h2 className="heading">Settings</h2>
//           <hr className="border-gray-300 my-4 mb-4" />

//           {/* Company Name */}
//           <div className="mt-8 mb-4 flex items-center">
//             <label className="block font-semibold w-1/3 text-right pr-4 mb-6">
//               Company Name <span className="text-red-500">*</span>:
//             </label>
//             <div className="w-2/3">
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
//                 className={`border p-2 w-full sm:w-1/2 rounded-md`}
//                 placeholder="Enter Company Name"
//               />
//             </div>
//           </div>
// {/*
// <div className="mb-4 flex items-start">
//   <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//     Upload Image:
//   </label>

//   <div className="w-1/3">
//     <label
//       htmlFor="project-image-upload"
//       className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-start cursor-pointer gap-12"
//     >

//       <div className="flex flex-col items-center justify-center ml-20">
//         <FaRegFileImage size={30} className="text-gray-400 mb-2" />
//         <p className="text-gray-700 text-sm">Upload Image</p>
//       </div>

//       {formData.imagePreview && (
//         <div className="ml-4 relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
//           <img
//             src={formData.imagePreview}
//             alt="Preview"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//             <button
//               onClick={() =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   imagePreview: null,
//                   imageFile: null,
//                 }))
//               }
//               className="text-white bg-red-600 p-1 rounded-full mr-2"
//             >
//               <FiTrash size={14} title="Delete" />
//             </button>
//             <button
//               onClick={() => handleView('image')}
//               className="text-white bg-blue-600 p-1 rounded-full"
//             >
//               <FiEye size={14} />
//             </button>
//           </div>
//         </div>
//       )}
//     </label>

//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleProjectImageUpload}
//       className="hidden"
//       id="project-image-upload"
//     />
//   </div>
// </div> */}
// {/*
// <div className="mb-4 flex items-start">
//       <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//         Upload Image:
//       </label>

//       <div className="w-1/3">
//         <label
//           htmlFor="project-image-upload"
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer gap-12"
//         >

//           {formData.imagePreview ? (
//             <div className="relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
//               <img
//                 src={formData.imagePreview}
//                 alt="Preview"
//                 className="object-cover w-full h-full"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                 <button
//                   onClick={() =>
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       imagePreview: null,
//                       imageFile: null,
//                     }))
//                   }
//                   className="text-white bg-red-600 p-1 rounded-full mr-2"
//                 >
//                   <FiTrash size={14} title="Delete" />
//                 </button>
//                 <button
//                   onClick={() => handleView("image")}
//                   className="text-white bg-blue-600 p-1 rounded-full"
//                 >
//                   <FiEye size={14} />
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center">
//               <FaRegFileImage size={30} className="text-gray-400 mb-2" />
//               <p className="text-gray-700 text-sm">Upload Image</p>
//             </div>
//           )}
//         </label>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleProjectImageUpload}
//           className="hidden"
//           id="project-image-upload"
//         />
//       </div>
//     </div> */}

// <div className="mb-4 flex items-start">
//   <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//     Upload Image:
//   </label>

//   {/* Dashed Border Container with Upload Section and Preview */}
//   <div className="w-1/3">
//     <label
//       htmlFor="project-image-upload"
//       className={`rounded-lg flex items-center justify-center cursor-pointer gap-12 ${
//         formData.imagePreview
//           ? "p-0 border-none" // Remove padding and border when image exists
//           : "border-dashed border-2 border-gray-300 p-4"
//       }`}
//     >
//       {/* If image is uploaded, show the uploaded image, else show the icon and text */}
//       {formData.imagePreview ? (
//         <div className="relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
//           <img
//             src={formData.imagePreview}
//             alt="Preview"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//             <button
//               onClick={() =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   imagePreview: null,
//                   imageFile: null,
//                 }))
//               }
//               className="text-white bg-red-600 p-1 rounded-full mr-2"
//             >
//               <FiTrash size={14} title="Delete" />
//             </button>
//             <button
//               onClick={() => handleView("image")}
//               className="text-white bg-blue-600 p-1 rounded-full"
//             >
//               <FiEye size={14} />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center">
//           <FaRegFileImage size={30} className="text-gray-400 mb-2" />
//           <p className="text-gray-700 text-sm">Upload Image</p>
//         </div>
//       )}
//     </label>

//     {/* File Input (Hidden) */}
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleProjectImageUpload}
//       className="hidden"
//       id="project-image-upload"
//     />
//   </div>
// </div>

// {/* <div className="mb-4 flex items-start">
//   <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//     Upload Logo:
//   </label>

//   <div className="w-1/3">
//     <label
//       htmlFor="logo-upload"
//       className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-start cursor-pointer gap-12"
//     >

//       <div className="flex flex-col items-center justify-center ml-20">
//         <FiUpload size={30} className="text-gray-400 mb-2" />
//         <p className="text-gray-700 text-sm">Upload Logo</p>
//       </div>

//       {formData.logoPreview && (
//         <div className="ml-4 relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
//           <img
//             src={formData.logoPreview}
//             alt="Logo Preview"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//             <button
//               onClick={() =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   logoPreview: null,
//                   logoFile: null,
//                 }))
//               }
//               className="text-white bg-red-600 p-1 rounded-full mr-2"
//             >
//               <FiTrash size={14} title="Delete" />
//             </button>
//             <button
//               onClick={() => handleView('logo')}
//               className="text-white bg-blue-600 p-1 rounded-full"
//             >
//               <FiEye size={14} />
//             </button>
//           </div>
//         </div>
//       )}
//     </label>

//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleLogoUpload}
//       className="hidden"
//       ref={logoInputRef}
//       id="logo-upload"
//     />
//   </div>
// </div> */}
// {/* <div className="mb-4 flex items-start">
//       <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//         Upload Logo:
//       </label>

//       <div className="w-1/3">
//         <label
//           htmlFor="logo-upload"
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer gap-12"
//         >

//           {formData.logoPreview ? (
//             <div className="relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
//               <img
//                 src={formData.logoPreview}
//                 alt="Logo Preview"
//                 className="object-cover w-full h-full"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                 <button
//                   onClick={() =>
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       logoPreview: null,
//                       logoFile: null,
//                     }))
//                   }
//                   className="text-white bg-red-600 p-1 rounded-full mr-2"
//                 >
//                   <FiTrash size={14} title="Delete" />
//                 </button>
//                 <button
//                   onClick={() => handleView("logo")}
//                   className="text-white bg-blue-600 p-1 rounded-full"
//                 >
//                   <FiEye size={14} />
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center">
//               <FiUpload size={30} className="text-gray-400 mb-2" />
//               <p className="text-gray-700 text-sm">Upload Logo</p>
//             </div>
//           )}
//         </label>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleLogoUpload}
//           className="hidden"
//           ref={logoInputRef}
//           id="logo-upload"
//         />
//       </div>
//     </div> */}

// <div className="mb-4 flex items-start">
//   <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
//     Upload Logo:
//   </label>

//   {/* Dashed Border Container with Upload Section and Preview */}
//   <div className="w-1/3">
//     <label
//       htmlFor="logo-upload"
//       className={`rounded-lg flex items-center justify-center cursor-pointer ${
//         formData.logoPreview
//           ? "p-0 border-none" // Remove padding and border when logo is uploaded
//           : "border-dashed border-2 border-gray-300 p-4"
//       }`}
//     >
//       {/* If logo is uploaded, show the uploaded logo, else show the icon and text */}
//       {formData.logoPreview ? (
//         <div className="relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
//           <img
//             src={formData.logoPreview}
//             alt="Logo Preview"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//             <button
//               onClick={() =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   logoPreview: null,
//                   logoFile: null,
//                 }))
//               }
//               className="text-white bg-red-600 p-1 rounded-full mr-2"
//             >
//               <FiTrash size={14} title="Delete" />
//             </button>
//             <button
//               onClick={() => handleView("logo")}
//               className="text-white bg-blue-600 p-1 rounded-full"
//             >
//               <FiEye size={14} />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center">
//           <FiUpload size={30} className="text-gray-400 mb-2" />
//           <p className="text-gray-700 text-sm">Upload Logo</p>
//         </div>
//       )}
//     </label>

//     {/* File Input (Hidden) */}
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleLogoUpload}
//       className="hidden"
//       ref={logoInputRef}
//       id="logo-upload"
//     />
//   </div>
// </div>

//           {/* Submit Button */}
//           <div className="mt-4 flex justify-end">
//             <button
//             //   onClick={handleSubmit}
//             //   className="bg-blue-500 text-white p-2 rounded-lg"
//                className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Save Company
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default AddProject;

// import { FiArrowUp } from "react-icons/fi";

// const UploadLogo = () => {
//   const [formData, setFormData] = useState({
//     logoFile: null,
//     logoPreview: null,
//     isUploaded: false,
//     uploadProgress: 0,
//   });

//   const simulateUploadProgress = () => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       if (progress < 100) {
//         progress += 10;
//         setFormData((prevData) => ({
//           ...prevData,
//           uploadProgress: progress,
//         }));
//       } else {
//         clearInterval(interval);
//         setFormData((prevData) => ({
//           ...prevData,
//           isUploaded: true,
//         }));
//       }
//     }, 500);
//   };

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setFormData({
//         logoFile: file,
//         logoPreview: previewUrl,
//         isUploaded: false,
//         uploadProgress: 0,
//       });
//       simulateUploadProgress();
//     }
//   };

//   return (
//     <div className="flex justify-center mt-20">
//       <div className="w-96 p-8 border border-gray-300 rounded-lg text-center">
//         <label htmlFor="logo-upload" className="cursor-pointer block py-6">
//           <div className="relative w-32 h-32 mx-auto">
//             {/* Outer Progress Circle */}
//             <div
//               className="absolute -top-1.5 -left-1.5 w-[140px] h-[140px] rounded-full"
//               style={{
//                 background: `conic-gradient(#4CAF50 ${formData.uploadProgress}%, #ddd ${formData.uploadProgress}%)`,
//               }}
//             ></div>

//             {/* Inner White Circle */}
//             <div className="relative w-full h-full rounded-full bg-white flex justify-center items-center border border-gray-300">
//               {formData.logoPreview ? (
//                 <img
//                   src={formData.logoPreview}
//                   alt="Logo Preview"
//                   className="object-cover w-full h-full rounded-full"
//                 />
//               ) : (
//                 <FiArrowUp size={40} className="text-gray-400" />
//               )}
//             </div>

//             {/* Buttons */}
//             {formData.isUploaded && (
//               <>
//                 <button
//                   onClick={() =>
//                     setFormData({
//                       logoFile: null,
//                       logoPreview: null,
//                       isUploaded: false,
//                       uploadProgress: 0,
//                     })
//                   }
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
//                 >
//                   <FiTrash />
//                 </button>
//                 <button
//                   onClick={() => alert("View Logo")}
//                   className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2"
//                 >
//                   <FiEye />
//                 </button>
//               </>
//             )}
//           </div>
//           <p className="mt-4 text-gray-700 text-sm">
//             Drag files to upload, or
//           </p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleLogoUpload}
//             className="hidden"
//             id="logo-upload"
//           />
//           <label
//             htmlFor="logo-upload"
//             className="block mt-2 text-blue-600 cursor-pointer"
//           >
//             Choose File
//           </label>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default UploadLogo;

import React, { useState, useRef, useEffect } from "react";
import { FiTrash, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../Loading/LoadingAnimation";
import { createTenantSettings } from "../../Constants/apiRoutes";
import { useParams } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
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
  const [isLoading, setIsLoading] = useState(false);

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
    const imageToShow =
      imageType === "image" ? formData.imagePreview : formData.logoPreview;
    setSelectedImage(imageToShow);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // Clear selected image
  };
  // Handle form submission
  // const handleSubmit = async () => {
  //   const formPayload = new FormData();

  //   formPayload.append("TenantID", 2); // Replace with actual Tenant ID
  //   formPayload.append("CompanyName", formData.companyName);
  //   formPayload.append("CompanyLogo", formData.logoFile); // Add the logo file
  //   formPayload.append("CompanyImage", formData.imageFile); // Add the image file

  //   try {
  //     const response = await axios.post(createTenantSettings, formPayload, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log(response.data); // Handle success response
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  // Handle form submission
  const handleSubmit = async () => {
    const formPayload = new FormData();

    formPayload.append("TenantID", 2); // Replace with actual Tenant ID
    formPayload.append("CompanyName", formData.companyName);
    formPayload.append("CompanyLogo", formData.logoFile); // Add the logo file
    formPayload.append("CompanyImage", formData.imageFile); // Add the image file

    setIsLoading(true); // Set loading state to true before submitting the form

    try {
      const response = await axios.post(createTenantSettings, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Handle success response

      // Show success toast
      toast.success("Company created successfully!");

      // Clear form fields after success
      setFormData({
        companyName: "",
        imageFile: null,
        logoFile: null,
        imagePreview: null,
        logoPreview: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error toast
      toast.error("Error creating company!");
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-56 w-auto mt-4 p-6 rounded-lg">
      <ToastContainer /> {isLoading && <LoadingAnimation />}
      <div className="mt-6 p-6 bg-white">
        {/* Modal for Image Preview */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-[80vh]"
              />

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
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className={`border p-2 w-full sm:w-1/2 rounded-md`}
              placeholder="Enter Company Name"
            />
          </div>
        </div>

        <div className="mb-4 flex items-start">
          <label className="block font-semibold w-1/3 text-right pr-4 pt-2">
            Upload Image:
          </label>

          {/* Dashed Border Container with Upload Section and Preview */}
          <div className="w-1/3">
            <label
              htmlFor="project-image-upload"
              className={`rounded-lg flex items-center justify-center cursor-pointer gap-12 ${
                formData.imagePreview
                  ? "p-0 border-none" // Remove padding and border when image exists
                  : "border-dashed border-2 border-gray-300 p-4"
              }`}
            >
              {/* If image is uploaded, show the uploaded image, else show the icon and text */}
              {formData.imagePreview ? (
                <div className="relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
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
                      onClick={() => handleView("image")}
                      className="text-white bg-blue-600 p-1 rounded-full"
                    >
                      <FiEye size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FaRegFileImage size={30} className="text-gray-400 mb-2" />
                  <p className="text-gray-700 text-sm">Upload Image</p>
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
              className={`rounded-lg flex items-center justify-center cursor-pointer ${
                formData.logoPreview
                  ? "p-0 border-none" // Remove padding and border when logo is uploaded
                  : "border-dashed border-2 border-gray-300 p-4"
              }`}
            >
              {/* If logo is uploaded, show the uploaded logo, else show the icon and text */}
              {formData.logoPreview ? (
                <div className="relative w-16 h-16 z-28 group overflow-hidden border rounded-md">
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
                      onClick={() => handleView("logo")}
                      className="text-white bg-blue-600 p-1 rounded-full"
                    >
                      <FiEye size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FiUpload size={30} className="text-gray-400 mb-2" />
                  <p className="text-gray-700 text-sm">Upload Logo</p>
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
            onClick={handleSubmit}
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
