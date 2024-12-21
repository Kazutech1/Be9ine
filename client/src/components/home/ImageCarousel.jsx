import React, { useState, useEffect } from "react";

// Import images from assets folder
import image1 from '../../assets/be9-img1.webp'
import image2 from '../../assets/be9-img2.webp';
import image3 from '../../assets/be9-img3.webp';

const ImageCarousel = () => {
  const images = [image1, image2, image3]; // Array of images
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Switch image every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-[500px]">
      {/* Display Current Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default ImageCarousel;
