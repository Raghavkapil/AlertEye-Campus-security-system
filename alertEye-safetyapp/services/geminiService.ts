
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBuildingType(lat: number, lng: number): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Given these GPS coordinates: Latitude ${lat}, Longitude ${lng}. 
      Tell me what type of building or landmark this likely is in a short 3-5 word phrase (e.g. "Near Academic Block A" or "Inside Student Union"). 
      If unsure, provide a generic but helpful description based on a typical campus layout. Be concise.`
    });
    return response.text?.trim() || "Unknown Location";
  } catch (error) {
    console.error("Gemini reverse geocoding failed", error);
    return "Campus Vicinity";
  }
}
