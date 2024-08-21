// // // import React, { useState } from 'react'
// // // import logo from "../assets/frontimage.png"

// // // const Card = () => {

// // //     const [userImage , setUserImage] = useState("");

// // //     const storeImage = (event) => {

// // //             const file = event.target.files[0];

// // //             if (file) {
// // //               const imageUrl = URL.createObjectURL(file);
// // //               setUserImage(imageUrl);
// // //             }
        
// // //     }
// // //   return (
// // //     <div className='bg-white lg:w-[30vw] lg:h-[70vh] md:w-[40vw] md:h-[70vh] sm:h-[80vh] mx-auto rounded-md p-5 py-10 flex flex-col items-center justify-between'>

// // //       <h1 className='text-black text-center break-words font-bold text-xl'>Please Enter the Image which We Use as a Refrence</h1>

// // //       {
// // //         !userImage && (

// // //             <div className='text-black'>
// // //                 <img src={logo} className='lg:w-[400px] lg:h-[250px] md:w-[450px] md:h-[200px] sm:h-[150px] sm:w-[500px] rounded-lg'></img>
// // //             </div>

// // //         )
// // //       }
// // //       {
// // //         userImage && (

// // //             <div className='text-black'>
// // //                 <img src={userImage} className='w-[400px] h-[250px]'></img>
// // //             </div>

// // //         )
// // //       }
      
// // //       <div className='flex justify-center mx-auto w-[100px] cursor-pointer '>
// // //         <input className='mx-auto w-[100%] rounded-l' placeholder='Choose File' type="file" accept="image/*" id="imageInput" onChange={storeImage}/>
// // //       </div>

// // //       <button className='py-1 px-3 bg-lime-700 rounded-xl cursor-pointer' onclick="uploadImage()">Upload</button>

// // //     </div>
// // //   )
// // // }

// // // export default Card



// // import React, { useState } from 'react';
// // import logo from "../assets/frontimage.png";

// // const Card = () => {
// //   const [userImage, setUserImage] = useState("");

// //   const storeImage = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const imageUrl = URL.createObjectURL(file);
// //       setUserImage(imageUrl);
// //     }
// //   };

// //   return (
// //     <div className='bg-white lg:w-[30vw] lg:h-[70vh] md:w-[40vw] md:h-[70vh] sm:w-[90vw] sm:h-[80vh] w-full h-[80vh] mx-auto rounded-lg p-6 py-10 flex flex-col items-center justify-between shadow-lg'>

// //       <h1 className='text-black text-center font-bold text-xl md:text-2xl lg:text-3xl mb-6'>
// //         Please Upload an Image for Reference
// //       </h1>

// //       {!userImage ? (
// //         <div className='flex justify-center'>
// //           <img src={logo} className='lg:w-[400px] lg:h-[250px] md:w-[350px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-[250px] h-[150px] rounded-lg shadow-md' alt="Placeholder" />
// //         </div>
// //       ) : (
// //         <div className='flex justify-center'>
// //           <img src={userImage} className='lg:w-[400px] lg:h-[250px] md:w-[350px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-[250px] h-[150px] rounded-lg shadow-md' alt="Uploaded" />
// //         </div>
// //       )}

// //       <div className='w-full flex justify-center mt-4'>
// //         <label htmlFor="imageInput" className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'>
// //           Choose File
// //         </label>
// //         <input
// //           type="file"
// //           accept="image/*"
// //           id="imageInput"
// //           onChange={storeImage}
// //           className='hidden'
// //         />
// //       </div>

// //       <button className='mt-4 py-2 px-6 bg-lime-700 hover:bg-lime-800 text-white rounded-xl cursor-pointer font-semibold transition-colors duration-200'>
// //         Upload
// //       </button>

// //     </div>
// //   );
// // };

// // export default Card;


// import React, { useState } from 'react';
// import logo from "../assets/frontimage.png";

// const Card = () => {
//   const [userImage, setUserImage] = useState("");

//   const storeImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUserImage(imageUrl);
//     }
//   };

//   return (
//     <div className='bg-white lg:w-[30vw] lg:h-[70vh] md:w-[50vw] md:h-[60vh] sm:w-[80vw] sm:h-[70vh] w-[90vw] h-auto mx-auto rounded-lg p-6 py-10 flex flex-col items-center justify-between shadow-lg'>

//       <h1 className='text-black text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6'>
//         Please Upload an Image for Reference
//       </h1>

//       {!userImage ? (
//         <div className='flex justify-center'>
//           <img 
//             src={logo} 
//             className='lg:w-[350px] lg:h-[200px] md:w-[300px] md:h-[180px] sm:w-[250px] sm:h-[150px] w-[200px] h-[120px] rounded-lg shadow-md' 
//             alt="Placeholder" 
//           />
//         </div>
//       ) : (
//         <div className='flex justify-center'>
//           <img 
//             src={userImage} 
//             className='lg:w-[350px] lg:h-[200px] md:w-[300px] md:h-[180px] sm:w-[250px] sm:h-[150px] w-[200px] h-[120px] rounded-lg shadow-md' 
//             alt="Uploaded" 
//           />
//         </div>
//       )}

//       <div className='w-full flex justify-center mt-4'>
//         <label 
//           htmlFor="imageInput" 
//           className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'>
//           Choose File
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           id="imageInput"
//           onChange={storeImage}
//           className='hidden'
//         />
//       </div>

//       <button className='mt-4 py-2 px-6 bg-lime-700 hover:bg-lime-800 text-white rounded-xl cursor-pointer font-semibold transition-colors duration-200'>
//         Upload
//       </button>

//     </div>
//   );
// };

// export default Card;


import React, { useState } from 'react';
import logo from "../assets/frontimage.png";

const Card = () => {
  const [userImage, setUserImage] = useState("");

  const storeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
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

      <button className='mt-4 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl cursor-pointer font-semibold transition-colors duration-200'>
        Upload
      </button>

    </div>
  );
};

export default Card;
