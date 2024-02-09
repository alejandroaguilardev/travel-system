import { ErrorDomain } from './error-domain';

export class ErrorNotAuthorization extends ErrorDomain {
  constructor(readonly message: string = '') {
    super(message, 401, ErrorDomain.error.NOT_AUTHORIZATION);
  }
}
