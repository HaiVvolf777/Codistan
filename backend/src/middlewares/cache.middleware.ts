import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getCache, setCache, generateCacheKey } from '../services/cache.service';

export const cacheMiddleware = (ttl?: number): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = generateCacheKey(req);
      const cachedData = getCache(cacheKey);
      
      if (cachedData) {
        res.json({
          success: true,
           ...JSON.parse(cachedData),
          fromCache: true,
          timestamp: new Date().toISOString()
        });
        return;
      }

      const originalSend = res.send;
      res.send = function (body) {
        if (res.statusCode === 200) {
          setCache(cacheKey, body, ttl);
        }
        return originalSend.call(this, body);
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
