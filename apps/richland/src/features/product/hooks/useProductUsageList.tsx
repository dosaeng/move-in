import { httpClient } from '@/common/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { ProductUsage } from '../product';
import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { useMemo } from 'react';

export const getProductUsageListEndpoint = '/api/product/usage';

const useProductUsageList = ({ filter }: { filter?: string } = {}) => {
  const response = useQuery({
    queryKey: [getProductUsageListEndpoint],
    queryFn: async () => {
      const response = await httpClient.get<ProductUsage[]>(
        getProductUsageListEndpoint
      );

      return response;
    },
  });

  return {
    ...response,
    data: useMemo(() => {
      return (response.data ?? []).filter((item) =>
        filter && filter.length > 0 ? item.name.includes(filter) : true
      );
    }, [response.data, filter]),
  };
};

export default useProductUsageList;

defineMock((mock) => {
  return [
    mock.get(getProductUsageListEndpoint, () => {
      return HttpResponse.json(
        Array.from({ length: 100 }, (_, i) => ({
          id: i,
          name: `용도 ${i}`,
        }))
      );
    }),
  ];
});
