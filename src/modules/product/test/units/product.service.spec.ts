import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../product.service';
import { createdProductDtoStub } from '../../stub/created-product-dto.stub';
import { CreateProductDto, ProductDto } from '../../dto/product.dto';
import { productDtoStub } from '../../stub/product-dto.stub';
import { ProductRepository } from '../../product.repository';
import { getModelToken } from '@nestjs/mongoose';
import { ProductEntity } from '../../schema/product.entities';
import { ProductMockModel } from '../support/product-mock.model';
import { PaginationResponse } from '../../../../database/pagination-response';
import { listProductDtoStub } from '../../stub/list-product-dto.stub';
import { paginatedProductStub } from '../../stub/paginated-product.stub';
import { NotFoundException } from '@nestjs/common';
import { updateProductDtoStub } from '../../stub/update-product-dto.stub';

jest.mock('../../product.repository');

describe('Product Service', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;
  let productModel: ProductMockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        ProductRepository,
        {
          provide: getModelToken(ProductEntity.name),
          useClass: ProductMockModel,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
    productModel = module.get<ProductMockModel>(
      getModelToken(ProductEntity.name),
    );
    jest.clearAllMocks();
  });

  it('productService should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('productRepository should be defined', () => {
    expect(productRepository).toBeDefined();
  });

  it('productModel should be defined', () => {
    expect(productModel).toBeDefined();
  });

  describe('createProduct', () => {
    describe('when createProduct is called', () => {
      let createdProduct: CreateProductDto;
      beforeEach(async () => {
        createdProduct = await productService.createProduct(
          createdProductDtoStub(),
        );
      });

      test('then it should call productService', () => {
        expect(productRepository.createProduct).toBeCalledWith(
          createdProductDtoStub(),
        );
      });

      test('then it should return a product', () => {
        expect(createdProduct).toEqual(productDtoStub());
      });
    });
  });

  describe('listProduct', () => {
    describe('when listProduct is called', () => {
      let products: PaginationResponse<ProductDto>;
      beforeEach(async () => {
        products = await productService.listProduct(listProductDtoStub());
      });

      test('then it should call productService', () => {
        expect(productRepository.listProduct).toBeCalledWith(
          listProductDtoStub(),
        );
      });

      test('then it should return a product', () => {
        expect(products).toEqual(paginatedProductStub());
      });
    });
  });

  describe('findProduct', () => {
    describe('when findProduct is called with success', () => {
      let product: ProductDto;
      beforeEach(async () => {
        product = await productService.findProduct(productDtoStub().id);
      });

      test('then it should call productService', () => {
        expect(productRepository.findOneProduct).toBeCalledWith(
          productDtoStub().id,
        );
      });

      test('then it should return a product', () => {
        expect(product).toEqual(productDtoStub());
      });
    });
    describe('when findProduct is called with failure', () => {
      let result: ProductDto;
      beforeEach(async () => {
        jest.spyOn(productRepository, 'findOneProduct').mockResolvedValue(null);
        result = await productService
          .findProduct(productDtoStub().id)
          .catch((err) => {
            return err;
          });
      });

      test('then it should return a NotFoundException', () => {
        expect(result).toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('updateProduct', () => {
    describe('when updateProduct is called with success', () => {
      let product: ProductDto;
      beforeEach(async () => {
        product = await productService.updateProduct(
          productDtoStub().id,
          updateProductDtoStub(),
        );
      });

      test('then it should call productService', () => {
        expect(productRepository.updateOneProduct).toBeCalledWith(
          productDtoStub().id,
          updateProductDtoStub(),
        );
      });

      test('then it should return a product', () => {
        expect(product).toEqual(productDtoStub());
      });
    });
    describe('when updateProduct is called with failure', () => {
      let result: ProductDto;
      beforeEach(async () => {
        jest
          .spyOn(productRepository, 'updateOneProduct')
          .mockResolvedValue(null);
        result = await productService
          .updateProduct(productDtoStub().id, updateProductDtoStub())
          .catch((err) => {
            return err;
          });
      });

      test('then it should return a NotFoundException', () => {
        expect(result).toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('deleteProduct', () => {
    describe('when deleteProduct is called with success', () => {
      beforeEach(async () => {
        await productService.deleteProduct(productDtoStub().id);
      });

      test('then it should call productService', () => {
        expect(productRepository.deleteOneProduct).toBeCalledWith(
          productDtoStub().id,
        );
      });
    });
    describe('when deleteProduct is called with failure', () => {
      let result: ProductDto;
      beforeEach(async () => {
        jest
          .spyOn(productRepository, 'deleteOneProduct')
          .mockResolvedValue(false);
        result = await productService
          .deleteProduct(productDtoStub().id)
          .catch((err) => {
            return err;
          });
      });

      test('then it should return a NotFoundException', () => {
        expect(result).toBeInstanceOf(NotFoundException);
      });
    });
  });
});
