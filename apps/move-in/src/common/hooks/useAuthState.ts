import { useQuery } from "react-query";

export enum AuthState {
  unauthorized,
  authorized,
}

const useAuthState = () => {
  const { data, isLoading, refetch } = useQuery("authState", async () => {
    return localStorage.getItem("isAuthenticated") ? AuthState.authorized : AuthState.unauthorized;
  });

  return {
    data,
    isLoading,
    login() {
      localStorage.setItem("isAuthenticated", "true");
 
      refetch();
    },
    logout() {
      localStorage.removeItem("isAuthenticated");

      refetch();
    }
  }
}

export default useAuthState;
