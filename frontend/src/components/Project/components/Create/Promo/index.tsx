import React from 'react';
import UploadBox from '@shared/Upload/Box';
import Inner from '@components/Project/components/Create/Promo/Inner';
import { useRecoilState } from 'recoil';
import { imagesFileState, mainImageFileState, videoFileState } from '@components/Project/projects.create.atom';

const PromoMaterials: React.FC = () => {
  const [images, setImages] = useRecoilState(imagesFileState);
  const [mainImage, setMainImage] = useRecoilState(mainImageFileState);
  const [video, setVideo] = useRecoilState(videoFileState);


  return (
    <div className="bg-gray-800 text-white rounded-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Промо-материалы</h2>
      <p className="mb-6">Загрузите материалы для демонстрации проекта</p>
      <div className={'flex'}>
        <div className={'flex-grow-1'}>
          <div className="mb-6 px-4">
            <UploadBox id={'cover'} label={'Обложка'} width="1280" format={['.jpeg', '.jpg']} type="mainImage" />
          </div>
        </div>
        <div className={'flex flex-grow-3 flex-row flex-wrap'}>
          {Array(4)
            .fill(0)
            .map((_, index) => {
              return (
                <div className="mb-6 px-4" key={index}>
                  <UploadBox
                    id={`image_${index}`}
                    inner={<Inner aspectRatio={'16:9'} mainText={'Ширина от 1280px'}
                                  secondaryText={'Альбомная ориентация'} />}
                    label={index === 0 ? 'Изображения проекта' : ''}
                    width="1280"
                    format={['.jpeg', '.jpg']}
                    type="image"
                    index={index}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PromoMaterials;
