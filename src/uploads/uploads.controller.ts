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

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/image/:type')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Body() { name }: UploadImageDto,
    @Param('type') type: string,
    @Param('route') route: string,
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
    return this.uploadsService.uploadImage(name, file, type, route);
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
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

  @Get('/image/:name/:type/:route')
  async getImage(
    @Param('name') name: string,
    @Param('type') type: string,
    @Param('route') route: string,
    @Res() res: Response,
  ) {
    const { data, contentType } = await this.uploadsService.getUploadImage(
      name,
      type,
      route,
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
