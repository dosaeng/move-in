import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation } from "react-query";
import { httpClient } from "../utils/httpClient";
import useAuthState from "./useAuthState";

export interface LoginRequestModel {
  email?: string;
  password?: string;
}

const loginEndpoint = "/login";

const useLogin = (options?: Omit<UseMutationOptions<void, unknown, LoginRequestModel, unknown>, "mutationFn">) => {
  const { login } = useAuthState();

  return useMutation(async (request: LoginRequestModel) => {
    await httpClient.post<LoginRequestModel, string>(loginEndpoint, {
      body: {
        email: request.email,
        password: request.password,
      },
      responseType: "text",
    });

    login();
  }, options);
}

export default useLogin;

defineMock((mock) => {
  mock.post(loginEndpoint, async (_, request) => {
    console.debug("Mocked login request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response("mocked-access-token",
      {
        status: 200,
      })
  });
});

