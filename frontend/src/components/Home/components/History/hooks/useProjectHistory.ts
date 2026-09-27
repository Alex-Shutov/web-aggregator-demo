import { useState, useEffect } from 'react';
import { IProjectProps } from '@components/Project/projects.types';


export const useProjectHistory = () => {
  const [history, setHistory] = useState<IProjectProps[]>([]);

  useEffect(() => {
    // Получаем историю из сессионного хранилища при монтировании
    const storedHistory = localStorage.getItem('projectHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addToHistory = (project: IProjectProps) => {
    // Добавляем новый проект в начало истории
    const updatedHistory = [project, ...history.slice(0, 2)];
    setHistory(updatedHistory);
    // Сохраняем историю в сессионном хранилище
    localStorage.setItem('projectHistory', JSON.stringify(updatedHistory));
  };

  return { history, addToHistory };
};