import { type Request, type Response, type NextFunction } from 'express'
import { AppError } from '../../domain/errors/app-error'
import { logger } from '../../shared/logger'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    logger.warn('Application error', {
      message: err.message,
      statusCode: err.statusCode,
      details: err.details,
    });

    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    })
  }

  logger.error('Unexpected error', {
    message: err.message,
    stack: err.stack,
  })

  return res.status(500).json({
    error: 'Internal Server Error',
  })
}