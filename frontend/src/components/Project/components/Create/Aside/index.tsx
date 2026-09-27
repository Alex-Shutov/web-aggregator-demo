import React from 'react';
import Status, { statusTypes } from '@shared/Status';
import { IProjectWithFunctions, PROJECT_STATUSES } from '@components/Project/projects.types';
import Button from '@shared/Button';
import Upload from '@components/Project/components/Create/Aside/Upload';
import Select from '@shared/Selector';
import { SortOrder } from '@components/Home/components/SelectionProjects/Pagination/pagination.atom';
import { sortTypeLabels } from '@components/Home/components/SelectionProjects/Pagination/pagination.selector';
import { useRecoilValue } from 'recoil';
import { teamState } from '@components/Teams/teams.atoms';
import TeamView from '@components/Teams/components/View';
import CategorySelector from '@components/Project/components/Create/Aside/CategorySelector';

interface IProps {
  project: IProjectWithFunctions;
}

const ProjectAside: React.FC<IProps> = ({ project }) => {
  const team = useRecoilValue(teamState);

  return (
    <div className="flex-[0.8] lg:max-w-xs space-y-4">
      <div className={'mb-6'}>
        <div className={'text-2xl font-semibold'}>Статус проекта</div>
        <Status statusType={statusTypes.projects} status={project.status ?? 'draft'} />
      </div>

      <Upload project={project} />
      <TeamView team={team} />
      <CategorySelector project={project}/>
      {/*<RatingProject endVoting={false} currentPlace={2} currentVoices={40} fullVoices={70} />*/}
      {/*<Team countOnTab={3} />*/}
      {/*<History title="Проекты команды" />*/}
    </div>
  );
};

export default ProjectAside;