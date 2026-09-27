import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { API_URL, STORAGE_URL } from '@shared/constants';
import { http } from '@shared/http';

interface IProps{
  id:string
  fullScreen?:boolean
}

interface UnityUrls {
  loaderUrl?: string
  dataUrl?: string
  frameworkUrl?: string
  wasmUrl?: string
  assetsUrl?: string
}

const DisplayUnity:React.FC<IProps> = ({id,fullScreen}) => {
  const [urls, setUrls] = useState<UnityUrls | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    http.get(`/minio/unityUrls/${id}`)
      .then((resp) => {
        const data = resp.data as UnityUrls
        if (data?.loaderUrl && data?.dataUrl && data?.frameworkUrl && data?.wasmUrl) {
          setUrls(data)
        } else {
          setUrls({
            loaderUrl: `${STORAGE_URL}/${id}/Build.loader.js`,
            dataUrl: `${STORAGE_URL}/${id}/Build.data`,
            frameworkUrl: `${STORAGE_URL}/${id}/Build.framework.js`,
            wasmUrl: `${STORAGE_URL}/${id}/Build.wasm`,
            assetsUrl: `${STORAGE_URL}/${id}/StreamingAssets`,
          })
        }
      })
      .catch(() => {
        setError('Не удалось загрузить файлы игры')
      })
  }, [id])

  if (error) {
    return <div className="text-bt_danger text-base sm:text-lg p-4 sm:p-8">{error}</div>
  }

  if (!urls?.loaderUrl) {
    return <div className="text-txt_secondary text-base sm:text-lg p-4 sm:p-8">Загрузка игры…</div>
  }

  return <UnityPlayer urls={urls} fullScreen={fullScreen} />
}

const UnityPlayer: React.FC<{ urls: UnityUrls; fullScreen?: boolean }> = ({ urls, fullScreen }) => {
  const {unityProvider} =
    useUnityContext({
      loaderUrl: urls.loaderUrl!,
      dataUrl: urls.dataUrl!,
      frameworkUrl: urls.frameworkUrl!,
      codeUrl: urls.wasmUrl!,
      streamingAssetsUrl: urls.assetsUrl || `${API_URL}minio/download/StreamingAssets`,
    });

  return (
    <Unity
      unityProvider={unityProvider}
      className="w-full max-w-full"
      style={{
        width: '100%',
        height: fullScreen ? '100%' : 'auto',
        aspectRatio: fullScreen ? undefined : '16 / 9',
        maxHeight: fullScreen ? undefined : '70vh',
        overflow: 'hidden',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}

export default DisplayUnity
