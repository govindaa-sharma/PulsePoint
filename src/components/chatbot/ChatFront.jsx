import React, { useState, useRef, useEffect } from 'react';

// The full address of your Python AI server
const API_BASE_URL = 'http://127.0.0.1:5000';

// This is the main component for your chatbot UI
function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hello! How can I help you today? You can ask me about your symptoms or how you're feeling.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    const newUserMessage = { sender: 'user', text: userMessage };
    const typingIndicator = { sender: 'assistant', text: 'typing' };
    setMessages((prev) => [...prev, newUserMessage, typingIndicator]);

    setInputValue('');
    setIsLoading(true);

    const historyForAPI = [...messages, newUserMessage].map((msg) => ({
      role: msg.sender,
      content: msg.text,
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: historyForAPI,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = { sender: 'assistant', text: data.reply };

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = aiResponse;
        return newMessages;
      });
    } catch (error) {
      console.error('Chat error:', error);
      const errorResponse = { sender: 'assistant', text: 'Sorry, an error occurred.' };
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = errorResponse;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen p-4">
      <div className="w-full max-w-md h-full md:h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <header className="bg-white text-slate-800 p-4 flex items-center justify-between border-b border-slate-200">
          <div>
            <h1 className="text-lg font-bold">PulsePoint Assistant</h1>
            <p className="text-xs text-slate-500 flex items-center">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
              Online
            </p>
          </div>
        </header>

        <main ref={chatWindowRef} className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg py-2 px-4 max-w-[80%] text-sm ${
                  msg.sender === 'user'
                    ? 'bg-slate-200 text-slate-800'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {msg.text === 'typing' ? <TypingIndicator /> : <p>{msg.text}</p>}
              </div>
            </div>
          ))}
        </main>

        <footer className="bg-white p-3 border-t border-slate-200">
          <div className="flex items-center bg-slate-100 rounded-full">
            <input
              type="text"
              id="chat-input"
              className="flex-grow bg-transparent border-none p-3 focus:outline-none focus:ring-0 text-sm"
              placeholder="Ask about symptoms or wellness..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              id="send-btn"
              className="bg-blue-500 text-white rounded-full p-2 m-1 hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              onClick={handleSend}
              disabled={isLoading || !inputValue}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 py-1">
    <div className="dot-flashing"></div>
  </div>
);

const styles = `
.dot-flashing { position: relative; width: 6px; height: 6px; border-radius: 5px; background-color: #94a3b8; color: #94a3b8; animation: dotFlashing 1s infinite linear alternate; animation-delay: .5s; }
.dot-flashing::before, .dot-flashing::after { content: ''; display: inline-block; position: absolute; top: 0; }
.dot-flashing::before { left: -12px; width: 6px; height: 6px; border-radius: 5px; background-color: #94a3b8; color: #94a3b8; animation: dotFlashing 1s infinite alternate; animation-delay: 0s; }
.dot-flashing::after { left: 12px; width: 6px; height: 6px; border-radius: 5px; background-color: #94a3b8; color: #94a3b8; animation: dotFlashing 1s infinite alternate; animation-delay: 1s; }
@keyframes dotFlashing { 0% { background-color: #94a3b8; } 50%, 100% { background-color: #e2e8f0; } }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Chatbot;
