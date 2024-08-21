const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const cors = require('cors'); // Import the cors package
const { VertexAI } = require('@google-cloud/aiplatform'); // Correctly import VertexAI or equivalent client

const app = express();
const port = 3001;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS
app.use(cors()); // Enable CORS for all origins

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// Google Generative AI client setup (replace with your configuration)
const client = new VertexAI({ // Correct instantiation
  projectId: 'your-project-id',
  keyFilename: 'path/to/your-service-account-key.json',
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
  console.log("uploaded");
});

// Route to handle content generation
app.post('/api/generate-content', async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required.' });
    }

    // Read the file and convert it to base64
    const filePath = path.join(__dirname, 'uploads', filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const fileBuffer = await fs.readFile(filePath);
    const fileBase64 = fileBuffer.toString('base64');
    const fileType = path.extname(filename).slice(1); // Get file extension (e.g., "jpeg", "png")

    // Example of using the client - replace with actual method
    const request = {
      parent: `projects/your-project-id/locations/your-location`,
      document: {
        content: fileBase64,
        mimeType: `image/${fileType}`,
      },
    };

    const [response] = await client.documents.predict(request); // Replace with actual method

    // Respond with the generated content
    res.json({ content: response.predictions });
  } catch (error) {
    console.error('Error during content generation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
