import { Pool } from 'pg';

export type PgWaitConnectionOptions = {
  pool: Pool;
  query?: string;
  retry?: number;
  debug?: boolean;
};

export class PgWaitConnection {
  private pool: Pool;
  private query: string;
  private retry: number;
  private debug: boolean;

  constructor({
    pool,
    query = 'SELECT NOW()',
    retry = 10,
    debug = false,
  }: PgWaitConnectionOptions) {
    this.query = query;
    this.retry = retry;
    this.pool = pool;
    this.debug = debug;
  }

  private async delay(lag = 1000) {
    return new Promise((resolve) => setTimeout(() => resolve(), lag));
  }

  public async check(interation = 0) {
    try {
      if (interation < this.retry) {
        await this.pool.query(this.query);
      }

      await this.pool.end();
    } catch (error) {
      const nextIndex = interation + 1;
      const lag = nextIndex * 2 * 1000;

      if (this.debug) {
        console.log('Timeout:', lag, 'ms');
      }

      await this.delay(lag);
      await this.check(nextIndex);
    }
  }
}
