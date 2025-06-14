import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};