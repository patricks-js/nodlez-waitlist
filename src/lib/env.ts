import { config } from "dotenv";
import { z } from "zod/v4";

config({
  path: ".env.local",
});

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://"),
});

export const env = envSchema.parse(process.env);
