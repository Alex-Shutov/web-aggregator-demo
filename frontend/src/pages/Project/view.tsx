import React from 'react';
import { useParams } from 'react-router-dom';
import useProject from '@components/Project/hooks/useProject';
import ProjectHeader from '@components/Project/components/Header';
import ProjectAside from '@components/Project/components/Aside';
import ProjectContent from '@components/Project/components/Content';

const ProjectView = () => {
  const { projId } = useParams<{ projId: string }>();
  const project = useProject(projId);
  if(projId === 'create') return <></>

  return (
    <div className="max-w-[85rem] mx-auto mb-16 sm:mb-28 px-4 sm:px-8 overflow-x-hidden">
      <ProjectHeader title={project?.name} />
      <div className="flex justify-between gap-8 sm:gap-12 lg:gap-24 mb-12 sm:mb-20 flex-col lg:flex-row lg:space-x-4">
        <ProjectAside projName={project?.name} id={project?.id} />
        <ProjectContent project={project} />
      </div>
    </div>
  );
};

export default ProjectView;
