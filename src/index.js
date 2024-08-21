// To use the File API, add this import path for GoogleAIFileManager.
// Note that this is a different import path than what you use for generating content.
// For versions lower than @google/generative-ai@0.13.0
// use "@google/generative-ai/files"
const { GoogleAIFileManager } = require("@google/generative-ai/server");

// To generate content, use this import path for GoogleGenerativeAI.
// Note that this is a different import path than what you use for the File API.
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize dotenv to load environment variables from .env file
require('dotenv').config();

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

// Function to upload file and retrieve metadata
async function uploadAndRetrieveFile() {
  try {
    // Upload the file and specify a display name.
    const uploadResponse = await fileManager.uploadFile("logo.png", {
      mimeType: "image/jpeg",
      displayName: "Jetpack drawing",
    });

    // View the response.
    console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

    // Get the previously uploaded file's metadata.
    const getResponse = await fileManager.getFile(uploadResponse.file.name);

    // View the response.
    console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);

    return uploadResponse;
  } catch (error) {
    console.error("Error during file upload or retrieval:", error);
  }
}

// Function to generate content using uploaded file
async function generateContent() {
  try {
    const uploadResponse = await uploadAndRetrieveFile();

    if (!uploadResponse) {
      throw new Error("File upload failed.");
    }

    // Initialize GoogleGenerativeAI with your API_KEY.
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({
      // Choose a Gemini model.
      model: "gemini-1.5-pro",
    });

    // Generate content using text and the URI reference for the uploaded file.
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri
        }
      },
      { text: "Describe how this product might be manufactured." },
    ]);

    // Output the generated text to the console
    console.log(result.response.text());
  } catch (error) {
    console.error("Error during content generation:", error);
  }
}

// Call the function to start the process
generateContent();
