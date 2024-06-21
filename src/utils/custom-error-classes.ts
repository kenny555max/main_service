export class CustomError extends Error {
  constructor(
    public message: string,
    public context?: any,
  ) {
    super(message);
  }
}

export class ClientError extends CustomError {
  constructor(message: string, context?: any) {
    super(message, context);
    this.name = 'ClientError';
  }
}

export class ServerError extends CustomError {
  constructor(message: string, context?: any) {
    super(message, context);
    this.name = 'ServerError';
  }
}
