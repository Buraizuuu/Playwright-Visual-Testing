import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnv(key: string): string | undefined {
  const value = process.env[key];
  return value && value.trim() !== "" ? value : undefined;
}

export const ENV = {
  BASE_URL: getEnv("BASE_URL"),
  USERNAME: getEnv("MY_USERNAME"),
  PASSWORD: getEnv("MY_PASSWORD"),
  API_KEY: getEnv("API_KEY"),
};