// import React from 'react';
// import image from '../../assests/Settings/image.jpg';

// const Settings = () => {
//   return (
//     <div className="main-container">
  
//     <div className="body-container">
//       <h2 className="heading">Payments</h2>

//         <div className="flex items-center justify-center px-10 md:px-24">
//           {/* Display Image */}
//           <img
//             src={image}
//             alt="Profile"
//             className="w-48 h-48 object-cover border-4 border-gray-200 shadow-md"
//           />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Settings;

import React from 'react';
import image from '../../assests/Settings/image.jpg';

const Settings = () => {
  return (
    // <div className="main-container">
    //   <div className="body-container">
    //   <h2 className="heading">Payments</h2>
    //     <div>
    //       <img
    //         src={image}
    //         alt="Profile"
    //         className="w-full"
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="main-container">
    <div className="body-container">
      {/* Heading */}
      <h2 className="heading text-2xl font-bold mb-4 text-center">Settings</h2> 
      {/* Image Section */}
    </div>
      <img
        src={image}
        alt="Profile"
        className="w-[60%] h-[60%] mx-auto"
      />
  </div>
  
  );
};

export default Settings;

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