import { UseMutationOptions, useMutation, useQueryClient } from "react-query";


const useLogout = (options?: Omit<UseMutationOptions<void, unknown, void, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async () => {
    localStorage.removeItem("accessToken");

    queryClient.refetchQueries("authState");
  }, options);
}

export default useLogout;
