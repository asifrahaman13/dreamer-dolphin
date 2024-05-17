import { CreateItemDto } from './create-item.dto';

/**
 * Create a custom data transfer object (DTO) for creating a subcategory. This DTO will be used to validate the request body when creating a new subcategory. Validation can also be added to them to ensure correct data is being received from the client.
 * There can be multiple subcategories in a Category.
 */
export class CreateSubCategoryDto {
  name: string;
  image: string;
  description: string;
  taxApplicability: boolean;
  tax: number;
  items: CreateItemDto[];
}
