import React from 'react';
import useProject from '@components/Project/hooks/useProject';
import { useParams } from 'react-router-dom';
import ProjectHeader from '@components/Project/components/Create/Header';
import ProjectContent from '@components/Project/components/Create/Content';
import ProjectAside from '@components/Project/components/Create/Aside';
import PromoMaterials from '@components/Project/components/Create/Promo';
import Buttons from '@components/Project/components/Create/Buttons';

const ProjectEdit = () => {
  const { projId } = useParams<{ projId: string }>();
  const project = useProject(projId);

  return (
    <div className="max-w-[86rem] mx-auto mb-28 px-8">
      <ProjectHeader/>
      <div className="flex justify-between gap-24 mb-20 flex-col lg:flex-row lg:space-x-4">
        <ProjectAside project={project}/>
        <ProjectContent project={project} />
      </div>
      <PromoMaterials/>
      <Buttons project={project}/>
    </div>
  );
};

export default ProjectEdit;