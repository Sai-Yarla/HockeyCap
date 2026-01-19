import { GoogleGenAI, Type } from "@google/genai";
import { Player } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const askCBAExpert = async (question: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `You are an expert on the NHL Collective Bargaining Agreement (CBA) and Salary Cap rules, acting as the knowledge base for a site like CapFriendly. 
        Explain rules clearly, concisely, and accurately. 
        Focus on concepts like LTIR, Waivers, Offer Sheets, SPCs, and Buyouts. 
        Keep answers helpful for hockey fans.`,
        temperature: 0.3, // Low temperature for factual accuracy
      }
    });
    return response.text || "I couldn't retrieve an answer at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Cap Expert is currently unavailable. Please check your API key.";
  }
};

export const searchPlayerOrTeam = async (query: string): Promise<Player | null> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find contract details for: ${query}. If it is a team, just return null. If it is a player, return their current active contract details.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            found: { type: Type.BOOLEAN },
            player: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                position: { type: Type.STRING },
                age: { type: Type.NUMBER },
                capHit: { type: Type.NUMBER },
                aav: { type: Type.NUMBER },
                contractLength: { type: Type.NUMBER },
                contractYear: { type: Type.NUMBER },
                expiryStatus: { type: Type.STRING },
                clause: { type: Type.STRING },
                team: { type: Type.STRING }
              }
            }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return null;
    
    const data = JSON.parse(text);
    if (data.found && data.player) {
      return data.player as Player;
    }
    return null;
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return null;
  }
};
