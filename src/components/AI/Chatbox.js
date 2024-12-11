
import React, { useState, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { ChatBox } from "../../Constants/apiRoutes"; // Import API route
import { RiCloseLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi"; 

const AIChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  
  const handleSubmit = async () => {
    if (!userInput.trim()) return; // Do nothing if input is empty
  
    // Add user message to chat
    const userMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput(""); // Clear the input field
    setLoading(true); // Set loading state
  
    try {
      const getAIResponse = async (message) => {
        console.log("Sending message to API:", message);
        const response = await fetch(ChatBox, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });
  
        if (!response.ok) throw new Error("Failed to fetch AI response");
  
        const data = await response.json();
        console.log("API Response:", data);
        return data;
      };
  
      const response = await getAIResponse(userInput);
      let aiMessageText = "";
  
      // Extract 'reply' and 'data' from the response
      if (response && response.reply) {
        aiMessageText = response.reply;
      } else {
        aiMessageText = "No valid response received from AI.";
      }
  
      const aiMessage = { text: aiMessageText, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
  
      // Process and format 'data' if it exists
      if (response.data && Array.isArray(response.data)) {
        const formattedData = response.data
          .map((item) => {
            return `Order ID: ${item.orderId || "N/A"}
  Order Number: ${item.OrderNumber || "N/A"}
  Status: ${item.status || "N/A"}
  Total: ${item.total || "N/A"}
  Date: ${
              item.date ? new Date(item.date).toLocaleDateString() : "N/A"
            }`;
          })
          .join("\n\n");
  
        const dataMessage = {
          text: formattedData,
          sender: "ai",
        };
  
        // Add the formatted 'data' as a separate message
        setMessages((prevMessages) => [...prevMessages, dataMessage]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = {
        text: "An error occurred while fetching the AI response.",
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  const toggleChatBox = () => setIsChatOpen(!isChatOpen);

  // Auto-scroll chatbox when messages update
  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  return (
    <>
      {/* AI Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* <button
          onClick={toggleChatBox}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        >
          <FiMessageSquare size={24} />
        </button> */}
        <div className="fixed bottom-6 right-6 z-50">
  <button
    onClick={toggleChatBox}
    className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
  >
    {isChatOpen ? (
     <FiChevronDown size={24} /> 
    ) : (
      <FiMessageSquare size={24} /> 
    )}
  </button>
</div>

      </div>

      {/* Chatbox */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-6 w-96 p-4 bg-white border rounded-lg shadow-lg z-50 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">AI Chat Assistant</h2>
         
 {/* <button
                           onClick={() => setIsChatOpen(false)}
                            className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
                        >
                            <RiCloseLine size={18} />
                        </button> */}

          </div>

          {/* Messages */}
          <div
            id="chat-box"
            className="flex-1 overflow-auto p-2 space-y-2"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  } whitespace-pre-line`} // Allow line breaks
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center mt-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your question here..."
              rows="2"
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !userInput.trim()} // Disable if loading or input is empty
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
