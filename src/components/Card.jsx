import React, { useState } from 'react'
import logo from "../assets/frontimage.png"

const Card = () => {

    const [userImage , setUserImage] = useState("");

    const storeImage = (event) => {

            const file = event.target.files[0];

            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setUserImage(imageUrl);
            }
        
    }
  return (
    <div className='bg-white w-[50vh] h-[70vh] rounded-md p-5 py-10 flex flex-col items-center justify-between'>

      <h1 className='text-black text-center break-words font-bold text-xl'>Please Enter the Image which We Use as a Refrence</h1>

      {
        !userImage && (

            <div className='text-black'>
                <img src={logo} className='w-[400px] h-[250px] rounded-lg'></img>
            </div>

        )
      }
      {
        userImage && (

            <div className='text-black'>
                <img src={userImage} className='w-[400px] h-[250px]'></img>
            </div>

        )
      }
      
      <div className='flex justify-center mx-auto w-[100px] cursor-pointer '>
        <input className='mx-auto w-[100%] rounded-l' placeholder='Choose File' type="file" accept="image/*" id="imageInput" onChange={storeImage}/>
      </div>

      <button className='py-1 px-3 bg-lime-700 rounded-xl cursor-pointer' onclick="uploadImage()">Upload</button>

    </div>
  )
}

export default Card
