import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      keyFilename: 'src/core/file/firebase-service-account.json', // Đường dẫn đến file JSON chứa khóa riêng
      projectId: 'nestjs-demo-b4e17', // ID của project Firebase
    });
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const bucketName = 'nestjs-demo-b4e17.appspot.com'; // Tên của bucket trong Firebase Storage
  //   const uploadedFileUrl = await this.firebaseService.uploadFile(
  //     file,
  //     bucketName,
  //   );
  //   // Xử lý logic dựa trên URL của file đã được upload lên Firebase
  //   return {
  //     fileUrl: uploadedFileUrl,
  //   };
  // }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<string> {
    const bucket = this.storage.bucket(bucketName);
    const filename = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(filename);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => reject(error));
      stream.on('finish', () =>
        resolve(`https://storage.googleapis.com/${bucketName}/${filename}`),
      );
      stream.end(file.buffer);
    });
  }
}
