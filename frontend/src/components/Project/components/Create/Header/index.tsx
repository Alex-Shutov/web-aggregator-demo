import React from 'react';
import { Link } from 'react-router-dom';

const ProjectHeader = () => {
  return (
    <div className={'mb-20'}>
      <h1 className="text-2xl font-medium mb-2">Редактироваание проекта</h1>
      <div className="text-pnl_add_second">
        <Link to="/profile/my-projects" className="inline text-txt_secondary">
          Профиль
        </Link>
        <span> &gt; </span>
        <span className={'text-txt_third'}>Мои проекты</span>
      </div>
    </div>
  );
};

export default ProjectHeader;