import React, { useState } from "react";
import course_1 from "@public/icons/course_number/course_1.svg";
import course_2 from "@public/icons/course_number/course_2.svg";
import course_3 from "@public/icons/course_number/course_3.svg";
import course_4 from "@public/icons/course_number/course_4.svg";
import arrow from "@public/icons/arrows/arrow_left.svg";

interface TeamProps {
  countOnTab?: number;
}

const Team: React.FC<TeamProps> = ({ countOnTab = 3 }) => {
  const list = [
    { name: "Рубцов Павел", role: "UX/UI-дизайнер", course: 1 },
    { name: "Филатова Софья", role: "UX/UI-дизайнер", course: 2 },
    { name: "Козий Ольга", role: "Frontend-разработчик", course: 2 },
    { name: "Филатова Софья 2", role: "UX/UI-дизайнер", course: 1 },
    { name: "Козий Ольга 2", role: "Frontend-разработчик", course: 2 },
    { name: "Рубцов Павел 2", role: "UX/UI-дизайнер", course: 4 },
    { name: "Козий Ольга 3", role: "Frontend-разработчик", course: 3 },
  ];

  const length = list.length;
  countOnTab = Math.min(countOnTab, length);

  const [current, setCurrent] = useState(countOnTab);

  const nextTabHandler = () => {
    setCurrent((prev) => Math.min(prev + countOnTab, length));
  };

  const prevTabHandler = () => {
    setCurrent((prev) => Math.max(prev - countOnTab, countOnTab));
  };

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-4">Команда разработки</h2>
      <div className="text-lg text-gray-500 mb-1">Название команды</div>
      <div className="text-base text-gray-400 mb-8">{length} участников</div>
      <div className="pl-3">
        {list
          .slice(current - countOnTab, current)
          .map(({ name, role, course }, index) => (
            <div key={index} className="mb-10">
              <div className="text-lg text-gray-700 mb-2">{name}</div>
              <CourseAndRole course={course}>{role}</CourseAndRole>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center gap-4">
        {/*<PaginationButtonLeft onClick={prevTabHandler}>*/}
        {/*  <img src={arrow} alt="Previous" className="w-8 h-8" />*/}
        {/*</PaginationButtonLeft>*/}
        {/*<PaginationText current={current} countOnTab={countOnTab} length={length} />*/}
        {/*<PaginationButtonRight onClick={nextTabHandler}>*/}
        {/*  <img src={arrow} alt="Next" className="w-8 h-8 transform rotate-180" />*/}
        {/*</PaginationButtonRight>*/}
      </div>
    </div>
  );
};

const CourseAndRole: React.FC<{ course: number; children: React.ReactNode }> = ({
                                                                                  course,
                                                                                  children,
                                                                                }) => {
  const courseIcons = {
    1: course_1,
    2: course_2,
    3: course_3,
    4: course_4,
  };

  return (
    <div className="flex items-center gap-2 text-base text-gray-500">
      {/*<img src={courseIcons[course]} alt={`Course ${course}`} className="w-6 h-6" />*/}
      {children}
    </div>
  );
};

export default Team;
