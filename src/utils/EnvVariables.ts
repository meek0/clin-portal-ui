export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL
    ENV: process.env.NODE_ENV,

    ARRANGER_API: process.env.REACT_APP_ARRANGER_API,
    ARRANGER_PROJECT_ID: process.env.REACT_APP_ARRANGER_PROJECT_ID,
    FHIR_API: process.env.REACT_APP_FHIR_SERVICE_URL,
  };

  static configFor(key: string): string {
    return EnvironmentVariables.vars[key] || '';
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_${key}`] as any) || defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_FT_${key}`] as any) || defaultValue;
