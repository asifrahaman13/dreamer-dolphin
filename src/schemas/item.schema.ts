import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
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

  @Prop({ required: true })
  baseAmount: number;

  @Prop()
  discount: number;

  @Prop()
  totalAmount: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
