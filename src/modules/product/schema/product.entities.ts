import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEnum } from '../../category/category.enum';
import { Document } from 'mongoose';

export type ProductDocument = ProductEntity & Document;

@Schema({ collection: 'product', timestamps: true })
export class ProductEntity {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: Number,
    required: true,
    min: [0, "Item price can't be lesser than {VALUE}"],
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
    min: [0, "Item quantity can't be lesser than {VALUE}"],
  })
  quantity: number;

  @Prop({ type: String, enum: CategoryEnum, required: true })
  category: CategoryEnum;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
