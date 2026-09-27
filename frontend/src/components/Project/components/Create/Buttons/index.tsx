import React from 'react';
import Button from '@shared/Button';
import { IProjectWithFunctions } from '@components/Project/projects.types';
import useUser from '@components/User/hooks/useUser';
import { isDemoUser } from '@utils/isDemoUser';

interface IProps {
  project:IProjectWithFunctions
}
const Buttons:React.FC<IProps> = ({project}) => {
  const { user } = useUser()
  const demo = isDemoUser(user)

  return (
    <div className={'flex flex-row justify-center gap-x-6 mt-8'}>
      <Button
        classNameButton={'w-96'}
        type={'bt_secondary'}
        disabled={demo}
        onClick={() => { void project.updateProject() }}
      >
        Сохранить
      </Button>
      <Button
        classNameButton={'w-96'}
        type={'bt_secondary_outline'}
        disabled={demo}
        onClick={() => { void project.publicProject() }}
      >
        Опубликовать
      </Button>
    </div>
  );
};

export default Buttons;
