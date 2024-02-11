import { productDtoStub } from '../stub/product-dto.stub';
import { paginatedProductStub } from '../stub/paginated-product.stub';

export const ProductService = jest.fn().mockReturnValue({
  createProduct: jest.fn().mockResolvedValue(productDtoStub()),
  listProduct: jest.fn().mockResolvedValue(paginatedProductStub()),
  findProduct: jest.fn().mockResolvedValue(productDtoStub()),
  updateProduct: jest.fn().mockResolvedValue(productDtoStub()),
  deleteProduct: jest.fn().mockResolvedValue(jest.fn()),
});
