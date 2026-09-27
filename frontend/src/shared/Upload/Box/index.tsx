import React, { useState, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import downloadSvg from '@public/icons/download.svg';
import { imagesFileState, mainImageFileState, videoFileState } from '@components/Project/projects.create.atom';

interface UploadBoxProps {
  id?: string | null | undefined;
  width: string;
  height?: string;
  format: string[];
  label?: string;
  inner?: string | React.ReactNode;
  type: 'image' | 'mainImage' | 'video';
  index?: number; // Используется только для изображений
}

const UploadBox: React.FC<UploadBoxProps> = ({
                                               width,
                                               height,
                                               format,
                                               label = '',
                                               id,
                                               inner = 'Выберите файл',
                                               type,
                                               index,
                                             }) => {
  const [error, setError] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>();
  const [images, setImages] = useRecoilState(imagesFileState);
  const [mainImage, setMainImage] = useRecoilState(mainImageFileState);
  const [video, setVideo] = useRecoilState(videoFileState);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const fileExtension = `.${selectedFile.name.split('.').pop()}`;
      if (!format.includes(fileExtension)) {
        setError(`Invalid file format. Only ${format.join(', ')} files are allowed.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width < img.height) {
            setError('Разрешены только фото с альбомной ориентацией');
            return;
          } else {
            setError('');
            setFileUrl(URL.createObjectURL(selectedFile));

            if (type === 'image') {
              setImages((prevImages:any) => {
                const newImages = [...prevImages];
                if (index !== undefined) {
                  newImages[index] = selectedFile;
                }
                return newImages;
              });
            } else if (type === 'mainImage') {
              setMainImage(selectedFile);
            } else if (type === 'video') {
              setVideo(selectedFile);
            }
          }
        };
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = (type === 'image' ? images[index!]?.name : type === 'mainImage' ? mainImage?.name : video?.name) || '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const file = type === 'image' ? images[index!] : type === 'mainImage' ? mainImage : video;

  return (
    <>
      {label ? <h3 className={'block text-xl font-semibold mb-2'}>{label}</h3> : <div className={'h-[24.5px] block mb-2'} />}
      <div className="p-4 bg-bt_upload_box border border-[#99A2AD] rounded-md text-center flex items-center justify-center w-96 h-52">
        <input
          disabled={false}
          id={id ?? 'file_box'}
          type="file"
          accept={format.join(',')}
          onChange={handleFileChange}
          multiple={false}
          className="hidden"
        />
        {!file ? (
          error ? (
            <span className={'text-txt_ind_info'}>{error}</span>
          ) : (
            <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{inner}</span>
          )
        ) : (
          <div className="relative">
            <img src={fileUrl} className={'max-h-48 max-w-80'} />
            <a href={fileUrl} download={file?.name} className="absolute right-2 bottom-2" onClick={handleDownload}>
              <img className="hover:opacity-50" src={downloadSvg} alt="download icon" />
            </a>
          </div>
        )}
      </div>
      <div className={'flex flex-row justify-between mt-2'}>
        <label className="cursor-pointer text-txt_info underline" htmlFor={id ?? 'file_box'}>
          Загрузить
        </label>
        <div className={''}>Формат:{format.join(', ')}</div>
      </div>
    </>
  );
};

export default UploadBox;
