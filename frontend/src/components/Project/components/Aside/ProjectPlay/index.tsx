import React from "react";
import ProjectImage from '@shared/Image/ProjectImage';
import Button from '@shared/Button';

interface ProjectPlayProps {
  name: string;
  id: string;
  path?: string;
}

const ProjectPlay: React.FC<ProjectPlayProps> = ({ name, id, path = "" }) => {
  return (
    <div className="mb-8 sm:mb-12 w-full">
      <h2 className="text-xl sm:text-2xl font-medium mb-4 break-words">{name}</h2>
      <ProjectImage
        className="block mb-6 object-cover w-full max-w-md aspect-video rounded-md"
        imgName={`main_image_0.jpg`}
        id={id}
      />
      <Button to={path} classNameButton={'basis-full h-12'} classNameContainer={'w-full text-xl flex justify-center'} type={'bt_primary'}>Играть</Button>

    </div>
  );
};

export default ProjectPlay;
