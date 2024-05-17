import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item, ItemSchema } from './item.schema';

@Schema()
export class SubCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  taxApplicability: boolean;

  @Prop()
  tax: number;

  @Prop({ type: [ItemSchema], default: [] })
  items: Item[];
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
