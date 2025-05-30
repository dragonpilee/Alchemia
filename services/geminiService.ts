
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { MolecularProperties } from '../types';

// Initialize the GoogleGenAI client.
// As per instructions, API_KEY is obtained exclusively from process.env.API_KEY.
// The application assumes this environment variable is pre-configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const predictMolecularProperties = async (smiles: string): Promise<MolecularProperties> => {
  const prompt = `
    You are a computational chemistry assistant.
    Given the SMILES string: "${smiles}", predict the following molecular properties:
    - Molecular Weight (g/mol)
    - LogP (octanol-water partition coefficient, also known as XLogP3 or ALogP)
    - Number of Hydrogen Bond Donors
    - Number of Hydrogen Bond Acceptors
    - Topological Polar Surface Area (TPSA in Å²)
    - Number of Rotatable Bonds
    - Canonical SMILES (standardized representation)
    - Molecular Formula
    - Formal Charge

    Please return the response strictly as a JSON object with the following keys:
    "molecularWeight" (number)
    "logP" (number)
    "hydrogenBondDonors" (number)
    "hydrogenBondAcceptors" (number)
    "polarSurfaceArea" (number)
    "rotatableBonds" (number)
    "canonicalSmiles" (string)
    "formula" (string)
    "formalCharge" (number)

    If a property cannot be calculated or is not applicable for the given SMILES, use null for its value.
    Do not include any explanatory text, comments, or markdown formatting outside of the JSON object itself.

    Example for Aspirin (CC(=O)OC1=CC=CC=C1C(=O)O):
    {
      "molecularWeight": 180.158,
      "logP": 1.19,
      "hydrogenBondDonors": 1,
      "hydrogenBondAcceptors": 3,
      "polarSurfaceArea": 63.60,
      "rotatableBonds": 2,
      "canonicalSmiles": "CC(=O)OC1=CC=CC=C1C(=O)O",
      "formula": "C9H8O4",
      "formalCharge": 0
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1, // Lower temperature for more deterministic/factual output
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }
    
    if (!jsonStr.startsWith("{") || !jsonStr.endsWith("}")) {
        const jsonPattern = /\{[\s\S]*\}/;
        const jsonMatch = jsonStr.match(jsonPattern);
        if (jsonMatch && jsonMatch[0]) {
            jsonStr = jsonMatch[0];
        } else {
            console.error("Raw Gemini response:", response.text);
            throw new Error("AI response was not a valid JSON object. Please check the SMILES string or try again.");
        }
    }

    const parsedProperties: MolecularProperties = JSON.parse(jsonStr);
    return parsedProperties;

  } catch (error: any) {
    console.error("Error predicting molecular properties:", error);
    let errorMessage = "Failed to predict properties. Please check the SMILES string and try again.";
    if (error.message) {
      // Avoid duplicating the "Error: " prefix if it's already there.
      errorMessage = error.message.startsWith("Error: ") ? error.message : `Details: ${error.message}`;
    }
    
    // Check for specific error messages from Gemini client or API
    if (error.message && error.message.toLowerCase().includes("api key")) {
        errorMessage = "Invalid or missing API Key. Please ensure it is correctly configured in the environment.";
    } else if (error.message && error.message.includes("Candidate") && error.message.includes("SAFETY")) {
        errorMessage = "The request was blocked due to safety settings. Please modify your input or try a different SMILES string.";
    } else if (error.message && error.message.includes("Quota")) {
        errorMessage = "API quota exceeded. Please check your Gemini project quotas.";
    }

    throw new Error(errorMessage);
  }
};
