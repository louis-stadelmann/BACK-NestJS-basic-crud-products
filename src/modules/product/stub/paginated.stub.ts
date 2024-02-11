import { listProductDtoStub } from './list-product-dto.stub';
import { PaginationResponse } from '../../../database/pagination-response';

export const paginatedStub = <T>(data: T) => {
  return <PaginationResponse<T>>{
    ...listProductDtoStub(),
    totalDocs: 1,
    page: 1,
    totalPages: 1,
    docs: [data],
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    nextPage: null,
    prevPage: null,
  };
};
