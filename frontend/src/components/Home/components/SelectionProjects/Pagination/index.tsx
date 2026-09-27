import UseProjects from '@components/Project/hooks/useProject';
import { allProjectsList } from '@components/Project/projects.atom';
import arrowLeft from '@public/icons/arrows/arrow_left.svg'
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentProjectPaginationPage } from '@components/Home/components/SelectionProjects/Pagination/pagination.atom';
import { useMemo } from 'react';
import Image from '@shared/Image';

interface PaginationProps {
  current: number;
  total: number;
  totalPages:number;
}

const limit = 10

const Pagination: React.FC<PaginationProps> = ({ current, total,totalPages }) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentProjectPaginationPage);
  const totalPage = useMemo(()=>Math.ceil(total/limit),[total])
  const canClickLeft = useMemo(()=>false,[totalPage,total,currentPage])
  const canClickRigth = useMemo(()=>false,[totalPage,total,currentPage])
  const handlePageChange = (direction: 'next' | 'prev') => {
    let newPage = currentPage;
    if (direction === 'next' && currentPage < total) {
      newPage += 1;
    } else if (direction === 'prev' && currentPage > 1) {
      newPage -= 1;
    }
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="text-txt_fourth text-lg grow">Найдено {total} проект</div>
      <div className="flex items-center justify-between max-w-lg  mt-2">
        <div className="flex items-center">
          <button
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            <Image src={arrowLeft} className={'rotate-180'} />
            {/*<ChevronLeftIcon className="w-5 h-5" />*/}
          </button>
          <div className="mx-4 text-gray-500">
            {currentPage} из {totalPages}
          </div>
          <button
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
          >
            <Image src={arrowLeft} className={''} />


            {/*<ChevronRightIcon className="w-5 h-5" />*/}
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
