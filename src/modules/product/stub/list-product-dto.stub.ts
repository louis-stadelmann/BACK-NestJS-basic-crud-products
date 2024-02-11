import { ListProductDto } from '../dto/list-product.dto';

export const listProductDtoStub = () => {
  return <ListProductDto>{
    offset: 0,
    limit: 100,
  };
};
