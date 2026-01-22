import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api';
import oddsHistoryService from '../services/oddsHistoryService';
import oddsHistoryRepository from '../database/repositories/oddsHistoryRepository';

class OddsHistoryController {
  async getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { gameId } = req.params;
      const { bookmaker_key } = req.query;

      const options: any = {};
      if (bookmaker_key) {
        options.bookmaker_key = bookmaker_key as string;
      }

      const history = await oddsHistoryRepository.getGameHistory(gameId, options);

      res.status(200).json({
        success: true,
        data: history,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  }

  async triggerIngestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await oddsHistoryService.saveOddsSnapshot();

      res.status(200).json({
        success: true,
        message: 'Odds snapshot ingestion triggered successfully',
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  }
}

export default new OddsHistoryController();
