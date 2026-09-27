import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
import SlideInner from './ProjectSlideInner';

interface SwiperSlideProps {
  renderSlide: (project: any) => React.ReactNode;
}
interface IProps{
  data:any,
  swiperEffect:string,
  classNames:string,
}
const SwiperComponent:React.FC<IProps & SwiperSlideProps> = ({data,swiperEffect,classNames,renderSlide}) => {

  return (
    <div className={classNames}>
      <Swiper
        key={JSON.stringify(data)}
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Thumbs]}
        spaceBetween={0}
        grabCursor={true}
        effect={swiperEffect}
        navigation
        pagination={{ clickable: true }}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 304,
          depth: 100,
          modifier: 1.132,
        }}
        slidesPerView={'auto'}
        allowTouchMove={false}
      >
        {data.map((value:any,i:number) => (
          <SwiperSlide key={i}>
            {renderSlide(value)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(SwiperComponent);