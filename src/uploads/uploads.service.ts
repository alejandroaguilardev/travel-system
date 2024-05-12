import { Injectable } from '@nestjs/common';
import { LaravelApiAdapter } from '../common/infrastructure/services/mail-api-adapter.service';
import { FormData } from "formdata-node"

@Injectable()
export class UploadsService {
  constructor(private readonly laravelApiAdapter: LaravelApiAdapter) { }

  async getUploadImage(
    name: string,
    type: string,
    route: string,
  ): Promise<any> {
    const response = await this.laravelApiAdapter.get(
      `/upload-image/${name}/${route}`,
      {
        responseType: type === 'arraybuffer' ? 'arraybuffer' : 'stream',
      },
    );
    const contentType = response.headers?.['content-type'];

    return {
      data: response.data,
      contentType,
    };
  }

  async getUploadFile(name: string): Promise<any> {
    const response = await this.laravelApiAdapter.get(`/upload-file/${name}`, {
      responseType: 'stream',
    });
    const contentType = response.headers?.['content-type'];
    return {
      data: response.data,
      contentType,
    };
  }

  async uploadImage(
    name: string,
    file: Express.Multer.File,
    type: string,
    route: string,
  ) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const { data } = await this.laravelApiAdapter.post<{ name: string }>(
      `/upload-image/${name}/${route}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: process.env.API_MAIL_KEY,
        },
      },
    );
    const url = `${data.name}`;
    return { url };
  }

  async uploadFile(name: string, file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const { data } = await this.laravelApiAdapter.post<{ name: string }>(
      `/upload-file/${name}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: process.env.API_MAIL_KEY,
        },
      },
    );
    const url = `${data.name}`;
    return { url };
  }
}
