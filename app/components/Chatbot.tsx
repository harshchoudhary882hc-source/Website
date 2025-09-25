"use client";

import { useState, useEffect } from 'react';

/**
 * Chatbot component that provides an interactive assistant to answer user questions
 * about The Aether Residences. It features a toggleable window, displays message history,
 * and responds to user queries based on predefined keywords.
 * Uses React's useState for managing chatbot visibility, messages, and input,
 * and useEffect for scrolling to the latest message.
 * @returns {JSX.Element} The JSX for the chatbot interface.
 */
export default function Chatbot() {
  // State to control the visibility of the chatbot window
  const [chatbotOpen, setChatbotOpen] = useState(false);
  // State to store the history of messages (bot and user)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m here to help you with any questions about The Aether Residences. How can I assist you today?' }
  ]);
  // State to store the current message being typed by the user
  const [inputMessage, setInputMessage] = useState('');

  // Predefined chatbot responses based on keywords
  const chatbotResponses: { [key: string]: string } = {
    'hello': 'Hello! Welcome to The Aether Residences. How can I help you today?',
    'price': 'Our pricing starts from ₹4,08,000 for 1 BHK units. You can use our pricing calculator to get detailed estimates.',
    'location': 'We are located in the New Tech Corridor, Sector 9. The exact address is provided in our About section.',
    'amenities': 'We offer premium amenities including Sky Terrace Wellness Deck, Infinity Pool, AI-powered security, and much more. Check our Features section for details.',
    'tour': 'You can book a private tour through our contact form, or try our virtual tour experience.',
    'contact': 'You can reach us at +91 90XX-XXX-XXX or email us at hello@aetherresidences.example',
    'default': 'I can help you with information about pricing, location, amenities, tours, or contact details. What would you like to know?'
  };

  /**
   * Toggles the visibility of the chatbot window.
   */
  const toggleChatbot = () => {
    setChatbotOpen(prev => !prev);
  };

  /**
   * Sends the user's message, updates the message history, and generates a bot response.
   * The bot's response is based on keywords found in the user's message.
   */
  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user's message to the message history
    const newUserMessage = { sender: 'user', text: inputMessage.trim() };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Determine bot's response based on keywords
    const lowerMessage = inputMessage.toLowerCase();
    let response = chatbotResponses.default;
    for (const [keyword, reply] of Object.entries(chatbotResponses)) {
      if (lowerMessage.includes(keyword)) {
        response = reply;
        break;
      }
    }

    // Add bot's response to the message history after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 1000);
  };

  /**
   * Handles the 'Enter' key press event in the chatbot input field.
   * Calls the sendMessage function when 'Enter' is pressed.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event object.
   */
  const handleChatbotKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Effect hook to automatically scroll to the bottom of the messages container
  // whenever the messages state updates (i.e., a new message is added).
  useEffect(() => {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]); // Dependency array ensures effect runs when 'messages' state changes

  return (
    <div id="chatbot" className="chatbot">
      {/* Chatbot toggle button */}
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      {/* Chatbot window, conditionally rendered based on chatbotOpen state */}
      <div className={`chatbot-window ${chatbotOpen ? 'open' : ''}`} id="chatbot-window">
        {/* Chatbot header with title and close button */}
        <div className="chatbot-header">
          <h4>Aether Assistant</h4>
          <button onClick={toggleChatbot} className="chatbot-close">×</button>
        </div>
        {/* Message display area, scrolls to show latest messages */}
        <div className="chatbot-messages" id="chatbot-messages">
          {/* Map through messages and display each one */}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        {/* Chatbot input area for typing messages */}
        <div className="chatbot-input">
          <input
            type="text"
            id="chatbot-input"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleChatbotKeypress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
