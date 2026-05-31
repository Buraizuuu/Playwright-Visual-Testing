import { logger } from "../utils/logger";

async function globalTeardown(): Promise<void> {
  logger.info("════════════════════════════════════════════════");
  logger.info("SUITE END");
  logger.info(`Timestamp : ${new Date().toISOString()}`);
  logger.info("════════════════════════════════════════════════");
}

export default globalTeardown;
