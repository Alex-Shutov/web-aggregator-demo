import React, { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import Button from '@shared/Button';
import { IProjectWithFunctions } from '@components/Project/projects.types';
import { zipFileState } from '@components/Project/projects.create.atom';
import useUser from '@components/User/hooks/useUser';
import { isDemoUser } from '@utils/isDemoUser';

interface IProps {
  project: IProjectWithFunctions;
}

const Index: React.FC<IProps> = ({ project }) => {
  const [uploadedFile, setUploadedFile] = useRecoilState(zipFileState);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const demo = isDemoUser(user);
  const disabled = demo || !project?.id;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const fileExtension = `.${selectedFile.name.split('.').pop()}`;
      if (fileExtension !== '.zip') {
        setError('Invalid file format. Only .zip files are allowed.');
        setUploadedFile(null);
        return;
      }
      setError(null);
      setUploadedFile(selectedFile);
    }
  };

  return (
    <div className={'mb-4'}>
      <input
        id={'project_button'}
        type="file"
        accept={'application/zip'}
        multiple={false}
        className="hidden"
        disabled={disabled}
        onChange={handleFileChange}
      />
      <label htmlFor={disabled ? undefined : 'project_button'}>
        <div>
          <Button
            asContainer={!disabled}
            type={'bt_secondary'}
            disabled={disabled}
            classNameButton={`w-full h-12 ${!disabled && 'text-center pt-[0.6rem]'}`}
          >
            {demo ? 'Загрузка недоступна в демо' : 'Загрузить проект'}
          </Button>
        </div>
      </label>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {uploadedFile && <div className="text-green-500 mt-2">Файл загружен: {uploadedFile.name}</div>}
    </div>
  );
};

export default Index;
