import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    margin: 0,
    height: '60px',
    color: '#fff',
    lineHeight: '30px',
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    bottom: '20px',
    transform: 'translateX(-50%)'
  };
  const backStyle1 = {
    backgroundImage: "URL('/images/main_benner1.jpg')",
    height: '800px',
    position: 'relative'
  }
  const backStyle2 = {
    backgroundImage: "URL('/images/main_benner2.jpg')",
    height: '800px',
    position: 'relative'
  }
  const backStyle3 = {
    backgroundImage: "URL('/images/main_benner3.jpg')",
    height: '800px',
    position: 'relative'
  }
  const backStyle4 = {
    backgroundImage: "URL('/images/main_benner4.jpg')",
    height: '800px',
    position: 'relative'
  }
  
const VisualSlider = () => {
    const onChange = (currentSlide) => {
        // console.log(currentSlide);
      };
    return (
        <div>
            <Carousel afterChange={onChange} autoplay>
                <div>
                    <div style={backStyle1}>
                        <h3 style={contentStyle}>01 / 04</h3>
                    </div>
                </div>
                <div>
                    <div style={backStyle2}>
                        <h3 style={contentStyle}>02 / 04</h3>
                    </div>
                </div>
                <div>
                    <div style={backStyle3}>
                        <h3 style={contentStyle}>03 / 04</h3>
                    </div>
                </div>
                <div>
                    <div style={backStyle4}>
                        <h3 style={contentStyle}>04 / 04</h3>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default VisualSlider;