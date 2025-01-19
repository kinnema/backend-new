import "dotenv/config";
import fastify from "fastify";
import path from "path";
import { initModules } from "./core/main/init_modules";
import DizipalProvider from "./providers/dizipal";
import { providerRegistry } from "./providers/provider.registry";

export const BASE_PATH = path.join(__dirname);

const app = fastify({
  logger: true,
});

initModules(app);

providerRegistry.registerProvider(new DizipalProvider());

const start = async () => {
  try {
    await app.ready();
    await app.listen({
      host: "0.0.0.0",
      port: 8000,
    });
    app.log.info("Server running at http://localhost:8000/");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
