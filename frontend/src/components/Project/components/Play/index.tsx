import React from "react";
import { Link, useParams } from 'react-router-dom';
import Display from '@components/Project/components/Play/Display';
import useProjects from '@components/Project/hooks/useProject';

function Play() {
  const { projId } = useParams()
  const project = useProjects(projId)

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-5 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-5 break-words">{project?.name || 'Игра'}</h1>
      <nav className="text-txt_secondary mb-4 sm:mb-5 text-sm sm:text-base flex justify-between">
        <Link to="/" className="hover:text-txt_info px-4 py-2 bg-bt_secondary rounded-md text-txt_main font-sora text-xl w-42 text-center font-normal">К проектам</Link>
        <Link to={`/project/${projId}`} className="hover:text-txt_info px-4 py-2 border-solid min-w-36 w-64 border-txt_secondary rounded-md text-txt_main font-sora text-xl text-center font-normal">Страница проекта</Link>
      </nav>
      <Display id={project?.id ?? projId ?? ''} />
    </div>
  );
}

export default Play
