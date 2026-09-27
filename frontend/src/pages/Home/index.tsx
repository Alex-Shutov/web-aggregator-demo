import React, { Suspense, useState } from 'react';
import Categories from '@components/Home/components/Categories';
import History from '@components/Home/components/History';
import EventsFilter from '@components/Home/components/EventsFilter';
import VotingProjects from '@components/Home/components/VotingProjects';
import SelectionProjects from '@components/Home/components/SelectionProjects';

const Home = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="mx-auto mb-20 max-w-[1184px] px-4 sm:px-5 overflow-x-hidden">
      <button
        type="button"
        className="lg:hidden mb-4 w-full h-11 rounded-md bg-pnl_secondary text-txt_main font-medium"
        onClick={() => setFiltersOpen((prev) => !prev)}
      >
        {filtersOpen ? 'Скрыть фильтры' : 'Фильтры и категории'}
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside
          className={`${filtersOpen ? 'block' : 'hidden'} lg:block flex-shrink-0 w-full lg:w-64`}
        >
          <EventsFilter/>
          <Categories />
          <History/>
        </aside>
        <div className="min-w-0 flex-1">
          <VotingProjects />
          <Suspense fallback={<div/>}>
            <SelectionProjects />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
