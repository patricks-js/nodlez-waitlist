import { config } from "dotenv";
import { z } from "zod/v4";

config({
  path: ".env.local",
});

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://"),
  RESEND_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
