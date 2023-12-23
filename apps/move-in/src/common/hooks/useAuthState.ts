import { useQuery } from "react-query";

export enum AuthState {
  unauthorized,
  authorized,
}

const useAuthState = () => {
  const { data, isLoading, refetch } = useQuery("authState", async () => {
    return localStorage.getItem("accessToken") ? AuthState.authorized : AuthState.unauthorized;
  });

  return {
    data,
    isLoading,
    login(accessToken: string) {
      localStorage.setItem("accessToken", accessToken);
 
      refetch();
    },
    logout() {
      localStorage.removeItem("accessToken");

      refetch();
    }
  }
}

export default useAuthState;
