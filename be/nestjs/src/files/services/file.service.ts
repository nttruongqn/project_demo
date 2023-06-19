import { HttpStatus, Injectable } from '@nestjs/common';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

@Injectable()
export class FileService {
  // async uploadImageFile(file: Express.Multer.File) {
  //   const storage = getStorage();
  //   const fileName = `${Date.now()}_${file.originalname}`;
  //   const folderPath = 'test';

  //   const storageRef = ref(storage, `${folderPath}/${fileName}`);

  //   const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
  //     contentType: 'image/jpeg',
  //   });

  //   const snapshot = await uploadTask;
  //   const downloadURL = await getDownloadURL(snapshot.ref);

  //   return {
  //     fileName,
  //     mimeType: 'image/jpeg',
  //     downloadURL,
  //   };
  // }

  async getFile(folderPath: string, fileName: string) {
    const storage = getStorage();
    const storageRef = ref(storage, `${folderPath}/${fileName}`);

    try {
      const downloadURL = await getDownloadURL(storageRef);
      return { url: downloadURL };
    } catch (error) {
      return { statusCode: HttpStatus.NOT_FOUND };
    }
  }

  async uploadFile(folderPath: string, file: Express.Multer.File) {
    const storage = getStorage();
    const fileName = `${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, `${folderPath}/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    });

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      fileName,
      mimeType: file.mimetype,
      downloadURL,
    };
  }
}
