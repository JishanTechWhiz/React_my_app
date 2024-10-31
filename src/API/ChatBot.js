// // src/components/ChatBot.js
// import React, { useState } from 'react';
// import { sendMessageToGemini } from '../API/GeminiService';

// const ChatBot = () => {
//   const [inputText, setInputText] = useState('');
//   const [responseText, setResponseText] = useState('');

//   const handleSend = async () => {
//     const result = await sendMessageToGemini(inputText);
//     setResponseText(result.error || result); // Display error if present
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Gemini ChatBot</h2>
//       <input
//         type="text"
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//         placeholder="Ask something..."
//         style={{ padding: '10px', width: '80%' }}
//       />
//       <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px' }}>
//         Send
//       </button>
//       {responseText && (
//         <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
//           <strong>Response:</strong> {responseText}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;




// src/components/ChatBot.js
import React, { useState } from 'react';
import { sendMessageToGemini } from '../API/GeminiService';
import './ChatBot.css'; // Import the CSS for styling

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages

    // Add user message to messages state
    const userMessage = { text: inputText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Send message to Gemini API
    const result = await sendMessageToGemini(inputText);
    const botMessage = { text: result.error || result, sender: 'bot' };
    setMessages((prev) => [...prev, botMessage]);

    // Clear input field
    setInputText('');
    console.log("ENV Variables:", process.env);

  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-header">Gemini ChatBot</h2>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
