import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubCategory, SubCategorySchema } from './subcategory.schema';
import { Item, ItemSchema } from './item.schema';

@Schema()
export class Category extends Document {
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

  @Prop()
  taxType: string;

  @Prop({ type: [SubCategorySchema], default: [] })
  subCategories: SubCategory[];

  @Prop({ type: [ItemSchema], default: [] })
  items: Item[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
