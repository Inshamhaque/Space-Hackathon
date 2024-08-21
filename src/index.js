const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Handle file uploads in memory

// Configure CORS to allow requests only from http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); // Add this if you're handling JSON payloads

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    console.log(originalname, mimetype, buffer);

    // Upload the file and specify a display name
    const uploadResponse = await fileManager.uploadFile(originalname, {
      mimeType: mimetype,
      displayName: "Uploaded image",
      fileContent: buffer
    });

    // Retrieve the metadata of the uploaded file
    const getResponse = await fileManager.getFile(uploadResponse.file.name);

    // Send the upload and metadata response back to the client
    res.status(200).json({
      uploadedFile: uploadResponse.file,
      retrievedFile: getResponse
    });
  } catch (error) {
    console.error("Error during file upload or retrieval:", error);
    res.status(500).json({ error: "File upload or retrieval failed." });
  }
});

app.post('/api/generate-content', async (req, res) => {
  try {
    const uploadResponse = await fileManager.uploadFile(req.body.filename, {
      mimeType: "image/jpeg",
      displayName: "Uploaded image",
    });

    if (!uploadResponse) {
      throw new Error("File upload failed.");
    }

    // Initialize GoogleGenerativeAI with your API_KEY
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    // Generate content using the uploaded file and a text prompt
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri
        }
      },
      { text: "Describe how this product might be manufactured." },
    ]);

    // Send the generated content back to the client
    res.status(200).json({ content: result.response.text() });
  } catch (error) {
    console.error("Error during content generation:", error);
    res.status(500).json({ error: "Content generation failed." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
