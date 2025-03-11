import { Router } from 'express';
import v1Routes from './v1/index';


const router = Router();

// Mount versioned routes
router.use('/api/v1', v1Routes);

export default router;
