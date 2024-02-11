import { PaginationResponse } from '../database/pagination-response';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export async function transformToPaginatedResponse<T, U>(
  paginationResponse: PaginationResponse<T>,
  Class: ClassConstructor<U>,
): Promise<PaginationResponse<U>> {
  return {
    ...paginationResponse,
    ...{
      docs: [
        ...paginationResponse.docs.map((entity) => {
          return plainToInstance(Class, entity, {
            excludeExtraneousValues: true,
          });
        }),
      ],
    },
  };
}
