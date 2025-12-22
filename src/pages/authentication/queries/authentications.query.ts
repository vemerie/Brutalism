import { apiRequest } from "@/interceptors/axios";
import URIS from "@/uri";
import { useMutation } from "@tanstack/react-query";
import { generatePath } from "react-router";
import type { ILoginPayload, ILoginResponse } from "../interfaces/auth.interface";

export const bankAccountQueryKey = {
  BANK_ACCOUNTS_KEY: "bank.accounts",
  BANKS_LIST: "banks.list",
};


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (UserCredential: ILoginPayload) => {
      const response = await apiRequest<ILoginResponse>(
        generatePath(URIS.authentication.login),
        "POST",
        UserCredential
      );

      return response;
    },
  });
};
