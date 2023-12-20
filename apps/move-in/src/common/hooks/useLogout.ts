import { UseMutationOptions, useMutation } from "react-query";
import useAuthState from "./useAuthState";


const useLogout = (options?: Omit<UseMutationOptions<void, unknown, void, unknown>, "mutationFn">) => {
  const { logout } = useAuthState();

  return useMutation(async () => {
    logout();
  }, options);
}

export default useLogout;
