import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation } from "react-query";

export interface SignUpRequestModel {
  email?: string;
  password?: string;
  name?: string;
  birthday?: string;
  phoneNumber?: string;
}

const signUpEndpoint = "/api/app-user";

const useSignUp = (options?: Omit<UseMutationOptions<void, unknown, SignUpRequestModel, unknown>, "mutationFn">) => {
  return useMutation(async (request: SignUpRequestModel) => {
    const response = await fetch(signUpEndpoint, {
      method: "POST",
      body: JSON.stringify({
        email: request.email,
        password: request.password,
        name: request.name,
        gender: request.birthday,
        phone_number: request.phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }
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

