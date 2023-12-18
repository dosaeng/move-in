import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";

export interface LoginRequestModel {
  email?: string;
  password?: string;
}

const loginEndpoint = "/api/login";

const useLogin = (options?: Omit<UseMutationOptions<void, unknown, LoginRequestModel, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (request: LoginRequestModel) => {
    const response = await fetch(loginEndpoint, {
      method: "POST",
      body: JSON.stringify({
        email: request.email,
        password: request.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();

    localStorage.setItem("accessToken", data.access_token);

    queryClient.refetchQueries("authState");
  }, options);
}

export default useLogin;

defineMock((mock) => {
  mock.post(loginEndpoint, async (_, request) => {
    console.debug("Mocked login request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({
      access_token: "mocked-access-token",
    }), {
      status: 200,
    })
  });
});

