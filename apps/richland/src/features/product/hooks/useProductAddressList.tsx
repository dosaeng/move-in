import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import addressJson from '../assets/address.json';
import { ProductAddress } from '../product';
import {
  getProductAddressIdQuery,
  getProductAddressLevelForId,
} from '../utils/productAddressUtils';

export interface ProductAddressListParams {
  id?: string;
  level?: number | number[];
  name?: string;
  page?: number;
  size?: number;
}

export const getProductAddressListEndpoint = '/api/product/address';

const useProductAddressList = ({
  page,
  size,
  ...params
}: ProductAddressListParams = {}) => {
  return useInfiniteQuery<
    { totalCount: number; list: ProductAddress[] },
    Error,
    InfiniteData<{ totalCount: number; list: ProductAddress[] }, unknown>,
    QueryKey,
    {
      page: number;
      size: number;
    }
  >({
    queryKey: [getProductAddressListEndpoint, params],
    queryFn: async ({ pageParam }) => {
      const response = await httpClient.get<{
        totalCount: number;
        list: ProductAddress[];
      }>(getProductAddressListEndpoint, {
        // TODO. API 업데이트 하기
        params: {
          id: params.id,
          level: params.level,
          name: params.name,
          page: pageParam.page,
          size: pageParam.size,
        },
      });

      return response;
    },
    initialPageParam: {
      page: page ?? 1,
      size: size ?? 10,
    },
    getNextPageParam: (lastPage, __, lastPageParams) => {
      if (lastPage.list.length < lastPageParams.size) {
        return undefined;
      }

      return {
        page: lastPageParams.page + 1,
        size: lastPageParams.size,
      };
    },
  });
};

export default useProductAddressList;

defineMock((mock) => {
  return [
    mock.get(getProductAddressListEndpoint, ({ request }) => {
      return getMockProductAddressList(request.url);
    }),
  ];
});

export const getMockProductAddressList = (urlString: string) => {
  let data: ProductAddress[] = addressJson as ProductAddress[];
  const url = new URL(urlString);

  const level = url.searchParams.getAll('level');
  const id = url.searchParams.get('id');
  const name = url.searchParams.get('name');
  const page = parseInt(url.searchParams.get('page') ?? '1');
  const size = parseInt(url.searchParams.get('size') ?? '10');

  if (level != null && level.length > 0) {
    data = data.filter((item) =>
      level.includes(`${getProductAddressLevelForId(item.id)}`)
    );
  }

  if (id != null) {
    const idParts = getProductAddressIdQuery(id);

    data = data.filter((item) => {
      return item.id.startsWith(idParts);
    });
  }

  if (name != null) {
    data = data.filter(
      (item) =>
        item.levelOneName.includes(name) ||
        item.levelTwoName?.includes(name) ||
        item.levelThreeName?.includes(name)
    );
  }

  data = data.sort((a, b) => a.id.localeCompare(b.id));
  data = data.map((item) => ({
    ...item,
    count: Math.floor(Math.random() * 100),
  }));

  return HttpResponse.json({
    totalCount: data.length,
    list: data.slice((page - 1) * size, page * size),
  });
};
