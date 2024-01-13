import { ErrorDomain } from './error-domain';

export class ErrorNotFound extends ErrorDomain {
  constructor(readonly message: string = '') {
    super(message, 404, ErrorDomain.error.NOT_FOUND);
  }

  static messageDefault(collection: string = 'elemento') {
    return `Lo siento, pero el ${collection} que intentas acceder no ha sido encontrado en la colección.`;
  }
}
