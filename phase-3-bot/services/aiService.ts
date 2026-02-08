
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const taskTools: FunctionDeclaration[] = [
  {
    name: 'add_task',
    description: 'Add a new task to the user\'s list.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: 'The title of the task.' },
        description: { type: Type.STRING, description: 'Optional details for the task.' },
      },
      required: ['title'],
    },
  },
  {
    name: 'update_task',
    description: 'Update the title or description of an existing task. Requires a valid task ID.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: 'The unique ID of the task to update.' },
        title: { type: Type.STRING, description: 'The new title.' },
        description: { type: Type.STRING, description: 'The new description.' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_task',
    description: 'Permanently remove a task from the list. Requires a valid task ID.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: 'The unique ID of the task to delete.' },
      },
      required: ['id'],
    },
  },
  {
    name: 'toggle_task',
    description: 'Toggle the completion status of a task (mark as done or undone). Requires a valid task ID.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: 'The unique ID of the task to toggle.' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_all_tasks',
    description: 'Retrieve the current list of tasks to see titles and IDs. Call this if you do not know the ID of a task the user mentioned.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        // Explicitly defining an unused property can sometimes help with stricter OpenAPI proxies
        _internal: { type: Type.STRING, description: 'Internal marker' }
      },
    },
  },
];

export const startChatSession = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please set API_KEY in your environment variables.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the TaskFlow Assistant, a highly efficient productivity AI.
      
      CRITICAL RULES:
      1. If the user asks to update, delete, or complete a task by its name/title, you MUST call 'get_all_tasks' first to find the corresponding 'id'. Do not guess IDs.
      2. After calling 'get_all_tasks', identify the task the user is referring to and then call the appropriate management tool.
      3. For adding tasks, just use 'add_task'.
      4. Always be helpful, concise, and professional.
      5. Confirm actions clearly to the user.`,
      tools: [{ functionDeclarations: taskTools }],
    },
  });
};

export const suggestTasks = async (taskTitle: string): Promise<string[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return [];
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a productivity expert. For the following task: "${taskTitle}", suggest 3-4 concise, actionable sub-tasks. Return ONLY a plain JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    const text = response.text || "[]";
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("AI Suggestion Error:", err);
    return [];
  }
};
