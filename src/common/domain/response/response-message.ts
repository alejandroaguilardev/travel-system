import { ResponseSuccess } from './response-success';

export enum MessageDefault {
  SUCCESSFULLY_CREATED = 'Se registró {{elemento}} exitosamente',
  SUCCESSFULLY_UPDATED = 'Se actualizó {{elemento}} exitosamente',
  SUCCESSFULLY_DELETED = 'Se elimino  {{elemento}} exitosamente',
}

export class ResponseMessage {
  static createSuccessResponse(message: string): ResponseSuccess {
    return {
      message,
    };
  }

  static createDefaultMessage(message: MessageDefault): ResponseSuccess {
    return {
      message,
    };
  }
}
