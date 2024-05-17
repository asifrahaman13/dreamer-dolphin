// The Categories will contain Items. There can be multiple items in a Category.

export class CreateItemDto {
  name: string;
  image: string;
  description: string;
  taxApplicability: boolean;
  tax: number;
  baseAmount: number;
  discount: number;
  totalAmount: number;
}
