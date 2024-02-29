import React from 'react'
import Slider from 'react-slick'
import slide1 from '../../assets/images/1472478d-d056-4451-af07-736db890d4e6.avif';
import slide2 from '../../assets/images/61e54034-16da-4bea-8f38-08299a5adafa.avif';
import slide3 from '../../assets/images/8c4f8797-9f7d-46ac-92bd-f540cc916b2f.avif';

export default function MainSlider() {
    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2300
    
  };
  return (
    <div className='container mt-5'>
    <Slider {...settings}>
      <img src={slide1} alt="Slider" className='w-80' />
      <img src={slide2} alt="Slider" className='w-80' />
      <img src={slide3} alt="Slider" className='w-80' />
    </Slider>
   </div>
  )
}
