import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import oddsHistoryService from '../services/oddsHistoryService';
import oddsHistoryRepository from '../database/repositories/oddsHistoryRepository';

class OddsHistoryController {
  async getHistory(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }

  async triggerIngestion(_req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }
}

export default new OddsHistoryController();
