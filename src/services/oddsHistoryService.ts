import cron from 'node-cron';
import logger from '../utils/logger';
import oddsHistoryRepository from '../database/repositories/oddsHistoryRepository';

class OddsHistoryService {
  private cronJob: cron.ScheduledTask | null = null;

  async saveOddsSnapshot(): Promise<void> {
    try {
      logger.info('Running odds snapshot job...');

      // In a real implementation, this would fetch from an external API
      // For this demo, we'll create mock snapshots
      const mockSnapshots = this.generateMockSnapshots();

      if (mockSnapshots.length > 0) {
        await oddsHistoryRepository.saveSnapshots(mockSnapshots);
        logger.info(`Saved ${mockSnapshots.length} odds snapshots`);
      }
    } catch (error) {
      logger.error('Error saving odds snapshot', { error });
      throw error;
    }
  }

  private generateMockSnapshots() {
    // Mock data - in production this would come from external API
    const games = ['nba_lakers_vs_celtics', 'nfl_chiefs_vs_bills', 'mlb_yankees_vs_redsox'];
    const bookmakers = ['draftkings', 'fanduel', 'betmgm'];
    const snapshots: any[] = [];

    games.forEach(game_id => {
      bookmakers.forEach(bookmaker_key => {
        snapshots.push({
          game_id,
          bookmaker_key,
          market_key: 'h2h',
          odds_data: JSON.stringify({
            home: (Math.random() * 2 + 1).toFixed(2),
            away: (Math.random() * 2 + 1).toFixed(2),
          }),
          snapshot_time: new Date(),
        });
      });
    });

    return snapshots;
  }

  initCronJob(): void {
    if (this.cronJob) {
      logger.info('Cron job already initialized');
      return;
    }

    // Run every 10 minutes: '*/10 * * * *'
    this.cronJob = cron.schedule('*/10 * * * *', async () => {
      try {
        await this.saveOddsSnapshot();
      } catch (error) {
        logger.error('Cron job error', { error });
      }
    });

    logger.info('Odds history cron job initialized (runs every 10 minutes)');
  }

  stopCronJob(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      logger.info('Odds history cron job stopped');
    }
  }
}

export default new OddsHistoryService();
