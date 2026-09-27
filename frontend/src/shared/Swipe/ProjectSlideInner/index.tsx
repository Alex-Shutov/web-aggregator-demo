import React from 'react';
import { Link } from 'react-router-dom';

interface SlideInnerProps {
  image: string;
  category: string[];
  name: string;
  id: number;
}

const SlideInner = ({ image, category, name, id }: SlideInnerProps) => {

  return (
    <>
      <img src={image} className="w-full h-full" alt="" />
      <div className="absolute bottom-0 left-0 right-0 p-2 pb-6 grid grid-cols-[1fr_auto] items-end bg-gradient-to-t from-[rgba(34,33,33,0.39)] via-[rgba(34,33,33,0.270079)] to-[rgba(34,33,33,0)]">
        <div className="flex flex-wrap gap-2">
          {category.map((item, i) => (
            <span
              key={i}
              className="text-sm font-medium text-white/70 relative pr-3 after:content-['-'] after:absolute after:right-0 after:text-[#8F8F8F]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="text-xl font-semibold">{name}</div>
        <Link
          to={`/project${id}`}
          className="bg-gradient-to-b from-[#60FB9E] via-[#1EFE77] to-[#0D9834] rounded-md px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          Открыть
        </Link>
      </div>
    </>
  );
};

export default React.memo(SlideInner);