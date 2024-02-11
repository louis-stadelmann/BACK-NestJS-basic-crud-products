import { paginatedStub } from '../modules/product/stub/paginated.stub';
import { PaginationResponse } from './pagination-response';
import { productDtoStub } from '../modules/product/stub/product-dto.stub';

export abstract class MockModel<T> {
  protected abstract entityStub: T;

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  find(): { exec: () => T[] } {
    return {
      exec: (): T[] => [this.entityStub],
    };
  }

  async countDocuments(): Promise<number> {
    return paginatedStub(productDtoStub()).totalDocs;
  }

  async paginatedFind(): Promise<PaginationResponse<T>> {
    return paginatedStub(this.entityStub);
  }

  async create(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async deleteMany(): Promise<{ deletedCount: number }> {
    return { deletedCount: 1 };
  }
}
