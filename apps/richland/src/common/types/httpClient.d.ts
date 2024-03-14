export interface PaginationQueryParams {
  page: number;
  size: number;
}

export interface PaginationResponseModel<T> {
  totalCount: number;
  list: T[];
}

export interface PaginationResponseDTO<T> {
  total_count: number;
  list: T[];
}
