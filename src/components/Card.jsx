import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/frontimage.png";

const Card = () => {
  const [userImage, setUserImage] = useState("");
  const [uploadResponse, setUploadResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const storeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadResponse(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  const generateContent = async () => {
    if (!uploadResponse) {
      console.error("No file uploaded.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-content', {
        filename: uploadResponse.uploadedFile.displayName
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

      {!userImage ? (
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
            src={userImage} 
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
        onClick={generateContent}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload"}
      </button>
    </div>
  );
};

export default Card;
