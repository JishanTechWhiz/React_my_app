// src/services/GeminiService.js
import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
 const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;


export const sendMessageToGemini = async (text) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Access the correct path based on the response structure
    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts[0]
    ) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected Response Structure:", JSON.stringify(response.data, null, 2));
      return { error: "Unexpected response structure from Gemini API" };
    }
  } catch (error) {
    console.error('Error sending message to Gemini:', error.message || error);
    return { error: 'Failed to communicate with Gemini' };
  }
};
