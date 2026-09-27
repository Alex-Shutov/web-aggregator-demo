import { IBadgeList } from '@shared/Badge/badge.types';
import React from 'react';
import StatusBadge from '@shared/Badge';

const Index: React.FC<IBadgeList> = ({ badges }) => {

  return (
    <div className="text-lg font-normal text-white mb-4 ">

      {badges.map((badge, index) => (
        <div className={`flex justify-end items-center ${index===badges.length ? '' :'mb-2'}`}>
          <StatusBadge key={index} number={badge.number} className={badge?.className} boldText={badge.boldText} defaultText={badge.defaultText} urlImage={badge.urlImage} />
        </div>
          ))}
        </div>
        );
      };


export default Index