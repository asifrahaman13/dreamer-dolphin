import { CreateSubCategoryDto } from './create-subcategory.dto';
import { CreateItemDto } from './create-item.dto';

/**
 *Create a custom data transfer object (DTO) for creating a category. This DTO will be used to validate the request body when creating a new category. Validation can also be added to them to ensure correct data is being received from the client
 */

export class CreateCategoryDto {
  name: string;
  image: string;
  description: string;
  taxApplicability: boolean;
  tax: number;
  taxType: string;
  subCategories: CreateSubCategoryDto[];
  items: CreateItemDto[];
}
