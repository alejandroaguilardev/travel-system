import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpInterface } from '../../../common/application/services/http-service';

@Injectable()
export class LaravelApiAdapter implements HttpInterface {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({ baseURL: process.env.API_MAIL });
    axios.defaults.headers.common.Authorization = process.env.API_MAIL_KEY;
  }
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any>> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any>> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any>> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response;
  }

  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    const response = await this.axiosInstance.request<T>(config);
    return response;
  }
}
