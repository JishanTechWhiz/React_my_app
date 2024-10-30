// src/components/ExampleCarouselImage.js
import React from 'react';
import PropTypes from 'prop-types';
import slide1 from '../MyImage/i5.jpg' // Adjust the path as needed
import slide2 from '../MyImage/i2.jpg';
import slide3 from '../MyImage/i3.jpg';

const images = {
  'First slide': slide1,
  'Second slide': slide2,
  'Third slide': slide3,
};

const ExampleCarouselImage = ({ text }) => {
  return (
    <img
      className="d-block w-100 carousel-image"
      src={images[text]} // Use the text to find the corresponding image
      alt={text}
    />
  );
};

ExampleCarouselImage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
