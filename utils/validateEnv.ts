export function validateEnv(): string[] {
  const required = ["BASE_URL", "MY_USERNAME", "MY_PASSWORD"];

  return required.filter((key) => {
    const missing = !process.env[key]?.trim();
    if (missing) console.error(`❌ Missing required env: ${key}`);
    return missing;
  });
}
