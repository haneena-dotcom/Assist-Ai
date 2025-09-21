import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = "AIzaSyCapG3-p1jLirubpMt5QKhS4Adp5QPDtRQ"

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const inputBox = document.getElementById('input-box');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.querySelector('.messages-container');
// AI response
async function aiResponse(input) {  
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: input,
  });
  return response.text;
}

// SendMessage
async function SendMessage() {
  const userText = inputBox.value;
  messagesContainer.innerHTML += `<div class="user-container">
          <div class="user-icon">You</div>
          <div class="user-message">${inputBox.value}</div>
        </div>`;
  inputBox.value = '';
  inputBox.focus();

  const aiMessage = document.createElement('div');
  aiMessage.classList.add('ai-container');

  aiMessage.innerHTML = `<div class="ai-icon">AI</div>
        <div class="ai-message">Typing ...</div>`;
  messagesContainer.appendChild(aiMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  const aiResponseText = await aiResponse(userText);
  aiMessage.querySelector('.ai-message').textContent = aiResponseText;


  messagesContainer.scrollTop = messagesContainer.scrollHeight;

}


inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    SendMessage();
  }
});

sendButton.addEventListener('click', () => {
  SendMessage();
});
