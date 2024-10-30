// import React, { useState } from 'react';
// import './Gallery.css'; // Import the CSS file
// import image1 from '../MyImage/i1.jpg';
// import image2 from '../MyImage/i2.jpg';
// import image3 from '../MyImage/i3.jpg';
// import image4 from '../MyImage/i4.jpg';
// import image5 from '../MyImage/i5.jpg';
// //import image6 from '../MyImage/i6.jpg';
// // Import more images as needed

// const Gallery = () => {
//   const [currentImage, setCurrentImage] = useState(null);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

//   // Store images with their respective paths and attributes
//   const images = [
//     { src: image1, alt: 'Image 1', height: '350px', width: '400px' },
//     { src: image2, alt: 'Image 2', height: '300px', width: '400px' },
//     { src: image3, alt: 'Image 3', height: '350px', width: '300px' },
//     { src: image4, alt: 'Image 4', height: '350px', width: '370px' },
//     { src: image5, alt: 'Image 5', height: '200px', width: '400px' },
//     { src: image1, alt: 'Image 6', height: '350px', width: '300px' },
//   ];

//   const openLightbox = (image) => {
//     setCurrentImage(image);
//     setIsLightboxOpen(true);
//   };

//   const closeLightbox = () => {
//     setIsLightboxOpen(false);
//     setCurrentImage(null);
//   };

//   return (
//     <div className="gallery-container">
//       <h1>Image Gallery</h1>
//       <div className="gallery">
//         {images.map((image, index) => (
//           <div
//             className="gallery-item"
//             key={index}
//             onClick={() => openLightbox(image)}
//             style={{ height: image.height, width: image.width }}
//           >
//             <img src={image.src} alt={image.alt} />
//           </div>
//         ))}
//       </div>

//       {isLightboxOpen && (
//         <div className="lightbox" onClick={closeLightbox}>
//           <span className="close">&times;</span>
//           <img src={currentImage.src} alt={currentImage.alt} className="lightbox-content" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;
