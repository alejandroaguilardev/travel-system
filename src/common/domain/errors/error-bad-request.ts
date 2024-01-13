import { ErrorDomain } from './error-domain';

export class ErrorBadRequest extends ErrorDomain {
  constructor(readonly message: string = '') {
    super(message, 400, ErrorDomain.error.INVALID_ARGUMENT);
  }
}
