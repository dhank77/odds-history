import cron from 'node-cron';
import logger from '../utils/logger';

class OddsHistoryService {
  private cronJob: cron.ScheduledTask | null = null;

  async saveOddsSnapshot(): Promise<void> {
    throw new Error('Not implemented');
  }

  initCronJob(): void {
    logger.info('Cron job not initialized');
  }

  stopCronJob(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      logger.info('Odds history cron job stopped');
    }
  }
}

export default new OddsHistoryService();
