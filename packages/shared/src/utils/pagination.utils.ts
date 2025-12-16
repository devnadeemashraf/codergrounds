import { PagedResult, PaginationParams } from '../types/pagination.types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

export const getPaginationParams = (params?: PaginationParams) => {
  let page = Number(params?.page) || DEFAULT_PAGE;
  let limit = Number(params?.limit) || DEFAULT_LIMIT;

  if (page < 1) page = 1;
  if (limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export const createPagedResult = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PagedResult<T> => {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
