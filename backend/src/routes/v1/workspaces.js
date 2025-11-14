import express from 'express';


import { validate } from '../../validators/zodValidator.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createWorkspaceSchema } from '../../validators/workspaceSchema.js';
import { createWorspaceController } from '../../controllers/workspaceController.js';

const router = express.Router();


router.post('/',isAuthenticated, validate(createWorkspaceSchema),
createWorspaceController);

export default router;
