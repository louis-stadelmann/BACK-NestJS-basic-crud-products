import { Test, TestingModule } from '@nestjs/testing';
import { FiltersService } from '../filters.service';
import { FilterQuery } from 'mongoose';

describe('Filters Service', () => {
  let filtersService: FiltersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiltersService],
    }).compile();

    filtersService = module.get<FiltersService>(FiltersService);
    jest.clearAllMocks();
  });

  it('filtersService should be defined', () => {
    expect(filtersService).toBeDefined();
  });

  describe('numberRangeFilter', () => {
    describe('when numberRangeFilter is called', () => {
      let result: FilterQuery<any>;
      beforeEach(() => {
        result = filtersService.numberRangeFilter('price', 2, 10);
      });

      test('then it should return a product', () => {
        expect(result).toEqual({
          price: {
            $gte: 2,
            $lte: 10,
          },
        });
      });
    });
  });
});
