import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '../../product.repository';
import { getModelToken } from '@nestjs/mongoose';
import { ProductDocument, ProductEntity } from '../../schema/product.entities';
import { ProductMockModel } from '../support/product-mock.model';
import { FilterQuery } from 'mongoose';
import { productDtoStub } from '../../stub/product-dto.stub';
import { listProductDtoStub } from '../../stub/list-product-dto.stub';
import { PaginationResponse } from '../../../../database/pagination-response';
import { paginatedProductStub } from '../../stub/paginated-product.stub';
import { updateProductDtoStub } from '../../stub/update-product-dto.stub';
import { createdProductDtoStub } from '../../stub/created-product-dto.stub';
import { BadRequestException } from '@nestjs/common';
import { FiltersService } from '../../../../service/filters.service';

jest.mock('uuid', () => ({ v4: () => productDtoStub().id }));

describe('Product Repository', () => {
  let productRepository: ProductRepository;
  let productModel: ProductMockModel;
  let productFilterQuery: FilterQuery<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        FiltersService,
        {
          provide: getModelToken(ProductEntity.name),
          useClass: ProductMockModel,
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    productModel = module.get<ProductMockModel>(
      getModelToken(ProductEntity.name),
    );
    productFilterQuery = {
      id: productDtoStub().id,
    };

    jest.clearAllMocks();
  });

  it('productRepository should be defined', () => {
    expect(productRepository).toBeDefined();
  });

  it('productModel should be defined', () => {
    expect(productModel).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let product: ProductEntity | null;
      beforeEach(async () => {
        jest.spyOn(productModel, 'findOne');
        product = await productRepository.findOne(productFilterQuery);
      });

      test('then it should call the productModel', () => {
        expect(productModel.findOne).toHaveBeenCalledWith(productFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      test('it should return a product', () => {
        expect(product).toEqual(productDtoStub());
      });
    });
  });

  describe('find', () => {
    describe('when find is called', () => {
      let products: ProductEntity[];
      beforeEach(async () => {
        jest.spyOn(productModel, 'find');
        products = await productRepository.find(productFilterQuery);
      });

      test('then it should call the productModel', () => {
        expect(productModel.find).toHaveBeenCalledWith(productFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      test('it should return a product', () => {
        expect(products).toEqual([productDtoStub()]);
      });
    });
  });

  describe('paginatedFind', () => {
    describe('when paginatedFind is called', () => {
      let paginatedProduct: PaginationResponse<ProductDocument>;
      beforeEach(async () => {
        jest.spyOn(productModel, 'countDocuments');
        jest.spyOn(productModel, 'find');
        paginatedProduct = await productRepository.paginatedFind(
          productFilterQuery,
          listProductDtoStub().offset,
          listProductDtoStub().limit,
        );
      });

      test('then it should call the productModel countDocument', () => {
        expect(productModel.countDocuments).toHaveBeenCalledWith(
          productFilterQuery,
        );
      });

      test('then it should call the productModel find', () => {
        expect(productModel.find).toHaveBeenCalledWith(
          productFilterQuery,
          {
            _id: 0,
            __v: 0,
          },
          {
            limit: listProductDtoStub().limit,
            skip: listProductDtoStub().offset,
            sort: undefined,
          },
        );
      });

      test('it should return a product', () => {
        expect(paginatedProduct).toEqual(paginatedProductStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let product: ProductEntity | null;
      beforeEach(async () => {
        jest.spyOn(productModel, 'findOneAndUpdate');
        product = await productRepository.updateOneProduct(
          productDtoStub().id,
          updateProductDtoStub(),
        );
      });

      test('then it should call the productModel', () => {
        expect(productModel.findOneAndUpdate).toHaveBeenCalledWith(
          productFilterQuery,
          updateProductDtoStub(),
          {
            new: true,
          },
        );
      });

      test('it should return a product', () => {
        expect(product).toEqual(productDtoStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called with success', () => {
      let product: ProductEntity;

      beforeEach(async () => {
        jest.spyOn(productModel, 'create');
        jest.spyOn(productModel, 'find').mockReturnValueOnce({
          exec: () => {
            return [];
          },
        });

        product = await productRepository.createProduct(
          createdProductDtoStub(),
        );
      });

      test('then it should call the productModel', () => {
        expect(productModel.create).toHaveBeenCalledWith({
          id: productDtoStub().id,
          ...createdProductDtoStub(),
        });
      });

      test('it should return a product', () => {
        expect(product).toEqual(productDtoStub());
      });
    });

    describe('when create is called with failure', () => {
      let result: ProductEntity;

      beforeEach(async () => {
        jest.spyOn(productModel, 'create');
        jest.spyOn(productModel, 'find').mockReturnValueOnce({
          exec: () => {
            return [productDtoStub()];
          },
        });

        result = await productRepository
          .createProduct(createdProductDtoStub())
          .catch((err) => {
            return err;
          });
      });

      test('it should return a BadRequestException', () => {
        expect(result).toBeInstanceOf(BadRequestException);
      });
    });
  });

  describe('deleteMany', () => {
    let result: boolean;
    describe('when deleteMany is called', () => {
      beforeEach(async () => {
        jest.spyOn(productModel, 'deleteMany');
        result = await productRepository.deleteOneProduct(productDtoStub().id);
      });

      test('then it should call the productModel', () => {
        expect(productModel.deleteMany).toHaveBeenCalled();
      });

      test('it should return a product', () => {
        expect(result).toEqual(true);
      });
    });
  });
});
