import { logger } from "../utils/logger";

async function globalSetup(): Promise<void> {
  logger.info("════════════════════════════════════════════════");
  logger.info("SUITE START");
  logger.info(`Timestamp : ${new Date().toISOString()}`);
  logger.info("════════════════════════════════════════════════");
}

export default globalSetup;
