import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './style.module.css';

interface SlideProps {
  image: string;
  number: number;
  currentNumber: number;
  onClick: (img: string, number: number) => void;
}

interface IProps {
  length: number;
  id: string;
}

const SlideInner: React.FC<SlideProps> = ({ image, number, currentNumber, onClick }) => {
  const opacity = currentNumber === number ? '1' : '0.2';
  return (
    <img
      src={image}
      style={{ width: '100%', maxWidth: '256px', opacity }}
      alt=""
      className="object-cover w-full"
      onClick={() => onClick(image, number)}
    />
  );
};

const SwiperProject: React.FC<IProps> = ({ length, id }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = [];
      for (let i = 0; i < length; i++) {
        const imageUrl = `${process.env.REACT_APP_STORAGE_URL || 'http://localhost:9000'}/${id}/image_${i}.jpg`;
        fetchedImages.push(imageUrl);
      }
      setImages(fetchedImages);
    };
    fetchImages();
  }, [id, length]);

  const handleClickSlide = (img: string, number: number) => {
    setCurrentNumber(number);
  };

  return (
    <div>
      <div
        className="max-w-full h-48 sm:h-72 md:h-[31.4rem] mb-6 sm:mb-10 bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${
            images.length > 0 ? images[currentNumber - 1] : ''
          })`,
        }}
      />
      <div className="relative max-w-[55.4rem] overflow-hidden">
        <Swiper
          className={styles.swiper}
          spaceBetween={10}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 2.2 },
            480: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <SlideInner
                currentNumber={currentNumber}
                image={image}
                number={index + 1}
                onClick={handleClickSlide}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperProject;
