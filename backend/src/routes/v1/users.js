import express from 'express';

import { userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { signUp } from '../../controllers/userController.js';

const router = express.Router();

// router.get('/',(req,res)=>{
//     return res.status(200).json({message: 'GET /users'});
// });
router.post('/signup', validate(userSignUpSchema), signUp);

export default router;
