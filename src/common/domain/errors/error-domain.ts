export class ErrorDomain extends Error {
  static error = {
    NOT_FOUND: 'not_found',
    INVALID_ARGUMENT: 'invalid_argument',
    DUPLICATE: 'duplicate',
    BAD_REQUEST: 'bad_request',
    NOT_AUTHORIZATION: 'not_authorization',
  };

  constructor(
    readonly message: string,
    readonly code: number,
    readonly error: string,
  ) {
    super();
  }

  getStatus() {
    return this.code;
  }

  getResponse() {
    return {
      message: this.message,
      error: this.error,
    };
  }
}
