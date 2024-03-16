import {
  PaginationQueryParams,
  PaginationResponseDTO,
} from '@/common/types/httpClient';
import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

export interface NotificationListItemModel {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  link?: URL;
  createdAt: Date;
}

export interface NotificationListItemDTO {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  link?: string;
  created_at: Date;
}

// TODO. API 업데이트 필요
export const getNotificationListEndpoint = '/notification/list';

const useNotificationList = (initialParams?: PaginationQueryParams) => {
  return useInfiniteQuery<
    NotificationListItemModel[],
    Error,
    InfiniteData<NotificationListItemModel[], PaginationQueryParams>,
    QueryKey,
    PaginationQueryParams
  >({
    queryKey: [getNotificationListEndpoint],
    initialPageParam: initialParams ?? { page: 0, size: 10 },
    getNextPageParam: (lastPage, __, lastPageParam) => {
      if (lastPage.length < lastPageParam.size) {
        return undefined;
      }

      return {
        page: lastPageParam.page + 1,
        size: lastPageParam.size,
      };
    },
    queryFn: async ({ pageParam }) => {
      const response = await httpClient.get<
        PaginationResponseDTO<NotificationListItemDTO>
      >(getNotificationListEndpoint, {
        params: {
          page: pageParam?.page,
          size: pageParam?.size,
        },
      });

      return response.list.map((item) => {
        return {
          id: item.id,
          title: item.title,
          content: item.content,
          thumbnailUrl: item.thumbnail_url,
          link: item.link != null ? new URL(item.link) : undefined,
          createdAt: item.created_at,
        };
      });
    },
  });
};

export default useNotificationList;

defineMock((mock) => {
  return [
    mock.get(new RegExp(getNotificationListEndpoint), ({ request }) => {
      const maxLength = 100;
      const parsedUrl = new URL(request.url);
      const page = Number(parsedUrl.searchParams.get('page'));
      const size = Number(parsedUrl.searchParams.get('size'));

      if ((page + 1) * size > maxLength) {
        return HttpResponse.json({
          total_count: maxLength,
          list: [],
        });
      }

      const list = Array.from({ length: size }).map((_, index) => {
        const id = `${page * size}-${index}`;

        return {
          id,
          title: `Title ${id}`,
          content: `Content ${id}`,
          thumbnail_url: `https://via.placeholder.com/150?text=${id}`,
          created_at: new Date(),
        };
      });

      return HttpResponse.json({
        total_count: maxLength,
        list,
      });
    }),
  ];
});
