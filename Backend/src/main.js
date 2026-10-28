import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

// Gunakan port dari environment variable, atau 3000 jika dijalankan lokal
const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
  logger.info(`App started on port ${PORT}`);
});
