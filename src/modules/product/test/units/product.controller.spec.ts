import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../product.controller';
import { ProductService } from '../../product.service';
import { createdProductDtoStub } from '../../stub/created-product-dto.stub';
import { CreateProductDto, ProductDto } from '../../dto/product.dto';
import { productDtoStub } from '../../stub/product-dto.stub';
import { listProductDtoStub } from '../../stub/list-product-dto.stub';
import { updateProductDtoStub } from '../../stub/update-product-dto.stub';
import { PaginationResponse } from '../../../../database/pagination-response';
import { paginatedProductStub } from '../../stub/paginated-product.stub';

jest.mock('../../product.service');

describe('Product Controller', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('productService should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('productController should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('createProduct', () => {
    describe('when createProduct is called', () => {
      let createdProduct: CreateProductDto;
      beforeEach(async () => {
        createdProduct = await productController.createProduct(
          createdProductDtoStub(),
        );
      });

      test('then it should call productService', () => {
        expect(productService.createProduct).toBeCalledWith(
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
        products = await productController.listProduct(listProductDtoStub());
      });

      test('then it should call productService', () => {
        expect(productService.listProduct).toBeCalledWith(listProductDtoStub());
      });

      test('then it should return a product', () => {
        expect(products).toEqual(paginatedProductStub());
      });
    });
  });

  describe('findProduct', () => {
    describe('when findProduct is called', () => {
      let product: ProductDto;
      beforeEach(async () => {
        product = await productController.findProduct(productDtoStub().id);
      });

      test('then it should call productService', () => {
        expect(productService.findProduct).toBeCalledWith(productDtoStub().id);
      });

      test('then it should return a product', () => {
        expect(product).toEqual(productDtoStub());
      });
    });
  });

  describe('updateProduct', () => {
    describe('when updateProduct is called', () => {
      let updatedProduct: ProductDto;
      beforeEach(async () => {
        updatedProduct = await productController.updateProduct(
          productDtoStub().id,
          updateProductDtoStub(),
        );
      });

      test('then it should call productService', () => {
        expect(productService.updateProduct).toBeCalledWith(
          productDtoStub().id,
          createdProductDtoStub(),
        );
      });

      test('then it should return a product', () => {
        expect(updatedProduct).toEqual(productDtoStub());
      });
    });
  });

  describe('deleteProduct', () => {
    describe('when deleteProduct is called', () => {
      test('then it should call productService', async () => {
        await expect(
          productController.deleteProduct(productDtoStub().id),
        ).resolves.not.toThrow();
      });
    });
  });
});
