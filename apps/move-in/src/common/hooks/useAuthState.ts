import { useQuery } from "react-query";

export enum AuthState {
  unauthorized,
  authorized,
}

const useAuthState = () => {
  return useQuery("authState", async () => {
    return localStorage.getItem("accessToken") ? AuthState.authorized : AuthState.unauthorized;
  });
}

export default useAuthState;
