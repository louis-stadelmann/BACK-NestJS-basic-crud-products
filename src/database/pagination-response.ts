export interface PaginationResponse<T> {
  totalDocs: number;
  limit: number;
  offset: number;
  page: number;
  totalPages: number;
  docs: T[];
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  nextPage: null | number;
  prevPage: null | number;
}

export function getPaginationResponseObject<T>({
  offset,
  limit,
  countDocuments,
  documents,
}: {
  offset: number;
  limit: number;
  countDocuments: number;
  documents: any[];
}): PaginationResponse<T> {
  const page = Math.ceil((offset + 1) / limit);
  const pages = limit > 0 ? Math.ceil(countDocuments / limit) || 1 : null;
  const pagingCounter = (page - 1) * limit + 1;

  const paginateObj = {
    totalDocs: countDocuments,
    limit,
    offset,
    page,
    totalPages: pages,
    docs: documents,
    pagingCounter,
    hasPrevPage: false,
    hasNextPage: false,
    nextPage: null,
    prevPage: null,
  } as PaginationResponse<T>;

  if (page > 1) {
    paginateObj.hasPrevPage = true;
    paginateObj.prevPage = page - 1;
  } else if (page === 1 && offset !== 0) {
    paginateObj.hasPrevPage = true;
    paginateObj.prevPage = 1;
  }
  if (pages && page < pages) {
    paginateObj.hasNextPage = true;
    paginateObj.nextPage = page + 1;
  }
  return paginateObj;
}
