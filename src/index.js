const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const cors = require('cors'); // Import the cors package
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS
app.use(cors()); // Enable CORS for all origins

// Set up multer for file upload with custom storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

// Google Generative AI client setup (replace with your configuration)
const googleAIClient = new GoogleGenerativeAI({
  apiKey: process.env.API_KEY, // Ensure this is set correctly in your environment
});

// Route to handle file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Respond with the file information
    const uploadedFile = {
      originalName: file.originalname,
      path: file.path,
    };
    res.json({ uploadedFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log("File uploaded successfully.");
});

// Route to handle content generation
app.post('/api/generate-content', async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required.' });
    }

    // Construct the file path and log it for debugging
    const filePath = path.join(__dirname, 'uploads', filename);
    console.log(`File path: ${filePath}`); // Debugging line

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found.' });
    }

    // Read the file and convert it to base64
    const fileBuffer = await fs.readFile(filePath);
    const fileBase64 = fileBuffer.toString('base64');
    const fileType = path.extname(filename).slice(1); // Get file extension (e.g., "jpeg", "png")

    // Send the base64 encoded file to the Google Generative AI API
    const response = await googleAIClient.generateContent({
      model: 'gemini-1.5-pro',
      fileContent: fileBase64,
      fileType: fileType, // Send the correct MIME type
    });

    // Respond with the generated content
    res.json({ content: response.data });
  } catch (error) {
    console.error('Error during content generation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
