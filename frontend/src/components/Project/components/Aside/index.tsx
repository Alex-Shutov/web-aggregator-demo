import React from 'react';
import ProjectPlay from '@components/Project/components/Aside/ProjectPlay';
import RatingProject from '@components/Project/components/Aside/RatingProject';
import TeamView from '@components/Teams/components/View';
import useProject from '@components/Project/hooks/useProject';


interface ProjectAsideProps {
  projName: string;
  id: string;
}

const ProjectAside: React.FC<ProjectAsideProps> = ({ projName, id }) => {
  const proj = useProject(id)
  return <div className="flex-1 w-full lg:max-w-xs space-y-4 min-w-0">
    <ProjectPlay path={`play`} name={projName} id={id} />
    <TeamView team={proj.team} />
    <RatingProject
      button
      endVoting={false}
      currentPlace={1}
      currentVoices={proj.rating ?? 0}
      fullVoices={Math.max(proj.rating ?? 0, 100)}
      projectId={id}
    />
  </div>
};

export default ProjectAside;
