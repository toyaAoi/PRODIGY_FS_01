import express from 'express';
import { signup,login ,handleRefreshToken} from './controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', handleRefreshToken);


export default router;
