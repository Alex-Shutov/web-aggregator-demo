import useProjects from '@components/Project/hooks/useProject';
import { Suspense, useState } from 'react';
import Pagination from '@components/Home/components/SelectionProjects/Pagination';
import Select from '@shared/Selector';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentSortType, SortOrder } from '@components/Home/components/SelectionProjects/Pagination/pagination.atom';
import {
  getAllSortOptions,
  sortTypeLabels,
} from '@components/Home/components/SelectionProjects/Pagination/pagination.selector';
import RatingPreviewProject from '@components/Home/components/SelectionProjects/ProjectList';

const SelectionProjects = () => {
  const [sort,setSort] = useRecoilState(currentSortType)
  const sortOptions = useRecoilValue(getAllSortOptions)
  const { projects,page,totalCount } = useProjects();
  const handleSetSort = (value:SortOrder) => {
    setSort(value)
  }

  return (
    <div className="max-w-5xl w-full">
      <div className={'sticky py-2 z-10 top-16 sm:top-20 bg-pnl_first'}>
      <h2 className="mb-0 text-xl sm:text-2xl font-medium text-white">Рейтинг проектов &gt;</h2>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <Pagination current={page} totalPages={totalCount ?? 1} total={totalCount ?? 0} />
          <div className="text-gray-400 w-full sm:w-auto">
            <Select continaerClass={'!mb-0 !flex'} label={''} prop={'value'} name={'filter_pagination'}
                    onChange={(value) => handleSetSort(value as SortOrder)} options={sortOptions} placeholder={''}
                    currentValue={sortTypeLabels[sort]} />
          </div>
        </div>
      </div>
      {projects?.map((project,index) => (
       <RatingPreviewProject id={project?.id} rating={project?.rating} name={project?.name} place={index+1} categories={project?.categories} description={project?.description} coverImg={''}/>
      ))}
    </div>
  );
};
export default SelectionProjects