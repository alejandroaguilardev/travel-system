import { ErrorDomain } from './error-domain';

export class ErrorDuplicateElement extends ErrorDomain {
  constructor(readonly message: string = '') {
    super(message, 400, ErrorDomain.error.DUPLICATE);
  }

  static messageDefault(collection: string = 'elemento') {
    return `Lo siento, pero el ${collection} que intentas agregar ya existe en la colección. Por favor, verifica y asegúrate de que no haya duplicados.`;
  }
}
