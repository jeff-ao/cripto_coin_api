import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController'
const router = Router();

router.post('/', (req: Request, res: Response) => {
  userController.signup(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  userController.login(req, res);
});

export default router;
