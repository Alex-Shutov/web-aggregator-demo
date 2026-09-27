import { selector } from 'recoil';
import { historyAtom } from '@components/Home/components/History/history.atom';

export const lastVisitedProjectsSelector = selector({
  key: 'lastVisitedProjectsSelector',
  get: ({ get }) => {
    const history = get(historyAtom);
    return history.slice(0, 3);
  },
});