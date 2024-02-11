import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { SortOptions } from '../dto/pagination.dto';
import {
  getPaginationResponseObject,
  PaginationResponse,
} from './pagination-response';

const defaultProjection = {
  _id: 0,
  __v: 0,
};

export abstract class EntityRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection: Record<string, unknown> = defaultProjection,
  ): Promise<T[]> {
    return this.entityModel.find(entityFilterQuery, projection).exec();
  }

  async paginatedFind(
    entityFilterQuery: FilterQuery<T>,
    offset: number,
    limit: number,
    sort?: SortOptions,
    projection: Record<string, unknown> = defaultProjection,
  ): Promise<PaginationResponse<T>> {
    const countDocumentsPromise =
      this.entityModel.countDocuments(entityFilterQuery);
    const documentsPromises = this.entityModel
      .find(entityFilterQuery, projection, {
        limit: limit,
        skip: offset,
        sort: sort,
      })
      .exec();

    const [countDocuments, documents] = await Promise.all([
      countDocumentsPromise,
      documentsPromises,
    ]);

    return getPaginationResponseObject<T>({
      offset,
      limit,
      documents,
      countDocuments,
    });
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection: Record<string, unknown> = defaultProjection,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    return this.entityModel.create(createEntityData);
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
