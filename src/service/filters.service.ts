import { FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FiltersService {
  numberRangeFilter(
    fieldKey: string,
    min?: number,
    max?: number,
  ): FilterQuery<any> {
    return this.rangeFilterConstructor(fieldKey, min, max);
  }

  dateRangeFilter(
    fieldKey: string,
    before?: Date,
    after?: Date,
  ): FilterQuery<any> {
    return this.rangeFilterConstructor(fieldKey, after, before);
  }

  private rangeFilterConstructor<T>(
    fieldKey: string,
    min?: T,
    max?: T,
  ): FilterQuery<any> {
    const filter = {};

    if (min) {
      filter[fieldKey] = { $gte: min };
    }
    if (max) {
      filter[fieldKey] = { ...filter[fieldKey], $lte: max };
    }

    return filter;
  }
}
