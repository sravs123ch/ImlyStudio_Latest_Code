import { useState, useEffect } from "react";

export const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//   GETORDERBYID_API,
//   CUSTOMERID_API,
//   GETALLSTORESBYID_API,
//   GETALLUSERSBYID_API,
// } from "../../Constants/apiRoutes";
// import { FaUserCircle } from "react-icons/fa"; // User Icon
// import { FaRobot } from "react-icons/fa"; // AI Icon

// const AIChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [typingEffectText, setTypingEffectText] = useState('');
//   const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
//   const messageEndRef = useRef(null);

//   // Handle sending the message
//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message to chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: input, sender: 'user' },
//     ]);
//     setInput('');

//     // Check selected option and trigger respective API fetch
//     if (selectedOption) {
//       if (selectedOption === 'Order') {
//         await fetchOrderDetails(input);
//       } else if (selectedOption === 'Customer') {
//         await fetchCustomerDetails(input);
//       } else if (selectedOption === 'Store') {
//         await fetchStoreDetails(input);
//       } else if (selectedOption === 'User') {
//         await fetchUserDetails(input);
//       }
//     } else {
//       // Default AI Response
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           {
//             text: `AI Response: Please select an option (Order, Customer, Store, User).`,
//             sender: 'ai',
//           },
//         ]);
//       }, 1000);
//     }
//   };

//   // Handle selecting a category
//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setInput('');
//     setError(null);
//   };

//   // Fetching details from APIs
//   const fetchOrderDetails = async (orderId) => {
//     await fetchDetails(orderId, 'Order', `${GETORDERBYID_API}/${orderId}`);
//   };

//   const fetchCustomerDetails = async (customerId) => {
//     await fetchDetails(customerId, 'Customer', `${CUSTOMERID_API}/${customerId}`);
//   };

//   const fetchStoreDetails = async (storeId) => {
//     await fetchDetails(storeId, 'Store', `${GETALLSTORESBYID_API}/${storeId}`);
//   };

//   const fetchUserDetails = async (userId) => {
//     await fetchDetails(userId, 'User', `${GETALLUSERSBYID_API}/${userId}`);
//   };

//   // Fetch details from API and format response
//   const fetchDetails = async (id, type, apiUrl) => {
//     if (id.trim() === '') {
//       setError(`${type} ID can't be empty`);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(apiUrl);
//       const fetchedData = response.data;

//       if (fetchedData) {
//         const formattedResponse = formatResponse(fetchedData);
//         setMessages((prev) => [
//           ...prev,
//           { text: `${type} details are loading...`, sender: 'ai' },
//         ]);
//         // Start the typing effect
//         simulateTypingEffect(formattedResponse);
//       } else {
//         setError(`${type} not found.`);
//       }
//     } catch (err) {
//       setError(`Failed to fetch ${type} details.`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Format the response data into a readable string
//   const formatResponse = (data) => {
//     const mainData = data.order || data.customer || data;

//     const formattedData = Object.entries(mainData)
//       .filter(([_, value]) => value !== null)
//       .map(([key, value]) => `${key}: ${value}`)
//       .join('\n');

//     return formattedData;
//   };

//   // Simulate the typing effect
//   const simulateTypingEffect = (text) => {
//     let i = 0;
//     const typingInterval = setInterval(() => {
//       if (i < text.length) {
//         setTypingEffectText((prevText) => prevText + text[i]);
//         i++;
//       } else {
//         clearInterval(typingInterval);
//       }
//     }, 100); // Adjust typing speed here
//   };

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="main-container h-[94vh] flex flex-col">
//       <div className="flex-1 flex bg-gray-100">
//         <div className="w-1/3 bg-gray-200 p-4">
//           <h2 className="text-lg font-semibold mb-4">Chat History</h2>
//           <div className="p-2 bg-white rounded-lg shadow-md">
//             <p>
//               {messages.length > 0 && `Order Details:OrderID ${messages[0].text.split('<br>')[0]}       ...`}
//             </p>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col">
//           <div className="flex-1 flex flex-col justify-between overflow-hidden">
//             <div className="p-6 flex flex-col space-y-4 overflow-y-auto">
//               <h2 className="text-xl font-semibold mb-4">AI ChatBox</h2>
//               <div className="flex-1 overflow-y-auto space-y-10 pr-4 mt-4">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     {msg.sender !== 'user' && (
//                       <div className="flex items-start">
//                         <FaRobot className="text-gray-500 mr-2 text-2xl mt-1" />

                       
//                         <div className="p-3 rounded-lg max-w-xs bg-gray-300 text-black">
//                           {msg.text === 'AI is typing...' ? (
//                             'AI is typing...'
//                           ) : (
//                             typingEffectText
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {msg.sender === 'user' && (
//                       <div className="flex items-start">
//                         <div className="p-3 rounded-lg max-w-xs bg-blue-500 text-white">
//                           {msg.text}
//                         </div>
//                         <FaUserCircle className="text-blue-500 ml-2 text-2xl mt-1" />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
//             </div>

//             <div className="bg-white border-t border-gray-300 p-4">
//               <div className="flex flex-col space-y-4">
//                 <div className="space-x-3 flex">
//                   <input
//                     type="button"
//                     value="Orders"
//                     onClick={() => handleOptionSelect('Order')}
//                     className="w-auto p-2 bg-blue-600 text-white rounded-md cursor-pointer"
//                   />
//                   <input
//                     type="button"
//                     value="Customers"
//                     onClick={() => handleOptionSelect('Customer')}
//                     className="w-auto p-2 bg-blue-600 text-white rounded-md cursor-pointer"
//                   />
//                   <input
//                     type="button"
//                     value="Stores"
//                     onClick={() => handleOptionSelect('Store')}
//                     className="w-auto p-2 bg-blue-600 text-white rounded-md cursor-pointer"
//                   />
//                   <input
//                     type="button"
//                     value="Users"
//                     onClick={() => handleOptionSelect('User')}
//                     className="w-auto p-2 bg-blue-600 text-white rounded-md cursor-pointer"
//                   />
//                 </div>

//                 <div className="flex">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     className="flex-1 p-3 rounded-l-lg border border-gray-300"
//                     placeholder={selectedOption ? `Enter ${selectedOption} ID` : 'Type a message...'}
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-r-lg"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Loading...' : 'Send'}
//                   </button>
//                 </div>

//                 {error && <p className="text-red-500">{error}</p>}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIChatScreen;



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//   GETORDERBYID_API,
//   CUSTOMERID_API,
//   GETALLSTORESBYID_API,
//   GETALLUSERSBYID_API,GET_MAPSTORE_USERBYSTOREID,
//   GET_ALL_HYSTORYID_API,GETALLSTORES_API,GETALLUSERS_API,GET_ALL_PAYMENTS_API,
//   GET_PAYMENTSBY_ORDERID_API,HolidaysList,getProjectTypeById,GET_ALL_ORDERS,GETALLCUSTOMERS_API
// } from "../../Constants/apiRoutes";
// import { FaArrowUp } from "react-icons/fa";
// import { IoMdSquare } from "react-icons/io";
// import { FaUserAlt } from 'react-icons/fa'; // For user icon
// import { FaRobot } from 'react-icons/fa'; // For response icon
// import DOMPurify from 'dompurify';import TextField from '@mui/material/TextField';
// import Datepicker from 'react-tailwindcss-datepicker';

// const AIChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [selectedOption, setSelectedOption] = useState(null); // Main Option
//   const [subOption, setSubOption] = useState(null); // Sub-option
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showOptions, setShowOptions] = useState(true);
//   const messageEndRef = useRef(null);
//   const [value, setValue] = useState({ startDate: null, endDate: null });
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
  
//   const mainOptions = [
//     'Orders',
//     'Customers',
//     // 'Store Details',
//     // 'User Details',
//     // 'Project Types',
//     // 'Reference',
//     'Payment Details',
//     'Holidays',
//   ];

//   const subOptions = {
//     'Orders': ['Order Details', 'Status Details', 'Payment Details'],
//     'Store Details': ['Store Details', 'Store Users'],
//     'Customers': ['Customer Details', 'Payment Details'],
//     'User Details': ['User Info'],
//     'Project Types': ['Project Info'],
//   };


//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setSubOption(null); // Reset sub-options
//     setInput(''); // Correctly reset input
//     setError(null);
//     setShowOptions(false);
//     setInput(option); // <-- This line is causing the problem
//   };
  

//   const handleSubOptionSelect = (subOption) => {
//     setSubOption(subOption);
//     setInput('');
//     setError(null);
    
//   };

//   const fetchDetails = async (id, type, apiUrl) => {
//     if (id.trim() === '') {
//       setError(`${type} ID can't be empty`);
//       return;
//     }
  
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("No authentication token found");
//     }
  
//     setIsLoading(true);
//     setError(null);
  
//     try {
//       const response = await axios.get(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json", // Ensures correct content type
//         },
//         params: { id }, // Query parameter
//       });
  
//       const fetchedData = response.data;
  
//       // Main Order Details
//       if (fetchedData && fetchedData.order) {
//         const firstOrder = fetchedData.order;
  
//         const formattedOrder = `
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Order ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderID}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Order Number:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderNumber}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Order Status:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderStatus}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Customer Name:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerName}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Email:</span> <span class="text-blue-500 w-2/3">${firstOrder.Email}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Phone:</span> <span class="text-blue-500 w-2/3">${firstOrder.Phone}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Customer ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerID}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Total Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.TotalAmount}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Advance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.AdvanceAmount}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Balance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.BalanceAmount}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.DeliveryDate}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Status Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.StatusDeliveryDate}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 mb-4">
//   <span class="text-black w-1/3">Designer Name:</span> 
// <span class="text-blue-500 w-2/3">${firstOrder.DesginerFirstName} ${firstOrder.DesginerLastName}</span>

//   </div>
// `.trim();


//         setMessages((prev) => [
//           ...prev,
//           { text: `${type}:\n${formattedOrder}`, sender: 'ai' },
//         ]);
//       }
  
//       // Order History Details
//       if (Array.isArray(fetchedData) && fetchedData.length > 0) {
//         const firstHistory = fetchedData[0];
  
//         const formattedHistory = `
//   <div class="flex items-center space-x-2 -mb-4">
//     <span class="text-black whitespace-nowrap">Order History ID:</span> 
//     <span class="text-blue-500">${firstHistory.OrderHistoryID}</span>
//   </div>
//   <div class="flex items-center space-x-2 -mb-4">
//     <span class="text-black  whitespace-nowrap">Assigned To:</span> 
//     <span class="text-blue-500">${firstHistory.FirstName} ${firstHistory.LastName}</span>
//   </div>
//   <div class="flex items-center space-x-2 -mb-4">
//     <span class="text-black  whitespace-nowrap">Role:</span> 
//     <span class="text-blue-500">${firstHistory.RoleName}</span>
//   </div>
//   <div class="flex items-center space-x-2 -mb-4">
//     <span class="text-black whitespace-nowrap">Comment:</span> 
//     <span class="text-blue-500">${firstHistory.Comment}</span>
//   </div>
//   <div class="flex items-center space-x-2 mb-4">
//     <span class="text-black whitespace-nowrap">Start Date:</span> 
//     <span class="text-blue-500">${new Date(firstHistory.StartDate).toLocaleDateString()}</span>
//   </div>
// `.trim();

  
//         setMessages((prev) => [
//           ...prev,
//           { text: `Order History:\n${formattedHistory}`, sender: 'ai' },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           // { text: `No additional history data found.`, sender: 'ai' },
//         ]);
//       }
  
//       // Payment Details (data array)
//       if (fetchedData && Array.isArray(fetchedData.data) && fetchedData.data.length > 0) {
//         const firstPayment = fetchedData.data[0]; // First item in the payment data array
  
       
//         const formattedPayment = `
//         <div class="flex items-center space-x-2 -mb-4">
//           <span class="text-black whitespace-nowrap">Payment ID:</span> 
//           <span class="text-blue-500">${firstPayment.PaymentID}</span>
//         </div>
//         <div class="flex items-center space-x-2 -mb-4">
//           <span class="text-black whitespace-nowrap">Order ID:</span> 
//           <span class="text-blue-500">${firstPayment.OrderID}</span>
//         </div>
//         <div class="flex items-center space-x-2 -mb-4">
//           <span class="text-black whitespace-nowrap">Payment Date:</span> 
//           <span class="text-blue-500">${new Date(firstPayment.PaymentDate).toLocaleDateString()}</span>
//         </div>
//         <div class="flex items-center space-x-2 -mb-4">
//           <span class="text-black whitespace-nowrap">Amount:</span> 
//           <span class="text-blue-500">${firstPayment.Amount}</span>
//         </div>
//         <div class="flex items-center space-x-2 -mb-4">
//           <span class="text-black whitespace-nowrap">Payment Method:</span> 
//           <span class="text-blue-500">${firstPayment.PaymentMethod}</span>
//         </div>
//         <div class="flex items-center space-x-2 -mb-4">
//           <span class="text-black whitespace-nowrap">Comments:</span> 
//           <span class="text-blue-500">${firstPayment.PaymentComments}</span>
//         </div>
//         <div class="flex items-center space-x-2 mb-4">
//           <span class="text-black whitespace-nowrap">Masked Card Number:</span> 
//           <span class="text-blue-500">${firstPayment.MaskedCardNumber}</span>
//         </div>
//       `.trim();
      
//         setMessages((prev) => [
//           ...prev,
//           { text: `Payment Details:\n${formattedPayment}`, sender: 'ai' },
//         ]);
//       } 
      
//     } catch (err) {
//       console.error("Error in fetching details:", err);
//       setError(`Failed to fetch ${type} details.`);
//     } finally {
//       setIsLoading(false);
//       setShowOptions(true);
//     }
//   };
  
//   const fetchOrders = async (searchText) => {
//     try {
//       const { orders, totalCount } = await getAllOrders(searchText);
//       if (orders && orders.length > 0) {
//         // Fetch only the first order
//         const firstOrder = orders[0];
  

// const formattedResponse = `
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Order ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderID}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Order Number:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderNumber}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Order Status:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderStatus}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Customer Name:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerName}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Email:</span> <span class="text-blue-500 w-2/3">${firstOrder.Email}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Phone:</span> <span class="text-blue-500 w-2/3">${firstOrder.Phone}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Customer ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerID}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Total Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.TotalAmount}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Advance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.AdvanceAmount}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Balance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.BalanceAmount}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.DeliveryDate}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Status Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.StatusDeliveryDate}</span>
//   </div>
//   <div class="flex items-center justify-between space-x-4 -mb-4">
//     <span class="text-black w-1/3">Designer Name:</span> <span class="text-blue-500 w-2/3">${firstOrder.DesginerName}</span>
//   </div>
// `.trim();

//         // Update the state with formatted response
//         setMessages((prev) => [
//           ...prev,
//           { text: formattedResponse, sender: 'ai' },
//         ]);
//       } else {
//         setError('No orders found.');
//       }
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//       setError('Failed to fetch orders.');
//     }
//   };
  
  
//   const getAllOrders = async (searchText) => {
//     try {
//       const response = await axios.get(GET_ALL_ORDERS, {
//         params: {
//           searchText: searchText, // Send the search text correctly
//         },
//       });
//       return {
//         orders: response.data.data, // Assuming 'data' contains the order array
//         totalCount: response.data.totalItems, // Assuming 'totalItems' contains the total count of orders
//       };
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       throw error; // Rethrow the error to be caught in the calling function
//     }
//   };
  
//   const formatResponse = (response, type) => {
//     // Handle specific case for "Orders"
//     if (type === 'Orders' && response?.order) {
//       const order = response.order;
//       return `
//         Order ID: ${order.OrderID}
//         Order Number: ${order.OrderNumber || 'N/A'}
//         Order Status: ${order.OrderStatus}
//         Customer: ${order.CustomerFirstName} ${order.CustomerLastName}
//         Customer Email: ${order.CustomerEmail}
//         Customer Phone: ${order.PhoneNumber}
//         Order Date: ${new Date(order.OrderDate).toLocaleDateString()}
//         Delivery Date: ${new Date(order.DeliveryDate).toLocaleDateString()}
//         Total Quantity: ${order.TotalQuantity}
//         Comments: ${order.Comments || 'No comments'}
//         Designer Name: ${order.DesginerName}
//         Expected Duration: ${order.ExpectedDurationDays} days
//       `.trim();
//     }
  
//     // Default case for formatting other types of data
//     const firstRecord = Array.isArray(response?.data) ? response.data[0] : Array.isArray(response) ? response[0] : response;
  
//     const formatValue = (value) => {
//       if (Array.isArray(value)) {
//         return value.map((item, index) => `Item ${index + 1}: ${formatValue(item)}`).join('<br>');
//       }
//       if (typeof value === 'object' && value !== null) {
//         return Object.entries(value)
//           .map(([key, val]) => `${key}: ${formatValue(val)}`)
//           .join('<br>');
//       }
//       return value; // Primitive values
//     };
  
//     return Object.entries(firstRecord)
//       .filter(([_, value]) => value !== null) // Filter out null values
//       .map(([key, value]) => `${key}: ${formatValue(value)}`)
//       .join('<br>');
//   };
  

//  const handleSendMessage = async () => {
//     if (!input.trim()) return;
  
//     const cleanedOption = selectedOption?.split(' ')[0] || '';
//     const cleanedSubOption = subOption || '';
  
//     // Dynamically generate placeholder text
//     const baseText = subOption
//       ? `Enter ${cleanedOption} ID for ${cleanedSubOption}`
//       : (() => {
//           switch (selectedOption) {
//             case 'Orders':
//               return 'Entered Customer Name to get recent order details';
//             case 'Customers':
//               return 'Enter Customer Name or Mail id to get customer Details';
//             case 'Store Details':
//               return 'Enter Store Name to get Store Details';
//             case 'User Details':
//               return 'Enter User Name to get User Details';
//             case 'Project Types':
//               return 'Enter Project Types to get Project Types';
//             case 'Payment Details':
//               return 'Enter Order ID to get Payment Details';
//             case 'Holidays':
//               return 'Enter year to get holidays list';
//             case 'Reference':
//               return 'Enter Reference ID';
//             default:
//               return 'Enter OrderID';
//           }
//         })();
  
//     // Append the user input to the placeholder text
//     const userMessage = `${baseText} : ${input.trim()}`;
  
//     setMessages([...messages, { text: userMessage, sender: 'user' }]);
//     setInput('');
  
//     // API handling logic remains unchanged
//     if (selectedOption) {
//       let apiUrl = '';
//       const isInputNumber = !isNaN(input.trim());
  
//       switch (selectedOption) {
//         case 'Orders':
//           if (isInputNumber) {
//             if (subOption === 'Order Details') {
//               apiUrl = `${GETORDERBYID_API}/${input}`;
//             }
//             if (subOption === 'Status Details') {
//               apiUrl = `${GET_ALL_HYSTORYID_API}${input}`;
//             }
//             if (subOption === 'Payment Details') {
//               apiUrl = `${GET_PAYMENTSBY_ORDERID_API}/${input}`;
//             }
//           } else {
//             await fetchOrders(input.trim());
//           }
//           break;
  
//         case 'Store Details':
//           if (isInputNumber) {
//             if (subOption === 'Store Details') {
//               apiUrl = `${GETALLSTORESBYID_API}/${input}`;
//             }
//             if (subOption === 'Store Users') {
//               apiUrl = `${GET_MAPSTORE_USERBYSTOREID}/${input}`;
//             }
//           } else {
//             await fetchStores(input.trim());
//           }
//           break;
  
//         case 'Customers':
//           if (isInputNumber) {
//             if (subOption === 'Customer Details') {
//               apiUrl = `${CUSTOMERID_API}/${input}`;
//             }
//           } else {
//             await fetchCustomers(input.trim());
//           }
//           break;
  
//         case 'User Details':
//           if (isInputNumber) {
//             if (subOption === 'User Info') {
//               apiUrl = `${GETALLUSERSBYID_API}/${input}`;
//             }
//             if (subOption === 'User Stores') {
//               apiUrl = `${GETORDERBYID_API}/${input}`;
//             }
//           } else {
//             await fetchUsers(input.trim());
//           }
//           break;
  
//         case 'Project Types':
//           apiUrl = `${getProjectTypeById}/${input}`;
//           break;
  
//         case 'Payment Details':
//           // apiUrl = `${GET_ALL_PAYMENTS_API}/${input}`;
//           // else {
//             await  fetchPayments(input.trim());
//           // }
//           break;

        
  
//         case 'Holidays':
//           apiUrl = `${HolidaysList}/${input}`;
//           break;
  
//         default:
//           break;
//       }
  
//       if (apiUrl) {
//         await fetchDetails(input, subOption || selectedOption, apiUrl);
//       }
//     }
//   };
  
//   const getAllCustomers = async (searchText) => {
//     try {
//       const response = await axios.get(GETALLCUSTOMERS_API, {
//         params: {
//           searchText: searchText, // Send the search text correctly
//         },
//       });
  
//       // Adjust this line to match the response structure
//       return {
//         customers: response.data.customers, // Assuming 'customers' contains the customer array
//       };
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       throw error; // Rethrow the error to be caught in the calling function
//     }
//   };
//   const fetchCustomers = async (searchText) => {
//     try {
//       const { customers, totalCount } = await getAllCustomers(searchText);
  
//       if (customers && customers.length > 0) {
//         // Extract the first customer
//         const firstCustomer = customers[0];
  
//         // Format the first customer's details
//         const formattedResponse = `
//           <div class="flex items-center justify-between space-x-4 -mb-4">
//             <span class="text-black w-1/3">First Name:</span> 
//             <span class="text-blue-500 w-2/3">${firstCustomer.CustomerFirstName}</span>
//           </div>
//           <div class="flex items-center justify-between space-x-4 -mb-4">
//             <span class="text-black w-1/3">Last Name:</span> 
//             <span class="text-blue-500 w-2/3">${firstCustomer.CustomerLastName}</span>
//           </div>
//           <div class="flex items-center justify-between space-x-4 -mb-4">
//             <span class="text-black w-1/3">Email:</span> 
//             <span class="text-blue-500 w-2/3">${firstCustomer.CustomerEmail}</span>
//           </div>
//           <div class="flex items-center justify-between space-x-4 -mb-4">
//             <span class="text-black w-1/3">Phone Number:</span> 
//             <span class="text-blue-500 w-2/3">${firstCustomer.PhoneNumber}</span>
//           </div>
//           <div class="flex items-center justify-between space-x-4 -mb-4">
//             <span class="text-black w-1/3">Alternative Phone Number:</span> 
//             <span class="text-blue-500 w-2/3">${firstCustomer.Alternative_PhoneNumber}</span>
//           </div>
//           <div class="flex items-center justify-between space-x-4 mb-4">
//             <span class="text-black w-1/3">Gender:</span> 
//             <span class="text-blue-500 w-2/3">${firstCustomer.Gender}</span>
//           </div>
//         `.trim();
  
//         // Update the messages with the formatted customer details
//         setMessages((prev) => [
//           ...prev,
//           { text: formattedResponse, sender: 'ai' },
//         ]);
//       } else {
//         setError('No customers found.');
//       }
//     } catch (error) {
//       console.error("Failed to fetch customers:", error);
//       setError('Failed to fetch customers.');
//     }
//   };
  
//   const getAllStores = async (searchText) => {
//     try {
//       const response = await axios.get(GETALLSTORES_API, {
//         params: {
//           UserID: 1,
//           searchText: searchText, // Corrected parameter name
//         },
//       });
  
//       // Return stores and total count in a consistent structure
//       return {
//         stores: response.data.Stores || [], // Correctly access 'Stores'
        
//       };
//     } catch (error) {
//       console.error("Error fetching stores:", error);
//       throw error; // Rethrow for calling function to handle
//     }
//   };
  
//   const fetchStores = async (searchText) => {
   
//     try {
//       const { stores, totalCount } = await getAllStores(searchText);
  
//       if (stores && stores.length > 0) {
//         // Fetch only the first store
//         const firstStore = stores[0];
  
//            const formattedResponse = formatResponse(firstStore );
  
//         // Update the messages with formatted store details
//         setMessages((prev) => [
//           ...prev,
//           { text: `First Store Found (${totalCount} total):\n${formattedResponse}`, sender: 'ai' },
//         ]);
  
//       } else {
//         setError('No stores found.');
//       }
//     } catch (error) {
//       console.error("Failed to fetch stores", error);
//       setError('Failed to fetch stores.');
//     } 
//   };
  
//   // Modified to match the structure of getAllCustomers
// const getAllUsers = async (searchText, storeIDs = []) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("No authentication token found");
//     }

//     const response = await axios.get(GETALLUSERS_API, {
//       params: {
//         SearchText: searchText,
//         StoreIDs: storeIDs,
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     // Adjust to match the response structure
//     return {
//       users: response.data.users, // Assuming 'users' contains the user array
//       totalCount: response.data.totalItems, // Assuming 'totalItems' contains total count
//     };
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error; // Rethrow the error to be caught in the calling function
//   }
// };

// // Refactored fetchUsers function
// const fetchUsers = async (searchText) => {
//   setIsLoading(true);
//   try {
    
//     const { users, totalCount } = await getAllUsers(searchText);

//     if (users && users.length > 0) {
//       // Format the user details to be displayed
//       const firstUser = users[0];
//       // Format the first user's details as needed
//       const formattedResponse = formatResponse(firstUser);

//       // Update the messages with the formatted user details
//       setMessages((prev) => [
//         ...prev,
//         { text: `User: \n${formattedResponse}`, sender: 'ai' },
//       ]);
//     } else {
//       setError('No users found.');
//     }
//   } catch (error) {
//     console.error("Failed to fetch users", error);
//     setError('Failed to fetch users.');
//   } finally {
//     setIsLoading(false);
//   }
// };

// const formatMessage = (message) => {
//   const formattedMessage = message.replace(/\n/g, '<br />');
//   return DOMPurify.sanitize(formattedMessage); // Sanitize the content
// };
// const getAllPayments = async (searchText = "") => {
//   try {
//     const response = await axios.get(`${GET_ALL_PAYMENTS_API}`, {
//       params: {
//         searchText: searchText, // Send the search text correctly
//       },
//     });

//     // Adjust this line to match the response structure
//     return {
//       payments: response.data.data, // Assuming 'data' contains the payments array
//       totalCount: response.data.totalRecords, // Total count of payments
//     };
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     throw error; // Rethrow the error to be caught in the calling function
//   }
// };

// const fetchPayments = async (searchText) => {
//   try {
//     const { payments, totalCount } = await getAllPayments(searchText);

//     if (payments && payments.length > 0) {
//       // Extract the first payment
//       const firstPayment = payments[0];

//       // Format the first payment's details
//       const formattedResponse = `
//         <div class="flex items-center justify-between space-x-4 -mb-4">
//            <span class="text-black whitespace-nowrap">Order Number:</span> 
//           <span class="text-blue-500">${firstPayment.OrderNumber}</span>
//         </div>
//         <div class="flex items-center justify-between space-x-4 -mb-4">
//           <span class="text-black whitespace-nowrap">Customer Name:</span> 
//           <span class="text-blue-500">${firstPayment.CustomerName}</span>
//         </div>
//         <div class="flex items-center justify-between space-x-4 -mb-4">
//            <span class="text-black whitespace-nowrap">Payment Date:</span> 
//           <span class="text-blue-500">${new Date(firstPayment.PaymentDate).toLocaleDateString()}</span>
//         </div>
//         <div class="flex items-center justify-between space-x-4 -mb-4">
//           <span class="text-black whitespace-nowrap">Amount:</span> 
//           <span class="text-blue-500">$${firstPayment.Amount}</span>
//         </div>
//         <div class="flex items-center justify-between space-x-4 -mb-4">
//           <span class="text-black whitespace-nowrap">Payment Method:</span> 
//           <span class="text-blue-500">${firstPayment.PaymentMethod}</span>
//         </div>
//         <div class="flex items-center justify-between space-x-4 mb-4">
//            <span class="text-black whitespace-nowrap">Store Name:</span> 
//           <span class="text-blue-500">${firstPayment.StoreName}</span>
//         </div>
//       `.trim();

//       // Update the messages with the formatted payment details
//       setMessages((prev) => [
//         ...prev,
//         { text: formattedResponse, sender: 'ai' },
//       ]);
//     } else {
//       setError('No payments found.');
//     }
//   } catch (error) {
//     console.error("Failed to fetch payments:", error);
//     setError('Failed to fetch payments.');
//   }
// };



//   return (
//     <div className="main-container h-[94vh] flex flex-col">
//       {/* <h1  className="mb-4 font-bold">AI Assistance - Your Virtual Helper</h1> */}
//       <h2 className="heading">AI Assistance - Your Virtual Helper</h2>
//       <div className="p-4 flex-1 overflow-y-auto space-y-4">

// {messages.map((msg, index) => (
//   <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//     <div className="flex items-start space-x-2">
//       {/* Icon at the start of the message */}
//       {msg.sender === 'user' ? (
//         <FaUserAlt className="text-xl text-custom-blue-table" /> // User icon
//       ) : (
//         <FaRobot className="text-xl text-custom-blue-table" /> // Response icon
//       )}
//       <div
//         className={`p-3 rounded-lg ${
//           msg.sender === 'user' ? 'bg-custom-blue-table text-white' : 'bg-white text-black'
//         }`}
//         // dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} 
//         dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} 
//       />
//     </div>
//   </div>
// ))}


//         <div ref={messageEndRef} />
//       </div>   
// <div className="p-4 bg-white border-t">
//   {showOptions ? (
//     <div className="flex flex-col items-start">
//       <h2 className="mb-4 font-bold">Select the option you need, and we’ll assist you further.</h2>
//       <div className="grid grid-cols-2 gap-3">
//         <div className="flex gap-4 overflow-x-auto">
//           {mainOptions.map((option) => (
//             <button
//               key={option}
//               onClick={() => handleOptionSelect(option)}
//               className="p-2 w-[200px] bg-custom-blue-table text-white rounded-md text-left"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   ) : (
//     <>
//       {selectedOption === 'Payment Details' ? (
//         <div className="border-solid border-gray-400 w-[40%] border-[1px] rounded-lg ml-auto">
//          <Datepicker
//   popoverDirection="down"
//   showShortcuts={true}
//   showFooter={true}
//   placeholder="Start Date and End Date"
//   primaryColor={"purple"}
//   onChange={(value) => {
//     // Log value to check its structure
//     console.log(value); // Log the value to see its structure
//     const start = value?.startDate;
//     const end = value?.endDate;

//     // Check if the dates exist and set them accordingly
//     if (start) setStartDate(start.toLocaleDateString());
//     if (end) setEndDate(end.toLocaleDateString());
//   }}

//           />
//         </div>
//       ) : (
//         subOptions[selectedOption] && !subOption && (
//           <div>
//             <div className="flex flex-col space-y-3 items-start">
//               <h3 className="mb-4 font-bold">
//                 {subOption
//                   ? `Selected Sub-option for ${selectedOption}: ${subOption}`
//                   : `Please select a sub-option, otherwise data will be fetched based on the name below.`}
//               </h3>
//               <div className="flex gap-4 overflow-x-auto">
//                 {subOptions[selectedOption].map((sub) => (
//                   <button
//                     key={sub}
//                     onClick={() => handleSubOptionSelect(sub)}
//                     className="p-2 w-[200px] bg-custom-blue-table text-white rounded-md text-left flex-shrink-0"
//                   >
//                     {sub}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}

//       <div className="flex mt-4">
//   {selectedOption === 'Payment Details' ? (

//     <TextField
//       margin="dense"
//       name="inputField"
//       label="Select Date Range"
//       value={`${startDate} - ${endDate}`} // Display start and end date
//       variant="outlined"
//       fullWidth
//       sx={{
//         mb: 2,
//         '& .MuiOutlinedInput-root': {
//           height: '48px',
//           fontSize: '0.98rem',
//           borderRadius: '8px',
//         },
//       }}
//       disabled={true} // Disabled for display purposes
//     />
//   ) : (
//     <TextField
//     margin="dense"
//     name="inputField"
//     label={
//       subOption
//         ? `Enter ${selectedOption?.split(' ')[0]} ID for ${subOption}`
//         : selectedOption === 'Orders'
//         ? 'Enter Customer Name to get recent order details'
//         : selectedOption === 'Customers'
//         ? 'Enter Customer Name to get customer Details'
//         : selectedOption === 'Store Details'
//         ? 'Enter Store Name to get Store Details'
//         : selectedOption === 'User Details'
//         ? 'Enter User Name to get User Details'
//         : selectedOption === 'Project Types'
//         ? 'Enter Project Types to get Project Types'
//         : selectedOption === 'Holidays'
//         ? 'Enter Year to get holidays list'
//         : selectedOption === 'Reference'
//         ? 'Enter Reference ID'
//         : `Enter ${selectedOption} ID`
//     }
//     value={input} 
//     onChange={(e) => setInput(e.target.value)} // Update input
//     variant="outlined"
//     fullWidth
//     sx={{
//       mb: 2,
//       '& .MuiOutlinedInput-root': {
//         height: '48px',
//         fontSize: '0.98rem',
//         borderRadius: '8px',
//       },
//     }}
//   />
  
//   )}
  
//   <button
//     onClick={handleSendMessage}
//     className="h-[48px] w-[48px] bg-custom-blue-table text-white rounded-full flex justify-center items-center ml-2 mt-2"
//     disabled={isLoading}
//   >
//     {isLoading ? <IoMdSquare size={24} /> : <FaArrowUp size={24} />}
//   </button>
// </div>
  
//  {/* <div className="flex mt-4">
//    <TextField
//     margin="dense"
//     name="inputField"
//     label={
//       subOption
//         ? `Enter ${selectedOption?.split(' ')[0]} ID for ${subOption}`
//         : selectedOption === 'Orders'
//         ? 'Enter Customer Name to get recent order details'
//         : selectedOption === 'Customers'
//         ? 'Enter Customer Name to get customer Details'
//         : selectedOption === 'Store Details'
//         ? 'Enter Store Name to get Store Details'
//         : selectedOption === 'User Details'
//         ? 'Enter User Name to get User Details'
//         : selectedOption === 'Project Types'
//         ? 'Enter Project Types to get Project Types'
//         : selectedOption === 'Payment Details'
//         ? 'Enter Order ID to get Payment Details'
//         : selectedOption === 'Holidays'
//         ? 'Enter year to get holidays list'
//         : selectedOption === 'Reference'
//         ? 'Enter Reference ID'
//         : 'Enter OrderID'
//     }
//     value={input}
//     onChange={(e) => setInput(e.target.value)}
//     variant="outlined"
//     fullWidth
//     sx={{
//       mb: 2,
//       "& .MuiOutlinedInput-root": {
//         height: "48px",
//         fontSize: "0.98rem",
//         borderRadius: "8px",
//       },
//     }}
//   />
 
//   <button
//   onClick={handleSendMessage}
//   className="h-[48px] w-[48px] bg-custom-blue-table text-white rounded-full flex justify-center items-center ml-2 mt-2"
//   disabled={isLoading}
// >
//   {isLoading ? (
//     <IoMdSquare size={24} /> // Adjust the size if needed
//   ) : (
//     <FaArrowUp size={24} /> // Adjust the size if needed
//   )}
// </button>

// </div> */}

//     </>
//   )}
//   {error && <p className="text-red-500 mt-2">{error}</p>}
// </div>

//     </div>
//   );
// };

// export default AIChatScreen;




// // import React, { useState, useRef } from "react";
// // import { FaUserAlt, FaRobot, FaArrowUp } from "react-icons/fa";
// // import { IoMdSquare } from "react-icons/io";
// // import Datepicker from "react-datepicker";
// // import TextField from "@mui/material/TextField";

// // const ChatComponent = () => {
// //   const [selectedOption, setSelectedOption] = useState(null);
// //   const [subOption, setSubOption] = useState(null);
// //   const [showOptions, setShowOptions] = useState(true);
// //   const [input, setInput] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const messageEndRef = useRef(null);

// //   const mainOptions = [
// //     'Orders',
// //     'Customers',
// //     'Payment Details',
// //     'Holidays',
// //   ];

// //   const subOptions = {
// //     'Orders': ['Order Details', 'Status Details', 'Payment Details'],
// //     'Customers': ['Customer Details', 'Payment Details'],
// //     'Payment Details': ['Start Date and End Date'],
// //   };

// //   const handleOptionSelect = (option) => {
// //     setSelectedOption(option);
// //     setSubOption(null); // Reset sub-option when a new main option is selected
// //   };

// //   const handleSubOptionSelect = (sub) => {
// //     setSubOption(sub); // Update selected sub-option
// //   };

// //   const handleSendMessage = () => {
// //     setIsLoading(true);
// //     // Simulate a message send
// //     setTimeout(() => {
// //       setMessages([...messages, { sender: 'user', text: input }]);
// //       setInput('');
// //       setIsLoading(false);
// //     }, 1000);
// //   };

// //   const formatMessage = (message) => {
// //     // Add any formatting to the message here if needed
// //     return message;
// //   };

// //   return (
// //     <div className="main-container h-[94vh] flex flex-col">
// //       <div className="p-4 bg-white border-t">
// //         {showOptions ? (
// //           <div className="flex flex-col items-start">
// //             <h2 className="mb-4 font-bold">Select the option you need, and we’ll assist you further.</h2>
// //             <div className="flex gap-4 overflow-x-auto">
// //   {mainOptions.map((option) => (
// //     <button
// //       key={option}
// //       onClick={() => handleOptionSelect(option)}
// //       className={`p-2 w-[200px] rounded-md text-left ${
// //         selectedOption === null || selectedOption === option
// //           ? 'bg-custom-blue-table text-white' // All buttons are blue initially, selected one stays blue
// //           : 'bg-gray-400 text-black' // Unselected buttons turn gray
// //       }`}
// //     >
// //       {option}
// //     </button>
// //   ))}
// // </div>
// //             {/* Show Sub-options based on selected main option */}
// //             {selectedOption && subOptions[selectedOption] && (
// //               <div className="flex gap-4 mt-4">
// //                 {subOptions[selectedOption].map((sub) => (
// //                   <button
// //                     key={sub}
// //                     onClick={() => handleSubOptionSelect(sub)}
// //                     className={`p-2 w-[200px] rounded-md text-left ${subOption === sub ||subOption===null  ? 'bg-custom-blue-table text-white' // Keep selected option blue with white text
// //                       : 'bg-gray-400 text-black' // Unselected options turn gray
// //                   }`}
// //                     disabled={subOption && subOption !== sub} // Disable the other sub-options after selecting one
// //                   >
// //                     {sub}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           // Render content based on the selected sub-option
// //           <>
// //             {selectedOption === 'Payment Details' && (
// //               <div className="border-solid border-gray-400 w-[40%] border-[1px] rounded-lg ml-auto">
// //                 <Datepicker
// //                   popoverDirection="down"
// //                   showShortcuts={true}
// //                   showFooter={true}
// //                   placeholder="Start Date and End Date"
// //                   primaryColor={"purple"}
// //                   onChange={(value) => {
// //                     const start = value?.startDate;
// //                     const end = value?.endDate;
// //                     if (start) setStartDate(start.toLocaleDateString());
// //                     if (end) setEndDate(end.toLocaleDateString());
// //                   }}
// //                 />
// //               </div>
// //             )}
// //             {subOption && (
// //               <div className="flex flex-col space-y-3 items-start mt-4">
// //                 <h3 className="mb-4 font-bold">{`Selected Sub-option: ${subOption}`}</h3>
// //                 <p>{`You selected ${subOption}. Here is the data for this option.`}</p>

// //                 {/* Show input for the sub-option */}
// //                 <div className="flex mt-4">
// //                   <TextField
// //                     margin="dense"
// //                     name="inputField"
// //                     label={`Enter ${subOption} ID`}
// //                     value={input}
// //                     onChange={(e) => setInput(e.target.value)}
// //                     variant="outlined"
// //                     fullWidth
// //                     sx={{
// //                       mb: 2,
// //                       '& .MuiOutlinedInput-root': {
// //                         height: '48px',
// //                         fontSize: '0.98rem',
// //                         borderRadius: '8px',
// //                       },
// //                     }}
// //                   />
// //                   <button
// //                     onClick={handleSendMessage}
// //                     className="h-[48px] w-[48px] bg-custom-blue-table text-white rounded-full flex justify-center items-center ml-2 mt-2"
// //                     disabled={isLoading}
// //                   >
// //                     {isLoading ? <IoMdSquare size={24} /> : <FaArrowUp size={24} />}
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>

// //       {/* Message display area */}
// //       <div className="p-4 flex-1 overflow-y-auto space-y-4">
// //         {messages.map((msg, index) => (
// //           <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
// //             <div className="flex items-start space-x-2">
// //               {msg.sender === 'user' ? (
// //                 <FaUserAlt className="text-xl text-custom-blue-table" />
// //               ) : (
// //                 <FaRobot className="text-xl text-custom-blue-table" />
// //               )}
// //               <div
// //                 className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-custom-blue-table text-white' : 'bg-white text-black'}`}
// //                 dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
// //               />
// //             </div>
// //           </div>
// //         ))}
// //         <div ref={messageEndRef} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatComponent;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  GETORDERBYID_API,
  CUSTOMERID_API,
  GETALLSTORESBYID_API,
  GETALLUSERSBYID_API,GET_MAPSTORE_USERBYSTOREID,
  GET_ALL_HYSTORYID_API,GETALLSTORES_API,GETALLUSERS_API,GET_ALL_PAYMENTS_API,
  GET_PAYMENTSBY_ORDERID_API,HolidaysList,getProjectTypeById,GET_ALL_ORDERS,GETALLCUSTOMERS_API
} from "../../Constants/apiRoutes";
import { FaArrowUp } from "react-icons/fa";
import { IoMdSquare } from "react-icons/io";
import { FaUserAlt } from 'react-icons/fa'; // For user icon
import { FaRobot } from 'react-icons/fa'; // For response icon
import DOMPurify from 'dompurify';import TextField from '@mui/material/TextField';
import Datepicker from 'react-tailwindcss-datepicker';
import { FaRedoAlt, FaSignOutAlt } from "react-icons/fa"; // Import retry and exit icons

const AIChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // Main Option
  const [subOption, setSubOption] = useState(null); // Sub-option
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const messageEndRef = useRef(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showInputField, setShowInputField] = useState(true);

  const mainOptions = [
    'Orders',
    'Customers',
    // 'Store Details',
    // 'User Details',
    // 'Project Types',
    // 'Reference',
    'Payment Details',
    'Holidays',
  ];

  const subOptions = {
    'Orders':['Order Details', 'Status Details', 'Payment Details'],
    'Store Details':['Store Details', 'Store Users'],
    'Customers':['Customer Details', 'Payment Details'],
    'User Details':['User Info'],
    'Project Types':['Project Info'],
  };

  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  //   setSubOption(null); // Reset sub-options
  //   setInput('');
  //   setError(null);
  //   setShowOptions(false);
  // };

  // const handleSubOptionSelect = (subOption) => {
  //   setSubOption(subOption);
  //   setInput('');
  //   setError(null);
  // };

  const fetchDetails = async (id, type, apiUrl) => {
    if (id.trim() === '') {
      setError(`${type} ID can't be empty`);
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
  
    setIsLoading(true);
    setError(null);
    setShowButtons(true);
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensures correct content type
        },
        params: { id }, // Query parameter
      });
  
      const fetchedData = response.data;
  
      // Main Order Details
      if (fetchedData && fetchedData.order) {
        const firstOrder = fetchedData.order;

        const formattedOrder = `
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Order ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderID}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Order Number:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderNumber}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Order Status:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderStatus}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Customer Name:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerFirstName}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Email:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerEmail}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Phone:</span> <span class="text-blue-500 w-2/3">${firstOrder.PhoneNumber}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Customer ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerID}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Total Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.TotalAmount}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Advance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.AdvanceAmount}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Balance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.BalanceAmount}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.DeliveryDate}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Status Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.StatusDeliveryDate}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 mb-4">
  <span class="text-black w-1/3">Designer Name:</span> 
<span class="text-blue-500 w-2/3">${firstOrder.DesginerFirstName} ${firstOrder.DesginerLastName}</span>

  </div>
`.trim();


        setMessages((prev) => [
          ...prev,
          { text: `${type}:\n${formattedOrder}`, sender: 'ai' },
        ]);
      }
  
      // Order History Details
      if (Array.isArray(fetchedData) && fetchedData.length > 0) {
        const firstHistory = fetchedData[0];
  
        const formattedHistory = `
  <div class="flex items-center space-x-2 -mb-4">
    <span class="text-black whitespace-nowrap">Order History ID:</span> 
    <span class="text-blue-500">${firstHistory.OrderHistoryID}</span>
  </div>
  <div class="flex items-center space-x-2 -mb-4">
    <span class="text-black  whitespace-nowrap">Assigned To:</span> 
    <span class="text-blue-500">${firstHistory.FirstName} ${firstHistory.LastName}</span>
  </div>
  <div class="flex items-center space-x-2 -mb-4">
    <span class="text-black  whitespace-nowrap">Role:</span> 
    <span class="text-blue-500">${firstHistory.RoleName}</span>
  </div>
  <div class="flex items-center space-x-2 -mb-4">
    <span class="text-black whitespace-nowrap">Comment:</span> 
    <span class="text-blue-500">${firstHistory.Comment}</span>
  </div>
  <div class="flex items-center space-x-2 mb-4">
    <span class="text-black whitespace-nowrap">Start Date:</span> 
    <span class="text-blue-500">${new Date(firstHistory.StartDate).toLocaleDateString()}</span>
  </div>
`.trim();

  
        setMessages((prev) => [
          ...prev,
          { text: `Order History:\n${formattedHistory}`, sender: 'ai' },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          // { text: `No additional history data found.`, sender: 'ai' },
        ]);
      }
  
      // Payment Details (data array)
      if (fetchedData && Array.isArray(fetchedData.data) && fetchedData.data.length > 0) {
        const firstPayment = fetchedData.data[0]; // First item in the payment data array
  
        const formattedPayment = `
        <div class="flex items-center space-x-2 -mb-4">
          <span class="text-black whitespace-nowrap">Payment ID:</span> 
          <span class="text-blue-500">${firstPayment.PaymentID}</span>
        </div>
        <div class="flex items-center space-x-2 -mb-4">
          <span class="text-black whitespace-nowrap">Order ID:</span> 
          <span class="text-blue-500">${firstPayment.OrderID}</span>
        </div>
        <div class="flex items-center space-x-2 -mb-4">
          <span class="text-black whitespace-nowrap">Payment Date:</span> 
          <span class="text-blue-500">${new Date(firstPayment.PaymentDate).toLocaleDateString()}</span>
        </div>
        <div class="flex items-center space-x-2 -mb-4">
          <span class="text-black whitespace-nowrap">Amount:</span> 
          <span class="text-blue-500">${firstPayment.Amount}</span>
        </div>
        <div class="flex items-center space-x-2 -mb-4">
          <span class="text-black whitespace-nowrap">Payment Method:</span> 
          <span class="text-blue-500">${firstPayment.PaymentMethod}</span>
        </div>
        <div class="flex items-center space-x-2 -mb-4">
          <span class="text-black whitespace-nowrap">Comments:</span> 
          <span class="text-blue-500">${firstPayment.PaymentComments}</span>
        </div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="text-black whitespace-nowrap">Masked Card Number:</span> 
          <span class="text-blue-500">${firstPayment.MaskedCardNumber}</span>
        </div>
      `.trim();
      
        setMessages((prev) => [
          ...prev,
          { text: `Payment Details:\n${formattedPayment}`, sender: 'ai' },
        ]);
      } 
      // else {
      //   setMessages((prev) => [
      //     ...prev,
      //     { text: `No payment data found.`, sender: 'ai' },
      //   ]);
      // }
    } catch (err) {
      console.error("Error in fetching details:", err);
      setError(`Failed to fetch ${type} details.`);
    } finally {
      setIsLoading(false);
      setShowOptions(true);
    }
  };
  
  const fetchOrders = async (searchText) => {
    try {
      const { orders, totalCount } = await getAllOrders(searchText);
      if (orders && orders.length > 0) {
        // Fetch only the first order
        const firstOrder = orders[0];
  
const formattedResponse = `
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Order ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderID}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Order Number:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderNumber}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Order Status:</span> <span class="text-blue-500 w-2/3">${firstOrder.OrderStatus}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Customer Name:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerName}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Email:</span> <span class="text-blue-500 w-2/3">${firstOrder.Email}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Phone:</span> <span class="text-blue-500 w-2/3">${firstOrder.Phone}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Customer ID:</span> <span class="text-blue-500 w-2/3">${firstOrder.CustomerID}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Total Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.TotalAmount}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Advance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.AdvanceAmount}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Balance Amount:</span> <span class="text-blue-500 w-2/3">${firstOrder.BalanceAmount}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.DeliveryDate}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Status Delivery Date:</span> <span class="text-blue-500 w-2/3">${firstOrder.StatusDeliveryDate}</span>
  </div>
  <div class="flex items-center justify-between space-x-4 -mb-4">
    <span class="text-black w-1/3">Designer Name:</span> <span class="text-blue-500 w-2/3">${firstOrder.DesginerName}</span>
  </div>
`.trim();
setShowButtons(true);
        // Update the state with formatted response
        setMessages((prev) => [
          ...prev,
          { text: formattedResponse, sender: 'ai' },
        ]);
      } 
      else {
        setError('No orders found.');
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError('Failed to fetch orders.');
    }
  };
  
  
  const getAllOrders = async (searchText) => {
    try {
      const response = await axios.get(GET_ALL_ORDERS, {
        params: {
          searchText: searchText, // Send the search text correctly
        },
      });
      return {
        orders: response.data.data, // Assuming 'data' contains the order array
        totalCount: response.data.totalItems, // Assuming 'totalItems' contains the total count of orders
      };
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };
  
  const formatResponse = (response, type) => {
    // Handle specific case for "Orders"
    if (type === 'Orders' && response?.order) {
      const order = response.order;
      setShowButtons(true);
      return `
        Order ID: ${order.OrderID}
        Order Number: ${order.OrderNumber || 'N/A'}
        Order Status: ${order.OrderStatus}
        Customer: ${order.CustomerFirstName} ${order.CustomerLastName}
        Customer Email: ${order.CustomerEmail}
        Customer Phone: ${order.PhoneNumber}
        Order Date: ${new Date(order.OrderDate).toLocaleDateString()}
        Delivery Date: ${new Date(order.DeliveryDate).toLocaleDateString()}
        Total Quantity: ${order.TotalQuantity}
        Comments: ${order.Comments || 'No comments'}
        Designer Name: ${order.DesginerName}
        Expected Duration: ${order.ExpectedDurationDays} days
      `.trim();
    }
  
    // Default case for formatting other types of data
    const firstRecord = Array.isArray(response?.data) ? response.data[0] : Array.isArray(response) ? response[0] : response;
  
    const formatValue = (value) => {
      if (Array.isArray(value)) {
        return value.map((item, index) => `Item ${index + 1}: ${formatValue(item)}`).join('<br>');
      }
      if (typeof value === 'object' && value !== null) {
        return Object.entries(value)
          .map(([key, val]) => `${key}: ${formatValue(val)}`)
          .join('<br>');
      }
      return value; // Primitive values
    };
  
    return Object.entries(firstRecord)
      .filter(([_, value]) => value !== null) // Filter out null values
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join('<br>');
  };
  

//  const handleSendMessage = async () => {
//     if (!input.trim()) return;
  
//     const cleanedOption = selectedOption?.split(' ')[0] || '';
//     const cleanedSubOption = subOption || '';
  
//     // Dynamically generate placeholder text
//     const baseText = subOption
//       ? `Enter ${cleanedOption} ID for ${cleanedSubOption}`
//       : (() => {
//           switch (selectedOption) {
//             case 'Orders':
//               return 'Entered Customer Name to get recent order details';
//             case 'Customers':
//               return 'Enter Customer Name or Mail id to get customer Details';
//             case 'Store Details':
//               return 'Enter Store Name to get Store Details';
//             case 'User Details':
//               return 'Enter User Name to get User Details';
//             case 'Project Types':
//               return 'Enter Project Types to get Project Types';
//             case 'Payment Details':
//               return 'Enter Order ID to get Payment Details';
//             case 'Holidays':
//               return 'Enter year to get holidays list';
//             case 'Reference':
//               return 'Enter Reference ID';
//             default:
//               return 'Enter OrderID';
//           }
//         })();
  
//     // Append the user input to the placeholder text
//     const userMessage = `${baseText} : ${input.trim()}`;
  
//     setMessages([...messages, { text: userMessage, sender: 'user' }]);
//     setInput('');
//     setShowButtons(true); // Show Retry and Exit buttons
//       setShowInputField(false); // Hide the input field
//     // API handling logic remains unchanged
//     if (selectedOption) {
//       let apiUrl = '';
//       const isInputNumber = !isNaN(input.trim());
  
//       switch (selectedOption) {
//         case 'Orders':
//           if (isInputNumber) {
//             if (subOption === 'Order Details') {
//               apiUrl = `${GETORDERBYID_API}/${input}`;
//             }
//             if (subOption === 'Status Details') {
//               apiUrl = `${GET_ALL_HYSTORYID_API}${input}`;
//             }
//             if (subOption === 'Payment Details') {
//               apiUrl = `${GET_PAYMENTSBY_ORDERID_API}/${input}`;
//             }
//           } else {
//             await fetchOrders(input.trim());
//           }
//           break;
  
//         case 'Store Details':
//           if (isInputNumber) {
//             if (subOption === 'Store Details') {
//               apiUrl = `${GETALLSTORESBYID_API}/${input}`;
//             }
//             if (subOption === 'Store Users') {
//               apiUrl = `${GET_MAPSTORE_USERBYSTOREID}/${input}`;
//             }
//           } else {
//             await fetchStores(input.trim());
//           }
//           break;
  
//         case 'Customers':
//           if (isInputNumber) {
//             if (subOption === 'Customer Details') {
//               apiUrl = `${CUSTOMERID_API}/${input}`;
//             }
//           } else {
//             await fetchCustomers(input.trim());
//           }
//           break;
  
//         case 'User Details':
//           if (isInputNumber) {
//             if (subOption === 'User Info') {
//               apiUrl = `${GETALLUSERSBYID_API}/${input}`;
//             }
//             if (subOption === 'User Stores') {
//               apiUrl = `${GETORDERBYID_API}/${input}`;
//             }
//           } else {
//             await fetchUsers(input.trim());
//           }
//           break;
  
//         case 'Project Types':
//           apiUrl = `${getProjectTypeById}/${input}`;
//           break;
  
//         // case 'Payment Details':
//         //   // apiUrl = `${GET_ALL_PAYMENTS_API}/${input}`;
//         //   // else {
//         //     await  fetchPayments(input.trim());
//         //   // }
//         //   break; 
//         case 'Payment Details':
//   await fetchPayments(input.trim(), startDate, endDate); // Pass start and end date
//   break;

//         case 'Holidays':
//           apiUrl = `${HolidaysList}/${input}`;
//           break;
  
//         default:
//           break;
//       }
  
//       if (apiUrl) {
//         await fetchDetails(input, subOption || selectedOption, apiUrl);
//       }
//     }
//   };
  
const handleSendMessage = async () => {
  if (selectedOption === 'Payment Details') {
    // Prepare a custom user message for "Payment Details"
    const userMessage = `Fetching Payment Details for: ${startDate} - ${endDate}`;
    
    // Append the user's custom message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: 'user' },
    ]);

    // Trigger the fetchPayments function
    await fetchPayments('', startDate, endDate); // Pass startDate and endDate explicitly
  } else {
    // Default handling for other cases
    if (!input.trim()) return;

    const userMessage = `${input.trim()}`;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: 'user' },
    ]);

    setInput(''); // Clear input field
    if (selectedOption) {
      let apiUrl = '';
      const isInputNumber = !isNaN(input.trim());

      switch (selectedOption) {
        case 'Orders':
          apiUrl = isInputNumber
            ? `${GETORDERBYID_API}/${input}`
            : await fetchOrders(input.trim());
          break;
        case 'Store Details':
          apiUrl = isInputNumber
            ? `${GETALLSTORESBYID_API}/${input}`
            : await fetchStores(input.trim());
          break;
        case 'Customers':
          apiUrl = isInputNumber
            ? `${CUSTOMERID_API}/${input}`
            : await fetchCustomers(input.trim());
          break;
        case 'User Details':
          apiUrl = isInputNumber
            ? `${GETALLUSERSBYID_API}/${input}`
            : await fetchUsers(input.trim());
          break;
        case 'Project Types':
          apiUrl = `${getProjectTypeById}/${input}`;
          break;
        case 'Holidays':
          apiUrl = `${HolidaysList}/${input}`;
          break;
        default:
          break;
      }

      if (apiUrl) {
        await fetchDetails(input, selectedOption, apiUrl);
      }
    }
  }
};

  const getAllCustomers = async (searchText) => {
    try {
      const response = await axios.get(GETALLCUSTOMERS_API, {
        params: {
          searchText: searchText, // Send the search text correctly
        },
      });
  
      // Adjust this line to match the response structure
      return {
        customers: response.data.customers, // Assuming 'customers' contains the customer array
      };
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };
  const fetchCustomers = async (searchText) => {
    try {
      const { customers, totalCount } = await getAllCustomers(searchText);
  
      if (customers && customers.length > 0) {
        // Extract the first customer
        const firstCustomer = customers[0];
  
        // Format the first customer's details
        const formattedResponse = `
          <div class="flex items-center justify-between space-x-4 -mb-4">
            <span class="text-black w-1/3">First Name:</span> 
            <span class="text-blue-500 w-2/3">${firstCustomer.CustomerFirstName}</span>
          </div>
          <div class="flex items-center justify-between space-x-4 -mb-4">
            <span class="text-black w-1/3">Last Name:</span> 
            <span class="text-blue-500 w-2/3">${firstCustomer.CustomerLastName}</span>
          </div>
          <div class="flex items-center justify-between space-x-4 -mb-4">
            <span class="text-black w-1/3">Email:</span> 
            <span class="text-blue-500 w-2/3">${firstCustomer.CustomerEmail}</span>
          </div>
          <div class="flex items-center justify-between space-x-4 -mb-4">
            <span class="text-black w-1/3">Phone Number:</span> 
            <span class="text-blue-500 w-2/3">${firstCustomer.PhoneNumber}</span>
          </div>
          <div class="flex items-center justify-between space-x-4 -mb-4">
            <span class="text-black w-1/3">Alternative Phone Number:</span> 
            <span class="text-blue-500 w-2/3">${firstCustomer.Alternative_PhoneNumber}</span>
          </div>
          <div class="flex items-center justify-between space-x-4 mb-4">
            <span class="text-black w-1/3">Gender:</span> 
            <span class="text-blue-500 w-2/3">${firstCustomer.Gender}</span>
          </div>
        `.trim();
  
        // Update the messages with the formatted customer details
        setMessages((prev) => [
          ...prev,
          { text: formattedResponse, sender: 'ai' },
        ]);
      } else {
        setError('No customers found.');
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setError('Failed to fetch customers.');
    }
  };
  
  const getAllStores = async (searchText) => {
    try {
      const response = await axios.get(GETALLSTORES_API, {
        params: {
          UserID: 1,
          searchText: searchText, // Corrected parameter name
        },
      });
  
      // Return stores and total count in a consistent structure
      return {
        stores: response.data.Stores || [], // Correctly access 'Stores'
        
      };
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw error; // Rethrow for calling function to handle
    }
  };
  
  const fetchStores = async (searchText) => {
   
    try {
      const { stores, totalCount } = await getAllStores(searchText);
  
      if (stores && stores.length > 0) {
        // Fetch only the first store
        const firstStore = stores[0];
  
           const formattedResponse = formatResponse(firstStore );
  
        // Update the messages with formatted store details
        setMessages((prev) => [
          ...prev,
          { text: `First Store Found (${totalCount} total):\n${formattedResponse}`, sender: 'ai' },
        ]);
  
      } else {
        setError('No stores found.');
      }
    } catch (error) {
      console.error("Failed to fetch stores", error);
      setError('Failed to fetch stores.');
    } 
  };
  
  // Modified to match the structure of getAllCustomers
const getAllUsers = async (searchText, storeIDs = []) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(GETALLUSERS_API, {
      params: {
        SearchText: searchText,
        StoreIDs: storeIDs,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Adjust to match the response structure
    return {
      users: response.data.users, // Assuming 'users' contains the user array
      totalCount: response.data.totalItems, // Assuming 'totalItems' contains total count
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

// Refactored fetchUsers function
const fetchUsers = async (searchText) => {
  setIsLoading(true);
  try {
    
    const { users, totalCount } = await getAllUsers(searchText);

    if (users && users.length > 0) {
      // Format the user details to be displayed
      const firstUser = users[0];
      // Format the first user's details as needed
      const formattedResponse = formatResponse(firstUser);

      // Update the messages with the formatted user details
      setMessages((prev) => [
        ...prev,
        { text: `User: \n${formattedResponse}`, sender: 'ai' },
      ]);
    } else {
      setError('No users found.');
    }
  } catch (error) {
    console.error("Failed to fetch users", error);
    setError('Failed to fetch users.');
  } finally {
    setIsLoading(false);
  }
};

const formatMessage = (message) => {
  const formattedMessage = message.replace(/\n/g, '<br />');
  return DOMPurify.sanitize(formattedMessage); // Sanitize the content
};

// Function to call the API with proper parameters
const getAllPayments = async (searchText = "", startDate, endDate) => {
  try {
    console.log("Making API call with params:", {
      searchText,
      StartDate: startDate,  // Pass startDate in ISO format
      EndDate: endDate,      // Pass endDate in ISO format
    });

    const response = await axios.get(`${GET_ALL_PAYMENTS_API}`, {
      params: {
        searchText, // Pass searchText
        StartDate: startDate, // Pass startDate in ISO format
        EndDate: endDate,     // Pass endDate in ISO format
      },
    });

    console.log("API Response:", response.data);

    return {
      payments: response.data.data || [],           // Handle empty data
      totalCount: response.data.totalRecords || 0,  // Handle missing totalRecords
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

// Function to fetch and display payment details
const fetchPayments = async (searchText = "", startDate, endDate) => {
  try {
    // Pass parameters to getAllPayments
    const { payments, totalCount } = await getAllPayments(
      searchText,
      startDate,
      endDate
    );

    if (payments && payments.length > 0) {
      const firstPayment = payments[0];

      // Format the first payment's details
      const formattedResponse = `
        <div class="flex items-center justify-between space-x-4 -mb-4">
          <span class="text-black whitespace-nowrap">Order Number:</span>
          <span class="text-blue-500">${firstPayment.OrderNumber}</span>
        </div>
        <div class="flex items-center justify-between space-x-4 -mb-4">
          <span class="text-black whitespace-nowrap">Customer Name:</span>
          <span class="text-blue-500">${firstPayment.CustomerName}</span>
        </div>
        <div class="flex items-center justify-between space-x-4 -mb-4">
          <span class="text-black whitespace-nowrap">Payment Date:</span>
          <span class="text-blue-500">${new Date(firstPayment.PaymentDate).toLocaleDateString()}</span>
        </div>
        <div class="flex items-center justify-between space-x-4 -mb-4">
          <span class="text-black whitespace-nowrap">Amount:</span>
          <span class="text-blue-500">$${firstPayment.Amount}</span>
        </div>
        <div class="flex items-center justify-between space-x-4 -mb-4">
          <span class="text-black whitespace-nowrap">Payment Method:</span>
          <span class="text-blue-500">${firstPayment.PaymentMethod}</span>
        </div>
        <div class="flex items-center justify-between space-x-4 mb-4">
          <span class="text-black whitespace-nowrap">Store Name:</span>
          <span class="text-blue-500">${firstPayment.StoreName}</span>
        </div>
      `.trim();

      // Append the AI response to messages
      setMessages((prev) => [
        ...prev,
        { text: formattedResponse, sender: "ai" },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: "No payments found for the selected criteria.", sender: "ai" },
      ]);
    }
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Failed to fetch payments. Please try again.", sender: "ai" },
    ]);
  }
};

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSubOption(null);
    setShowButtons(false);
    setShowInputField(false);
    setInput("");
  };

  const handleSubOptionSelect = (sub) => {
    setSubOption(sub);
    setInput("");
    setShowInputField(true);
    // setShowButtons(true); 
  };

  // const messageEndRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const onRetry = () => {
    setShowButtons(false); // Hide Retry and Exit buttons
    setShowInputField(true); // Show input field again
    setInput(""); // Reset input value
  };
  
  const onExit = () => {
    setShowButtons(false); // Hide Retry and Exit buttons
    setSelectedOption(null); // Clear main option
    setSubOption(null); // Clear sub-option
  };
  
  const getLabelMessage = () => {
    if (subOption) {
      if (subOption === "Order Details" || subOption === "Customer Details") {
        return `Enter ${selectedOption?.split(" ")[0]} ID or Customer Name for ${subOption}`;
      }
      return `Enter ${selectedOption?.split(" ")[0]} ID for ${subOption}`;
    }
  };
  
  
  return (
<div className="main-container h-[94vh] flex flex-col">
<div className="p-4 flex-1 overflow-y-auto space-y-4">
  {/* Options and Sub-options */}
  <div className="flex flex-col items-start">
    <h2 className="mb-4 font-bold">
      Select the option you need, and we’ll assist you further.
    </h2>
    <div className="flex gap-4 overflow-x-auto">
      {mainOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleOptionSelect(option)}
          className={`p-2 w-[200px] rounded-md text-left ${
            selectedOption === null || selectedOption === option
              ? "bg-custom-blue-table text-white"
              : "bg-gray-400 text-black"
          }`}
        >
          {option}
        </button>
      ))}
    </div>

    {/* Render Datepicker for "Payment Details" or sub-options for other selected options */}
    {selectedOption === 'Payment Details' ? (
  
    <div className="border-solid border-gray-400 w-[40%] border-[1px] rounded-lg ml-auto mt-4">
  <Datepicker
    popoverDirection="down"
    showShortcuts={true}
    showFooter={true}
    placeholder="Start Date and End Date"
    primaryColor="purple"
    onChange={(value) => {
      const start = value?.startDate;
      const end = value?.endDate;

      if (start) setStartDate(start.toISOString()); // Convert to ISO string
      if (end) setEndDate(end.toISOString()); // Convert to ISO string
    }}
    value={startDate && endDate ? { startDate: new Date(startDate), endDate: new Date(endDate) } : null} // Pass date objects
  />
</div>

      
    ) : (
      selectedOption && subOptions[selectedOption] && (
        <>
          {/* Sub-options Buttons */}
          <div className="flex gap-4 mt-4">
            {subOptions[selectedOption].map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubOptionSelect(sub)}
                className={`p-2 w-[200px] rounded-md text-left ${
                  subOption === sub || subOption === null
                    ? "bg-custom-blue-table text-white"
                    : "bg-gray-400 text-black"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Message Display */}
          {subOption && (
            <div className="mt-2 p-2 bg-gray-100 text-gray-800 rounded-md">
              {getLabelMessage()}
            </div>
          )}
        </>
      )
    )}
  </div>

  {/* Message Display for Conversation */}
  <div className="p-4 flex-1 overflow-y-auto space-y-4">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <div className="flex items-start space-x-2">
          {msg.sender === "user" ? (
            <FaUserAlt className="text-xl text-custom-blue-table" /> // User icon
          ) : (
            <FaRobot className="text-xl text-custom-blue-table" /> // Response icon
          )}
          <div
            className={`p-3 rounded-lg ${
              msg.sender === "user" ? "bg-custom-blue-table text-white" : "bg-white text-black"
            }`}
            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
          />
        </div>
      </div>
    ))}
  </div>
</div>

    {showButtons && (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-custom-blue-table text-white hover:bg-blue-700"
          >
            <FaRedoAlt className="text-lg" />
            <span>Retry</span>
          </button>
          <button
            onClick={onExit}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Exit</span>
          </button>
        </div>
      )}
      {selectedOption && subOption && showInputField && (
  <div className="p-4 bg-white border-t flex items-center space-x-4">
    {/* Message Input Field */}
    <TextField
      margin="dense"
      name="inputField"
      label={getLabelMessage()}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "48px",
          fontSize: "0.98rem",
          borderRadius: "8px",
        },
      }}
    />
    <button
      onClick={handleSendMessage}
      className="h-[48px] w-[48px] bg-custom-blue-table text-white rounded-full flex justify-center items-center ml-2"
      disabled={isLoading}
    >
      {isLoading ? <IoMdSquare size={24} /> : <FaArrowUp size={24} />}
    </button>
  </div>
)}

{/* Payment Details Input Field (Date Range) */}
{selectedOption === 'Payment Details' && (
  <div className="p-4 bg-white border-t flex items-center space-x-4">
    <TextField
      margin="dense"
      name="inputField"
      label="Selected Date Range"
      value={`${startDate} - ${endDate}`} // Display start and end date
      variant="outlined"
      fullWidth
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          height: '48px',
          fontSize: '0.98rem',
          borderRadius: '8px',
        },
      }}
      disabled={true} // Disabled for display purposes
    />
     <button
      onClick={handleSendMessage}
      className="h-[48px] w-[48px] bg-custom-blue-table text-white rounded-full flex justify-center items-center ml-2"
      disabled={isLoading}
    >
      {isLoading ? <IoMdSquare size={24} /> : <FaArrowUp size={24} />}
    </button>
  </div>
)}


</div>
  );
};
export default AIChatScreen;
