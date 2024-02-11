import { MockModel } from '../../../../database/mock.model';
import { ProductEntity } from '../../schema/product.entities';
import { productDtoStub } from '../../stub/product-dto.stub';

export class ProductMockModel extends MockModel<ProductEntity> {
  entityStub = productDtoStub();
}
