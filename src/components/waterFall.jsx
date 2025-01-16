import React, { useState, useEffect } from 'react';
import '../styles/ImageWaterfall.css';

const ImageWaterfall = ({imagePaths}) => {
	const paths = Object.keys(imagePaths)
	const localImages = [
		{ url: paths[0], alt: 'Image 1', timestamp: '2025-01-10T12:00:00' },
		{ url: paths[0], alt: 'Image 1', timestamp: '2025-01-10T12:00:00' },
		{ url: paths[0], alt: 'Image 1', timestamp: '2025-01-10T12:00:00' },
		{ url: paths[0], alt: 'Image 1', timestamp: '2025-01-10T12:00:00' }
		// 可以添加更多的图片对象
	];
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedTime, setSelectedTime] = useState('all');

  useEffect(() => {
    setImages(localImages);
    setFilteredImages(localImages);
  }, []);

  useEffect(() => {
    if (selectedTime === 'all') {
      setFilteredImages(images);
    } else {
      const filtered = images.filter(image => {
        const imageTime = new Date(image.timestamp);
        if (selectedTime === 'today') {
          const today = new Date();
          return (
            imageTime.getDate() === today.getDate() &&
            imageTime.getMonth() === today.getMonth() &&
            imageTime.getFullYear() === today.getFullYear()
          );
        } else if (selectedTime === 'yesterday') {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return (
            imageTime.getDate() === yesterday.getDate() &&
            imageTime.getMonth() === yesterday.getMonth() &&
            imageTime.getFullYear() === yesterday.getFullYear()
          );
        } else if (selectedTime === 'this-week') {
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          return imageTime >= startOfWeek && imageTime <= today;
        } else if (selectedTime === 'this-month') {
          const today = new Date();
          return (
            imageTime.getMonth() === today.getMonth() &&
            imageTime.getFullYear() === today.getFullYear()
          );
        }
        // 可以添加更多的时间筛选逻辑
      });
      setFilteredImages(filtered);
    }
  }, [selectedTime, images]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="image-waterfall">
      <div className="time-filter">
        <button onClick={() => handleTimeSelect('all')}>全部</button>
        <button onClick={() => handleTimeSelect('today')}>今天</button>
        <button onClick={() => handleTimeSelect('yesterday')}>昨天</button>
        <button onClick={() => handleTimeSelect('this-week')}>本周</button>
        <button onClick={() => handleTimeSelect('this-month')}>本月</button>
        {/* 可以添加更多的时间筛选按钮 */}
      </div>
      <div className="image-container">
        {filteredImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageWaterfall;