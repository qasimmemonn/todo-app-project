
import { GoogleGenAI } from "@google/genai";

export const suggestTasks = async (taskTitle: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.warn('API Key missing, AI suggestions disabled.');
    return [];
  }
  
  try {
    // Initializing directly with process.env.API_KEY as per requirements
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a productivity expert. For the following task: "${taskTitle}", suggest 3-4 concise, actionable sub-tasks. Return ONLY a plain JSON array of strings. Example: ["Subtask 1", "Subtask 2"].`,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Gemini AI Suggestion Error:', error);
    return [];
  }
};
