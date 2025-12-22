type ValidationError = string[];
export type ServerErrors = Record<string, ValidationError[]>;

export interface Error {
  message: string;
  url: string;
  errors?: ServerErrors;
  errorCode?: string;
}
