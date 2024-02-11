import { CreateProductDto } from '../dto/product.dto';
import { productDtoStub } from './product-dto.stub';

export const createdProductDtoStub = () => {
  return <CreateProductDto>{
    name: productDtoStub().name,
    description: productDtoStub().description,
    price: productDtoStub().price,
    quantity: productDtoStub().quantity,
    category: productDtoStub().category,
  };
};
