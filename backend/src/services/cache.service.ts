import { Request } from 'express';

interface CacheItem {
  data: any;
  expiresAt: number;
}

const cacheStore = new Map<string, CacheItem>();
const DEFAULT_TTL = 30 * 1000; 

export const getCache = (key: string): any | null => {
  const item = cacheStore.get(key);
  if (!item) return null;

  // Check if cache has expired
  if (Date.now() > item.expiresAt) {
    cacheStore.delete(key);
    return null;
  }

  return item.data;
};

export const setCache = (key: string, data: any, ttl: number = DEFAULT_TTL): void => {
  cacheStore.set(key, {
    data,
    expiresAt: Date.now() + ttl
  });
};

export const clearCache = (key: string): void => {
  cacheStore.delete(key);
};

export const generateCacheKey = (req: Request): string => {
  // Create a unique key based on request method and path
  return `${req.method}:${req.originalUrl}`;
};