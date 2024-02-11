import { productDtoStub } from '../stub/product-dto.stub';
import { paginatedProductStub } from '../stub/paginated-product.stub';

export const ProductRepository = jest.fn().mockReturnValue({
  createProduct: jest.fn().mockResolvedValue(productDtoStub()),
  listProduct: jest.fn().mockResolvedValue(paginatedProductStub()),
  findOneProduct: jest.fn().mockResolvedValue(productDtoStub()),
  updateOneProduct: jest.fn().mockResolvedValue(productDtoStub()),
  deleteOneProduct: jest.fn().mockResolvedValue(true),
});
