import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Redirect,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FolderEnum } from '../enums/folder.enum';

@ApiTags('File')
@Controller('api/files')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post(':folder/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiParam({
    name: 'folder',
    enum: FolderEnum,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @Param('folder') folder: FolderEnum,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(folder);
    return this.fileService.uploadFile(folder, file);
  }

  @Get(':folder/:fileName')
  @ApiProduces('image/jpeg')
  @ApiParam({
    name: 'folder',
    enum: FolderEnum,
  })
  @Redirect()
  async getFile(
    @Param('folder') folder: FolderEnum,
    @Param('fileName') fileName: string,
  ) {
    return this.fileService.getFile(folder, fileName);
  }
}
