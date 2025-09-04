import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { CheckAuth, Login, Logout, Register } from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post('/register', Register);

// Login
router.post('/login', Login);

router.post('/logout', Logout);


router.get('/check-auth', verifyToken, CheckAuth);

export default router;