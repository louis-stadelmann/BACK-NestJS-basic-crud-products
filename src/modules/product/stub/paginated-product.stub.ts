import { productDtoStub } from './product-dto.stub';
import { paginatedStub } from './paginated.stub';

export const paginatedProductStub = () => {
  return paginatedStub(productDtoStub());
};
