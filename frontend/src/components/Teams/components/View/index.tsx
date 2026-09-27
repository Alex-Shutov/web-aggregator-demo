import React, { useState } from 'react';
import { ITeamProps } from '@components/Teams/teams.types';
import { Link } from 'react-router-dom';
import Pagination from '@shared/Pagination';
interface IProps{
  team:ITeamProps
}
const TeamView:React.FC<IProps> = ({ team }) => {
  if(!team) return <></>

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState<number>(1); // добавьте состояние для текущей страницы
  const membersPerPage = 3; // количество членов команды на одной странице
  const totalPages = Math.ceil(team.members.length / membersPerPage); // общее количество страниц

  // метод для изменения текущей страницы
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // получаем индексы членов команды для текущей страницы
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = team.members.slice(startIndex, endIndex);

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-6">Команда разработки</h2>
        <div className={'text-txt_secondary text-lg'}>{team?.name}</div>
        <p className="text-gray-600">{team.members.length} участников</p>
      </div>
      {currentMembers.map((member, index) => {

        // @ts-ignore
        if(member?.user)
          { // @ts-ignore
            member=member.user
          }
        return (
          <div key={index} className="flex pl-4 flex-col mb-2">
            {/*<div className={`w-2 h-2 rounded-full mr-2`}></div>*/}
            <span className="font-semibold mb-1 mr-2">{member.surname} {member.name}</span>
            <span className="mb-1 text-gray-600">{member.projectRoles?.role ?? 'Не указано'}</span>
            <Link to={member.contacts} className="text-blue-500">
              Контакты
            </Link>
          </div>
        );
      })}
      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    </>
  );
};

export default TeamView;