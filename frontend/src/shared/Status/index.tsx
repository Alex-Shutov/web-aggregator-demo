import React from 'react';
import cn from 'classnames';
import { colorStatusTypes } from '@components/Project/projects.status';

interface StatusType {
  [key: string]: {
    class: string;
    status: string;
  };
}

interface StatusTypes {
  projects: StatusType;
}

export const statusTypes: StatusTypes = {
  projects: colorStatusTypes,
};

interface BadgeProps {
  statusType: StatusType;
  status: string;
  classname?: string;
  defaultStatus?:string,
}

const Badge: React.FC<BadgeProps> = ({ statusType, status, classname,defaultStatus}) => {
  return (
    <div className={'!mt-0'}>
      <div className={cn(statusType[status]?.class,'', classname)}>
        {statusType[status]?.status ?? defaultStatus}
      </div>
    </div>
  );
};

export default Badge;
