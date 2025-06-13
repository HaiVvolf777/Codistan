import express from 'express';
import * as userController from '../controllers/user.controller';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', cacheMiddleware(30000), userController.getUsers); // 30 second cache
router.get('/:id', cacheMiddleware(30000), userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;