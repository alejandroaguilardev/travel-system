import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/upload-image.dto';
import { UploadsService } from './uploads.service';
import { Response } from 'express';
import { DocsUploadImage } from './docs';
import { Auth } from '../auth/infrastructure/decorator';
import { DocsUploadFile } from './docs/upload-file.docs';
import { DocsGetImage } from './docs/upload-get-image.docs';
import { DocsGetFile } from './docs/upload-get-file.docs';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/image/:routeType')
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  @DocsUploadImage()
  uploadImage(
    @Body() { name }: UploadImageDto,
    @Param('routeType') routeType: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2201897 }),
          new FileTypeValidator({
            fileType: /image\/\w+/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadsService.uploadImage(name, file, routeType);
  }

  @Post('/file')
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  @DocsUploadFile()
  uploadFile(
    @Body() { name }: UploadImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2201897 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadsService.uploadFile(name, file);
  }

  @Get('/image/:name/:type/:routeType')
  @DocsGetImage()
  async getImage(
    @Param('name') name: string,
    @Param('type') type: string,
    @Param('routeType') routeType: string,
    @Res() res: Response,
  ) {
    const { data, contentType } = await this.uploadsService.getUploadImage(
      name,
      type,
      routeType,
    );
    if (type === 'arraybuffer') {
      const buffer = Buffer.from(data);
      const imageBase64 = buffer.toString('base64');
      const dataUrl = `data:${contentType};base64,${imageBase64}`;
      return res.send(dataUrl);
    }
    data.pipe(res);
    res.header('Access-Control-Expose-Headers', 'name');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('name', name);
    return data;
  }

  @Get('/file/:name')
  @Auth()
  @DocsGetFile()
  async getFile(@Param('name') name: string, @Res() res: Response) {
    const { data, contentType } = await this.uploadsService.getUploadFile(name);
    data.pipe(res);
    res.header('Access-Control-Expose-Headers', 'name');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('name', name);
    return data;
  }
}
