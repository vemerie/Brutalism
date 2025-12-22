import type { HttpStatusCode } from "axios";
import type { Error } from "./error";
import type { Success } from "./success";

export type ResponseStatus = "success" | "error" | "failure";

type BaseResponse = {
  code?: HttpStatusCode;
  status: ResponseStatus;
};

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  pagination: IPaginationMetaData;
}

export interface IPaginationMetaData  {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}





export type FetchResponse<T = object> =
  | FetchResponseSuccess<T>
  | FetchResponseError;

export type FetchResponseSuccess<T = object> = BaseResponse & Success<T>;

export type FetchResponseError = BaseResponse & Error;
