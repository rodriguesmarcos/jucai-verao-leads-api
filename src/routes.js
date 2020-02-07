import { Router } from 'express';

import LeadController from './app/controllers/LeadController';
import RewardController from './app/controllers/RewardController';

const routes = Router();

routes.post('/leads', LeadController.store);

routes.post('/rewards', RewardController.store);

export default routes;
