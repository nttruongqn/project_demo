import { Module, Global } from '@nestjs/common';
import { FileController } from './controllers/file.controller';
import { FirebaseService } from './services/filebase.service';
import { FileService } from './services/file.service';

@Global()
@Module({
  controllers: [FileController],
  providers: [FirebaseService, FileService],
  exports: [FileService],
})
export class FileModule {}
