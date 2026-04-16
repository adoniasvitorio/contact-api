import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
  }
}