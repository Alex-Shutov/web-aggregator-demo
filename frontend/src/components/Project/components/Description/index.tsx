import React from 'react';

interface IProps{
  description:string
}

const ProjectDescription: React.FC<IProps> = ({description}) => (
  <div className="mt-10 sm:mt-20">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Описание проекта</h2>
    <div className="p-4 sm:p-8 md:p-12 bg-dark-grey-color text-paragraph-color text-base sm:text-lg space-y-4 break-words">
      <p>
        {description || 'Основной геймплей игры завязан на использовании merge-механики — совмещение/слияние блоков, для решения комбинаторной задачи, которая является главной целью игрока для продвижения в игре на протяжении 14 уровней.'}
      </p>
    </div>
  </div>
);

export default ProjectDescription;
