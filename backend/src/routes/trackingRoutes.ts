import { Router, Request, Response } from 'express';
import * as trackingController from '../controllers/trackingController';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  trackingController.createTracking(req, res);
});

export default router;
