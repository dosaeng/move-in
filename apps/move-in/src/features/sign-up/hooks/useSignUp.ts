import { defineMock } from "@/common/utils/defineMock";
import { httpClient } from "@/common/utils/httpClient";
import { UseMutationOptions, useMutation } from "react-query";

export interface SignUpRequestModel {
  email?: string;
  password?: string;
  name?: string;
  birthday?: string;
  phoneNumber?: string;
}

const signUpEndpoint = "/app-user";

const useSignUp = (options?: Omit<UseMutationOptions<void, unknown, SignUpRequestModel, unknown>, "mutationFn">) => {
  return useMutation(async (request: SignUpRequestModel) => {
    await httpClient.post(signUpEndpoint, {
      body: {
        email: request.email,
        password: request.password,
        name: request.name,
        gender: request.birthday,
        phone_number: request.phoneNumber,
      },
    });
  }, options);
}

export default useSignUp;

defineMock((mock) => {
  mock.post(signUpEndpoint, async (_, request) => {
    console.debug("Mocked sign up request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  });
});

