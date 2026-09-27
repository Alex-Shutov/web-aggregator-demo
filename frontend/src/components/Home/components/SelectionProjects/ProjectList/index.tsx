import React, { useMemo } from 'react';
import ratingSvg from "@public/icons/voices.svg";
import prizePlaceDefault from "@public/icons/place_flag/place_default.svg";
import prizePlace1 from "@public/icons/place_flag/place_1.svg";
import prizePlace2 from "@public/icons/place_flag/place_2.svg";
import prizePlace3 from "@public/icons/place_flag/place_3.svg";
import { IProjectCategoryProps } from '@components/Home/components/Categories/categories.types';
import { groupCategoriesNamesByParentName } from '@utils/group';
import Button from '@shared/Button';
import MainImage from '@components/Home/components/SelectionProjects/ProjectList/MainImage';

interface Props {
  coverImg: string;
  categories: IProjectCategoryProps[];
  name: string;
  rating: number;
  description: string;
  place: number;
  id: string;
}

const RatingPreviewProject: React.FC<Props> = ({
                                                 place,
                                                 rating,
                                                 categories,
                                                 name,
                                                 description,
                                                 id,
                                               }: Props) => {


  const placeImage =
    place === 1
      ? prizePlace1
      : place === 2
        ? prizePlace2
        : place === 3
          ? prizePlace3
          : prizePlaceDefault;

  const placeBackgroundColor =
    place === 1
      ? "bg-gradient-to-r from-[rgba(255,188,15,0.07)] to-[rgba(255,188,15,0.07)]"
      : place === 2
        ? "bg-gradient-to-r from-[rgba(137,194,226,0.07)] to-[rgba(137,194,226,0.07)]"
        : place === 3
          ? "bg-gradient-to-r from-[rgba(197,95,16,0.07)] to-[rgba(197,95,16,0.07)]"
          : "";

  const placeBorderColor =
    place === 1
      ? "border-[#E99D02]"
      : place === 2
        ? "border-[#6B8AAA]"
        : place === 3
          ? "border-[#C55F10]"
          : "";
  const mappedCategories = useMemo(()=>groupCategoriesNamesByParentName(categories),[categories])

  return (
    <div
      className={`relative flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 bg-[var(--dark-grey-color)] mb-4 p-4 sm:p-6 pl-4 border-l-4 ${placeBorderColor} ${placeBackgroundColor}`}
    >
      <div className="flex items-center gap-1 text-[#C1D9E2] font-semibold text-sm sm:mr-4">
        <img src={ratingSvg} alt="" className="w-5 h-5 object-contain" />
        {rating}
      </div>
      <MainImage id={id}/>
      <div className="flex-1 min-w-0">
        <div className="text-[#D0E6EE] text-sm break-words">
          {mappedCategories.map(([parentCategory,childCategories])=>(
            <span key={parentCategory} className={'font-normal'}>{parentCategory} - {childCategories.map((child,index)=>(<span key={child} className={'font-light text-[#D0E6EE]'}>{child}{index+1!==childCategories.length && ', '}</span>))}</span>
          ))}
        </div>
        <div className="text-white text-base sm:text-lg font-semibold break-words">{name}</div>
        <div className="mt-1 text-[rgba(255,255,255,0.65)] text-sm font-light line-clamp-3">
          {description}
        </div>
      </div>
      <div className="w-full sm:w-auto">
        <Button to={`/project/${id}`} type={'bt_primary'} classNameContainer="!block w-full sm:w-auto" classNameButton="w-full sm:w-28">Открыть</Button>
      </div>
      <div
        className="absolute top-0 left-4 w-8 h-12 bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${placeImage})`,
        }}
      >
        <span className="absolute left-0 top-2 w-full text-center text-[#D0E6EE] font-semibold text-sm tracking-tighter">
          {place}
        </span>

      </div>
    </div>
  );
};

export default RatingPreviewProject;
