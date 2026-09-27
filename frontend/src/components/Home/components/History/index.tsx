import React from 'react';
import { Link } from 'react-router-dom';
import { useProjectHistory } from '@components/Home/components/History/hooks/useProjectHistory';
import { IProjectProps } from '@components/Project/projects.types';

interface Project {
  id: string;
  name: string;
  genre: string;
  image: string;
}

const History: React.FC = () => {
  const { history, addToHistory } = useProjectHistory();

  const handleProjectVisit = (project: IProjectProps) => {
    addToHistory(project);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">История</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {history.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            onClick={() => handleProjectVisit(project)}
            className="relative h-48 hover:opacity-75 transition-opacity duration-300"
          >
            <div className="absolute inset-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-800 rounded-lg">
              <div>
                <div className="text-gray-400 text-sm mb-1">{project.genre}</div>
                <div className="text-white font-semibold">{project.name}</div>
              </div>
              <button className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path d="M5 4a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2H5z" />
                </svg>
              </button>
            </div>
            <img
              // src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover rounded-lg filter drop-shadow-md transition-opacity duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default History;