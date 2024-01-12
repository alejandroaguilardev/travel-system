export class DomainError extends Error {
  constructor(
    readonly message: string,
    readonly code: number = 400,
    readonly error = 'Bad Request',
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
