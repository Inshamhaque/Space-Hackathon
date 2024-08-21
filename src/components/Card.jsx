import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/frontimage.png";

const Card = () => {
  const [userImageFile, setUserImageFile] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState("");
  const [uploadResponse, setUploadResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(''); // Corrected state variable name

  const storeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImageFile(file); // Store the file itself for upload
      const imageUrl = URL.createObjectURL(file); // For preview only
      setUserImagePreview(imageUrl);
    }
  };

  const uploadFile = async () => {
    if (!userImageFile) {
      console.error("No file selected.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', userImageFile);

      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadResponse(response.data);
      setName(response.data.uploadedFile.originalName); // Update state with the file name
      console.log(response.data.uploadedFile.originalName);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  const generateContent = async () => {
    if (!name) { // Check if name is not empty
      console.error("No file name available.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-content', {
        filename: name, // Send the filename correctly
      });

      console.log("Generated content:", response.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setLoading(false);
    }
  };

  return (
    <div className='bg-white/50 backdrop-blur-lg lg:w-[30vw] lg:h-[70vh] md:w-[50vw] md:h-[60vh] sm:w-[80vw] sm:h-[70vh] w-[90vw] h-auto mx-auto rounded-lg p-6 py-10 flex flex-col items-center justify-between shadow-lg'>
      <h1 className='text-black text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6'>
        Please Upload an Image for Reference
      </h1>

      {!userImagePreview ? (
        <div className='flex justify-center'>
          <img 
            src={logo} 
            className='lg:w-[350px] lg:h-[200px] md:w-[300px] md:h-[180px] sm:w-[250px] sm:h-[150px] w-[200px] h-[120px] rounded-lg shadow-md' 
            alt="Placeholder" 
          />
        </div>
      ) : (
        <div className='flex justify-center'>
          <img 
            src={userImagePreview} 
            className='lg:w-[350px] lg:h-[200px] md:w-[300px] md:h-[180px] sm:w-[250px] sm:h-[150px] w-[200px] h-[120px] rounded-lg shadow-md' 
            alt="Uploaded" 
          />
        </div>
      )}

      <div className='w-full flex justify-center mt-4'>
        <label 
          htmlFor="imageInput" 
          className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'>
          Choose File
        </label>
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={storeImage}
          className='hidden'
        />
      </div>

      <button 
        className='mt-4 py-2 px-6 bg-lime-700 hover:bg-lime-800 text-white rounded-xl cursor-pointer font-semibold transition-colors duration-200'
        onClick={uploadFile} // Trigger the file upload
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      <button 
        className='mt-4 py-2 px-6 bg-lime-700 hover:bg-lime-800 text-white rounded-xl cursor-pointer font-semibold transition-colors duration-200'
        onClick={generateContent}
        disabled={loading || !uploadResponse}
      >
        {loading ? "Generating Content..." : "Generate Content"}
      </button>
    </div>
  );
};

export default Card;
