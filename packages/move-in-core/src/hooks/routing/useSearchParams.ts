import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useSearchParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export function isValidSearchParam(search: string | null | undefined, { requiredKey }: {
  requiredKey: string[]
}) {
  if (search == null) return false;

  const searchParams = new URLSearchParams(search);

  if (requiredKey.length === 0) return true;

  return requiredKey.every((searchParam) => {
    return !!searchParams.get(searchParam);
  });
}
