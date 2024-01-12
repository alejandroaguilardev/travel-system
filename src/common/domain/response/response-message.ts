import { ResponseSuccess } from './response-success';

export enum MessageDefault {
  SUCCESSFULLY_CREATED = 'El elemento se creó con éxito',
  SUCCESSFULLY_UPDATED = 'El elemento se actualizó con éxito',
  SUCCESSFULLY_DELETED = 'El elemento se eliminó con éxito',
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
