import React from 'react';
import Input from '@shared/Input';
import { IProjectWithFunctions } from '@components/Project/projects.types';
import SwiperProject from '@components/Project/components/SwiperProject';
import ProjectDescription from '@components/Project/components/Description';
import ProjectInstructions from '@components/Project/components/Instructions';
import PromoMaterials from '@components/Project/components/Create/Promo';

interface IProps{
  project:IProjectWithFunctions
}
const ProjectContent:React.FC<IProps> = ({project}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    project.updateProjectState({ ...project, [name]: value })
    // Update project state with new values
  };

  return <div className="flex-1 lg:flex-[3]">
    <div className="mb-20">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-pnl_first p-4 w-full pt-0">
          <LabeledInput label={'Название команды'} placeholder={'Введите название игры'}  name={'name'} maxLength={40} value={project?.name} handleInputChange={handleInputChange}/>
          <LabeledInput label={'Описание описание'} placeholder={'Опишите ваш проект...'} offset={200} name={'description'} maxLength={1000} value={project?.description} handleInputChange={handleInputChange}/>
          <LabeledInput label={'Как играть'} placeholder={'Опишите правила игры...'} offset={200} name={'howToPlay'} maxLength={1000} value={project?.howToPlay} handleInputChange={handleInputChange}/>
          {/* Add more inputs as necessary */}
        </div>
      </div>
    </div>
  </div>


};


export default ProjectContent;


const LabeledInput:React.FC<{label:string, placeholder?:string, name:string,value:string,handleInputChange:any,[x:string]:any}> = ({label,name,value,handleInputChange,placeholder,...rest}) => {
  return(
    <div className={'mb-6'}>
      <label className="block text-gray-300 font-light text-2xl mb-6">{label}</label>
      <Input
        type={'textarea'}
        name={name}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={handleInputChange}
        {...rest}
      />
    </div>
  )
}