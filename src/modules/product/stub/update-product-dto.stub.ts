import { UpdateProductDto } from '../dto/product.dto';
import { productDtoStub } from './product-dto.stub';

export const updateProductDtoStub = () => {
  return <UpdateProductDto>{
    name: productDtoStub().name,
    description: productDtoStub().description,
    price: productDtoStub().price,
    quantity: productDtoStub().quantity,
    category: productDtoStub().category,
  };
};
