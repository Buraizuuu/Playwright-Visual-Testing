export function validateEnv(): string[] {
  const required = ["BASE_URL", "MY_USERNAME", "MY_PASSWORD", "API_KEY"];
  const missing: string[] = [];

  required.forEach((key) => {
    const value = process.env[key];

    if (!value || value.trim() === "") {
      console.log(`❌ Missing required env: ${key}`);
      missing.push(key);
    }
  });

  return missing;
}