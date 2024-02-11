import { ProductDto } from '../dto/product.dto';
import { CategoryEnum } from '../../category/category.enum';

export const productDtoStub = () => {
  return <ProductDto>{
    id: 'a243d405-6c91-44c5-8fdd-66619df79d0f',
    name: 'Monitor',
    description: '27 inch monitor',
    price: 299.99,
    quantity: 12,
    category: CategoryEnum.CATEGORY_3,
    createdAt: '2024-01-01T00:10:00.000Z',
    updatedAt: '2024-01-01T00:10:00.000Z',
  };
};
