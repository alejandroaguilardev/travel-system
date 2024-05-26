import { Injectable } from '@nestjs/common';
import { LaravelApiAdapter } from '../common/infrastructure/services/laravel-adapter.service';
import { FormData } from 'formdata-node';

@Injectable()
export class UploadsService {
  constructor(private readonly laravelApiAdapter: LaravelApiAdapter) {}

  async getUploadImage(
    name: string,
    type: string,
    routeType: string,
  ): Promise<any> {
    const response = await this.laravelApiAdapter.get(
      `/upload-image/${routeType}/${name}`,
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
    fileMulter: Express.Multer.File,
    routeType: string,
  ) {
    const formData = new FormData();
    const file = new File([fileMulter.buffer], fileMulter.originalname);
    formData.set('file', file);

    const { data } = await this.laravelApiAdapter.post<{ name: string }>(
      `/upload-image/${routeType}/${name}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: process.env.API_LARAVEL_KEY,
        },
      },
    );
    const url = `${data.name}`;
    return { url };
  }

  async uploadFile(name: string, fileMulter: Express.Multer.File) {
    const formData = new FormData();
    const file = new File([fileMulter.buffer], fileMulter.originalname);

    formData.set('file', file);

    const { data } = await this.laravelApiAdapter.post<{ name: string }>(
      `/upload-file/${name}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: process.env.API_LARAVEL_KEY,
        },
      },
    );
    const url = `${data.name}`;
    return { url };
  }
}
