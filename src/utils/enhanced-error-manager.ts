import { Logger } from '@nestjs/common';
import { CustomError, ServerError } from './custom-error-classes';

export class ErrorManager {
  constructor(private readonly logger: Logger) {}

  handleError(service: string, error: CustomError): void {
    //console.log(error?.context);
    const errorMessage = `Error in ${service} service: ${error?.name} => ${error?.message}, ${error?.stack}`;
    const contextMessage = error?.context
      ? ` Context: ${safeStringify(error.context)}`
      : '';

    // Optionally, send the error to an external monitoring service
    // sendToMonitoringService(error);

    // Decide whether to rethrow the error or handle it gracefully
    if (error instanceof ServerError) {
      this.logger.error(`${errorMessage}${contextMessage}`);
      //console.log(error);
      //throw error; // Rethrow server errors
    } else {
      // Handle client errors or log them without interrupting the flow
      console.warn(`Handled non-critical error: ${error.message}`);
    }
  }

  private static instance: ErrorManager;

  static getInstance(logger: Logger): ErrorManager {
    if (!this.instance) {
      this.instance = new ErrorManager(logger);
    }
    return this.instance;
  }
}

export const ErrorHandler = ErrorManager.getInstance(
  new Logger('Server-Error-Handler'),
);

/**
 * Safely stringify an object, handling circular references.
 * @param obj - The object to stringify.
 * @returns {string} - The stringified object.
 */
function safeStringify(obj: any): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  });
}
