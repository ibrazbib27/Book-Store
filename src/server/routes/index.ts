import * as express from 'express';


import apiRoute from './api/index';
import authRoute from './auth/index';

const router = express.Router();


router.use('/api', apiRoute);
router.use('/authRoute', authRoute);

export default router;