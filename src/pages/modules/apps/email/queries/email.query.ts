import { apiRequest } from "@/interceptors/axios";
import URIS from "@/uri";
import { useQuery } from "@tanstack/react-query";
import type { EmailList, IEmailQueryParams } from "../interfaces/email.interface";
import type { IApiResponse } from "@/interfaces/http";

export const emailQueryKey = {
  EMAIL: "email.list",
};

export const useEmailsQuery = (params?: IEmailQueryParams) => {
  return useQuery({
    queryKey: [emailQueryKey.EMAIL, params],
    queryFn: async () => {
      const response = await apiRequest<IApiResponse<EmailList>>(
        URIS.modules.email.index,
        "GET",
        undefined,
        params
      );
      return response.data;
    },
  });
};
