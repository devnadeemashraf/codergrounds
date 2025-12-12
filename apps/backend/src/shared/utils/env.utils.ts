export const getEnv = (key: string, fallback?: string): string => {
  const envVariable = process.env[key];
  if (!envVariable && fallback === undefined) {
    throw new Error(`Environment has a required variable missing - "${key}"`);
  }
  return envVariable || fallback!;
};

export const getEnvNumber = (key: string, fallback?: number): number => {
  const envVariable = process.env[key];
  if (!envVariable && fallback === undefined) {
    throw new Error(`Environment has a required variable missing - "${key}"`);
  }
  const value = envVariable ? parseInt(envVariable, 10) : fallback!;
  if (isNaN(value)) {
    throw new Error(`Environment variable "${key}" must be a number`);
  }
  return value;
};
