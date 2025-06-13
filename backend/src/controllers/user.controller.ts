import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { UserSchema } from '../models/user.model';
import logger from '../utils/logger';
import { getCache, setCache, clearCache, generateCacheKey } from '../services/cache.service';

// Helper function for consistent success responses
const successResponse = (res: Response, data: any, statusCode: number = 200): void => {
  res.status(statusCode).json({
    success: true,
    data,
    timestamp: new Date().toISOString()
  });
};


// Helper function for consistent error responses
const errorResponse = (res: Response, message: string, statusCode: number = 400, details?: any): void => {
  logger.error(`[${statusCode}] ${message}`, { details });
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      details,
      timestamp: new Date().toISOString()
    }
  });
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = UserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);
    
    clearCache(generateCacheKey({ method: 'GET', originalUrl: '/api/users' } as Request));
    successResponse(res, user, 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'EMAIL_EXISTS') {
        errorResponse(res, 'Email address is already in use', 409, {
          field: 'email',
          value: req.body.email,
          suggestion: 'Please use a different email address'
        });
      } else {
        errorResponse(res, 'Validation failed', 400, error.message);
      }
    } else {
      errorResponse(res, 'Internal server error', 500);
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = generateCacheKey(req);
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return successResponse(res, {
        ...cachedData,
        fromCache: true
      });
    }

    const page = Math.max(1, Number(req.query.page)) || 1;
    const limit = Math.min(Math.max(1, Number(req.query.limit)), 100) || 10;
    const sort = typeof req.query.sort === 'string' ? req.query.sort : 'createdAt';

    const allowedSortFields = ['createdAt', 'name', 'email'];
    if (!allowedSortFields.includes(sort)) {
      errorResponse(res, 'Invalid sort field', 400);
      return;
    }

    const result = await userService.getUsers(page, limit, sort);
    const responseData = {
      users: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    };
    
    setCache(cacheKey, responseData, 30000); // Cache for 30 seconds
    successResponse(res, responseData);
  } catch (error) {
    errorResponse(res, 'Failed to fetch users', 500);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = generateCacheKey(req);
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return successResponse(res, {
        ...cachedData,
        fromCache: true
      });
    }

    if (!req.params.id || req.params.id.length !== 24) {
      errorResponse(res, 'Invalid user ID format', 400);
      return;
    }

    const user = await userService.getUserById(req.params.id);
    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    setCache(cacheKey, user, 30000); // Cache for 30 seconds
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, 'Failed to fetch user', 500);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id || req.params.id.length !== 24) {
      errorResponse(res, 'Invalid user ID format', 400);
      return;
    }

    const validatedData = UserSchema.partial().parse(req.body);
    if (Object.keys(validatedData).length === 0) {
      errorResponse(res, 'No valid fields provided for update', 400);
      return;
    }

    const updatedUser = await userService.updateUser(req.params.id, validatedData);
    if (!updatedUser) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    // Clear relevant caches
    clearCache(generateCacheKey({ method: 'GET', originalUrl: '/api/users' } as Request));
    clearCache(generateCacheKey({ 
      method: 'GET', 
      originalUrl: `/api/users/${req.params.id}` 
    } as Request));
    
    successResponse(res, updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, 'Validation failed', 400, error.message);
    } else {
      errorResponse(res, 'Failed to update user', 500);
    }
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id || req.params.id.length !== 24) {
      errorResponse(res, 'Invalid user ID format', 400);
      return;
    }

    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    // Clear relevant caches
    clearCache(generateCacheKey({ method: 'GET', originalUrl: '/api/users' } as Request));
    clearCache(generateCacheKey({ 
      method: 'GET', 
      originalUrl: `/api/users/${req.params.id}` 
    } as Request));
    
    successResponse(res, {
      message: 'User deleted successfully',
      userId: req.params.id
    });
  } catch (error) {
    errorResponse(res, 'Failed to delete user', 500);
  }
};