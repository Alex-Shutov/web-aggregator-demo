import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio';
import { ConfigService } from '@nestjs/config';
import { getFileExtension } from '@app/utils/getFileExtension';
import * as unzipper from 'unzipper';
import * as fs from 'fs';
import * as path from 'path';
import { BufferedFile, UnityBundleUrls } from '@minio/interfaces/minio.interface';


@Injectable()
export class

MinioService {
  private readonly minioClient: Minio.Client;
  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: Number(this.configService.get('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY')
    });
  }

  async createBucket(name:string){
    await this.minioClient.makeBucket(name,'eu-west-1',)
    this.minioClient.setBucketPolicy(
      name,
      JSON.stringify(this.getPolicy(name)),
      function (err) {
        if (err) {
          console.error('Bucket policy skipped', err);
          return;
        }

        console.log('Bucket policy set');
      })
  }


  async createBucketIfNotExists(name:string){
    if(!await this.minioClient.bucketExists(name)) await this.createBucket(name)
  }

  async getFileUrl(fileName: string,projectId:string) {
    return await this.minioClient.presignedUrl('GET', projectId, fileName)
  }

  async deleteFile(fileName: string,projectId:string) {
    await this.minioClient.removeObject(projectId, fileName)
  }

  async deleteBucket(bucketName:string){
    if(!(await this.minioClient.bucketExists(bucketName))) {
      return;
    }
    const objects = await this.getStreamFromListObject(bucketName, '', true);
    const objectNames = objects.map((obj) => obj.name).filter(Boolean) as string[];
    if (objectNames.length) {
      await this.minioClient.removeObjects(bucketName, objectNames);
    }
    await this.minioClient.removeBucket(bucketName);
  }

  assertProjectBucketName(projectId: string) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        projectId,
      );
    if (!isUuid) {
      throw new HttpException(
        'Некорректный projectId для bucket',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private isGameObject(objectName: string): boolean {
    const name = objectName.replace(/^\//, '');
    return (
      name.includes('.loader') ||
      name.includes('.framework') ||
      name.includes('.wasm') ||
      name.includes('.data') ||
      name.endsWith('.html') ||
      name.includes('instant-games-bridge') ||
      name.startsWith('StreamingAssets/') ||
      name.includes('/StreamingAssets/')
    );
  }

  private async readObjectBuffer(bucketName: string, objectName: string): Promise<Buffer> {
    const stream = await this.minioClient.getObject(bucketName, objectName);
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  async recreateProjectBucket(
    projectId: string,
    options?: { replaceImages?: boolean; replaceMainImage?: boolean; replaceVideo?: boolean },
  ) {
    this.assertProjectBucketName(projectId);

    const preserved: { name: string; buffer: Buffer }[] = [];
    if (await this.minioClient.bucketExists(projectId)) {
      const objects = await this.getStreamFromListObject(projectId, '', true);
      for (const obj of objects) {
        if (!obj.name || this.isGameObject(obj.name)) {
          continue;
        }
        const name = obj.name.replace(/^\//, '');
        const isMain = name.includes('main_');
        const isImage = name.includes('image_') && !isMain;
        const isVideo = name.startsWith('video');

        if (isMain && options?.replaceMainImage) continue;
        if (isImage && options?.replaceImages) continue;
        if (isVideo && options?.replaceVideo) continue;
        if (!isMain && !isImage && !isVideo) continue;

        preserved.push({
          name: obj.name,
          buffer: await this.readObjectBuffer(projectId, obj.name),
        });
      }
      await this.deleteBucket(projectId);
    }

    await this.createBucket(projectId);
    for (const file of preserved) {
      await this.putFileInMinio(projectId, file.name, file.buffer);
    }
  }

  async downloadFile(fileName: string, bucketName: string) {
    // Получите файл из bucket
    const stream = await this.minioClient.getObject(bucketName, fileName);

    return stream;
  }

  getContentType(fileName: string): string {
    const ext = getFileExtension(fileName).toLowerCase();
    switch (ext) {
      case 'jpg' || 'jpeg':
        return 'image/jpg'
      case 'gz':
        return 'gzip';
      case 'png':
        return 'image/png'
      case 'js':
        return 'text/javascript';
      case 'html':
        return 'text/html';
      case 'wasm':
        return 'application/wasm';
      default:
        return 'plain/text';
    }
  }

  createMinioUrls(fileNames: string[], bucketName: string): UnityBundleUrls {
    const minioUrl: string = this.getMinioEndpoint() + bucketName;
    const streamingFile = fileNames.find((el) => el.includes('StreamingAssets'));
    const streamingMarker = 'StreamingAssets';
    const assetsUrl = streamingFile
      ? `${minioUrl}/${streamingFile.slice(0, streamingFile.indexOf(streamingMarker) + streamingMarker.length)}`
      : `${minioUrl}/${streamingMarker}`;
    return {
      bridgeUrl: `${minioUrl}/${fileNames.find((el) => el.includes('instant-games-bridge'))}`,
      iconUrl: `${minioUrl}/${fileNames.find((el) => el.includes('.png'))}`,
      htmlUrl: `${minioUrl}/${fileNames.find((el) => el.includes('.html'))}`,
      dataUrl: `${minioUrl}/${fileNames.find((el) => el.includes('.data'))}`,
      loaderUrl: `${minioUrl}/${fileNames.find((el) => el.includes('.loader'))}`,
      frameworkUrl: `${minioUrl}/${fileNames.find((el) => el.includes('.framework'))}`,
      wasmUrl: `${minioUrl}/${fileNames.find((el) => el.includes('.wasm'))}`,
      assetsUrl,
    };
  }

  getMinioEndpoint(){
    const publicUrl = process.env.MINIO_PUBLIC_URL;
    if (publicUrl) {
      return publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`;
    }
    return `${process.env.MINIO_PROTOCOL??'http://'}${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/`
  }

  async getUnityBundleUrls(projectId: string) {
    if (!(await this.minioClient.bucketExists(projectId))) {
      return this.createMinioUrls([], projectId);
    }
    const objects = await this.getStreamFromListObject(projectId, '');
    const fileNames = objects.map((obj) => obj.name).filter(Boolean) as string[];
    return this.createMinioUrls(fileNames, projectId);
  }

  async getStreamFromListObject(bucketName:string,prefix: string, recursive = true):Promise<Minio.BucketItem[]> {
    const stream = this.minioClient.listObjectsV2(bucketName, prefix, recursive);
    const objects:Minio.BucketItem[] = [];

    return new Promise((resolve, reject) => {
      stream.on('data', (obj) => objects.push(obj));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(objects));
    });
  }

  async getObjectFromMinioIfExists(bucketName:string,prefix=''){
    if (!(await this.minioClient.bucketExists(bucketName))) {
      return [];
    }
    const a = await this.getStreamFromListObject(bucketName, prefix);
    const promises = a.map(async el => {
      return await this.getFileUrl(el.name, bucketName);
    });
    return await Promise.all(promises);
  }


  async uploadImages(files: Express.Multer.File[], projectId: string,postfix?:string) {
    if (!files || !files.length) {
      return this.getObjectFromMinioIfExists(projectId,`${postfix??''}image_`)
    }
    const promises = files.map(async (file, index) => {
      const imageUrl = await this.uploadImage(file as BufferedFile, projectId, `/${postfix??''}image_${index}`);
      return { [`${postfix??''}image_${index}`]: imageUrl };
    });

    const results = await Promise.all(promises);

    const imageUrls = results.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});

    return imageUrls;
  }

  async uploadVideo(file:Express.Multer.File | undefined, projectId:string){
    const videoFile = file
    if(!videoFile || !videoFile.mimetype?.includes('mp4')) {
      const el = await this.getObjectFromMinioIfExists(projectId,`video`)
      if(!el.length) return null
      return el
    }
    await this.createBucketIfNotExists(projectId)
    const ext = videoFile.originalname.substring(videoFile.originalname.lastIndexOf('.'), videoFile.originalname.length);
    const filename = 'video' + ext
    const fileBuffer = videoFile.buffer;
    await this.putFileInMinio(projectId,filename,fileBuffer)
    this.minioClient.setBucketPolicy(
      projectId,
      JSON.stringify(this.getPolicy(projectId)),
      function (err) {
        if (err) {
          console.error('Bucket policy skipped', err);
          return;
        }

        console.log('Bucket policy set');
      })

    return this.getMinioEndpoint() + projectId + '/' + filename
  }

  async putFileInMinio(bucketName:string,fileName:string,fileBuffer:string|Buffer|fs.ReadStream,metadata?:UploadedObjectInfo){
   await this.minioClient.putObject(bucketName,fileName,fileBuffer,{...metadata ?? {},'Content-Type':`${this.getContentType(fileName)}`})
    this.minioClient.setBucketPolicy(
      bucketName,
      JSON.stringify(this.getPolicy(bucketName)),
      function (err) {
        if (err) {
          console.error('Bucket policy skipped', err);
          return;
        }

        console.log('Bucket policy set');
      })
  }


  async uploadImage(file: BufferedFile, baseBucket: string,tempFileName:string) {
    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading picture (.png, .jpg)', HttpStatus.BAD_REQUEST)
    }
    await this.createBucketIfNotExists(baseBucket)
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    if(ext.includes('jpeg')){
      ext = '.jpg'
    }
    const filename = tempFileName + ext
    const fileBuffer = file.buffer;
    await this.putFileInMinio(baseBucket,filename,fileBuffer)


      return this.getMinioEndpoint() + baseBucket + filename
  }


  async uploadZipProject(file:Express.Multer.File | undefined,projectId:string){
    if(!file || !(file.mimetype?.includes('zip') || file.originalname?.endsWith('.zip'))) {
      const elements = await this.getObjectFromMinioIfExists(projectId,'')
      if(!elements.length) return null
      return this.createMinioUrls(
        (await this.getStreamFromListObject(projectId, '')).map((o) => o.name).filter(Boolean) as string[],
        projectId,
      )
    }
    this.assertProjectBucketName(projectId)
    const { extractionPath, fileNames } = await this.extractZip(file,projectId);
    const responseUrls = this.createMinioUrls(fileNames,projectId)
    await this.uploadFilesToMinio(extractionPath,projectId);
    await this.deleteTempDirectory(projectId)
    return responseUrls
  }



  async findAndModifyHTML(htmlFilePath: string, minioUrls: {
    dataUrl: string;
    frameworkUrl: string;
    wasmUrl: string;
    loaderUrl: string;
    assetsUrl: string
    iconUrl:string,
    bridgeUrl:string
  },): Promise<string> {


    try {
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
      // htmlContent.replace(/unityLoader.src = '[^']+'/g,`unityLoader.src = '${serverAddress}/NestMinio/download/${fileName}.loader.js`)

      // Найдем индекс вызова createUnityInstance
      const createUnityIndex = htmlContent.indexOf('createUnityInstance(');
      const srcLoaderIndex = htmlContent.indexOf('unityLoader.src')
      const headClosingIndex = htmlContent.indexOf('</head>');
      const styleCode = !minioUrls.bridgeUrl.includes('.js') ? `
        <style>
            body {
                width: 100vw !important;
                height: 100vh !important;
                padding: 0px !important;
                margin: 0px !important;
            }
            #unity-canvas {
                width: 100% !important;
                height: 100% !important;
            }
        </style>
    ` : '';
      const srcUrl = srcLoaderIndex === -1 ? `${minioUrls.loaderUrl}` : `'${minioUrls.loaderUrl}'`
      // Вставим нужный код перед вызовом createUnityInstance
      const modifiedHtmlContent =

        htmlContent.slice(0,headClosingIndex) + styleCode + htmlContent.slice(headClosingIndex, createUnityIndex).replace('./instant-games-bridge.js',`${minioUrls.bridgeUrl}`)
          .replace(/["'].*?loader\.js.*?["']/g,srcUrl) +
        `const dataUrlResponse = '${minioUrls.dataUrl}';
        const frameworkUrlResponse = '${minioUrls.frameworkUrl}';
        const codeUrlResponse = '${minioUrls.wasmUrl}';
        const streamingUrlResponse = '${minioUrls.assetsUrl}';

 

        const dataUrl = dataUrlResponse;
        const frameworkUrl = frameworkUrlResponse;
        const streamingAssetsUrl = streamingUrlResponse;
        const codeUrl = codeUrlResponse;\n` +
        'var unityInstance = '
        +
        htmlContent.slice(createUnityIndex).replace(/dataUrl: ['"]([^'"]+)['"]/g, 'dataUrl')
          .replace(/frameworkUrl: ['"]([^'"]+)['"]/g, 'frameworkUrl')
          .replace(/streamingAssetsUrl: '['"]([^'"]+)['"]/g, 'streamingAssetsUrl')
          .replace(/codeUrl: ['"]([^'"]+)['"]/g, 'codeUrl');

      // Сохраним измененный HTML файл
      const modifiedHtmlFilePath = path.join(
        path.dirname(htmlFilePath),
        'index.html',
      );
      fs.writeFileSync(modifiedHtmlFilePath, modifiedHtmlContent);

      return modifiedHtmlFilePath;
    } catch (error) {
      throw new Error(`Error modifying HTML file: ${error.message}`);
    }
  }

  async extractZip(file: Express.Multer.File,dirUuid:string): Promise<{ extractionPath: string; fileNames: string[] }> {

    const tempDir = path.join(__dirname, '..', 'temp');
    const extractionPath = path.join(tempDir, dirUuid);
    const nameFilesArray:string[] = []
    if (!fs.existsSync(tempDir)) {
      await fs.promises.mkdir(tempDir);
    }

    await fs.promises.mkdir(extractionPath, { recursive: true });

    const tempFilePath = path.join(tempDir, `${dirUuid}.zip`);
    await fs.promises.writeFile(tempFilePath, file.buffer);
    const regex = /\s+/g;

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(tempFilePath)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
          entry.path = entry.path.replace(regex, '');
          const fileName = path.basename(entry.path);
          const normalizedPath = entry.path.replace(/\\/g, '/');
          const streamingIdx = normalizedPath.indexOf('StreamingAssets/');
          const isStreamingAssets = streamingIdx !== -1;
          const type = entry.type;

          if (type === 'Directory') {
            entry.autodrain();
            return;
          }

          if (type === 'File') {
            nameFilesArray.push(isStreamingAssets ? 'StreamingAssets/' : fileName);
            const destPath = isStreamingAssets
              ? path.join(
                  extractionPath,
                  'StreamingAssets',
                  normalizedPath.slice(streamingIdx + 'StreamingAssets/'.length),
                )
              : path.join(extractionPath, fileName);

            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            entry
              .pipe(fs.createWriteStream(destPath))
              .on('error', reject);
            return;
          }

          entry.autodrain();
        })
        .on('close', () => resolve())
        .on('error', (err) => reject(err));
    });

    fs.unlinkSync(tempFilePath);

    return { extractionPath, fileNames:nameFilesArray };

  }
  async deleteTempDirectory(dirUuid:string){
    const tempFolderPath = path.join(__dirname, '..', 'temp', dirUuid);
    await fs.promises.rm(tempFolderPath, { recursive: true, force: true });
  }


  async uploadFilesToMinio(extractionPath: string,bucketName:string) {
    // Загрузка файлов в MinIO
    try {
      await this.createBucketIfNotExists(bucketName)
      // this.minioClient.setBucketPolicy(
      //   bucketName,
      //   JSON.stringify(this.getPolicy(bucketName)),
      //   function (err) {
      //     if (err) throw err;
      //
      //     console.log('Bucket policy set');
      //   },
      // );


      const uploadFileRecursively = async (currentPath: string, basePath: string) => {
        const files = await fs.promises.readdir(currentPath);
        const uploadPromises = files.map(async (file) => {
          const filePath = path.join(currentPath, file);
          const relativeFilePath = path.relative(basePath, filePath);
          const stat = await fs.promises.stat(filePath);

          if (stat.isDirectory()) {
            await uploadFileRecursively(filePath, basePath);
          } else {
            const fileStream = fs.createReadStream(filePath);

            await this.putFileInMinio(bucketName,`${relativeFilePath}`,fileStream)
            this.minioClient.setBucketPolicy(
              bucketName,
              JSON.stringify(this.getPolicy(bucketName)),
              function (err) {
                if (err) {
                  console.error('Bucket policy skipped', err);
                  return;
                }

                console.log('Bucket policy set');
              })
            return `${bucketName}/${relativeFilePath}`;
          }
        });

        return Promise.all(uploadPromises);
      };
      return uploadFileRecursively(extractionPath, extractionPath);
    }
    catch (e){
      console.log('Ошибка в minio:' + e);
    }

  }

  private getCorrectMimeType(){

  }

  private getPolicy(bucketName:string){
    return  {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: '*',
          },
          Action: [
            's3:ListBucketMultipartUploads',
            's3:GetBucketLocation',
            's3:ListBucket',
          ],
          Resource: [`arn:aws:s3:::${bucketName}`],
        },
        {
          Effect: 'Allow',
          Principal: {
            AWS: '*',
          },
          Action: [
            // 's3:PutObject',
            's3:AbortMultipartUpload',
            's3:GetObject',
            's3:ListMultipartUploadParts',
          ],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    };

  }
}
