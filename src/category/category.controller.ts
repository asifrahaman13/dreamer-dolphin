import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CreateSubCategoryDto } from '../dto/create-subcategory.dto';
import { CreateItemDto } from '../dto/create-item.dto';
import { Category } from 'src/schemas/category.schema';
import { SubCategory } from 'src/schemas/subcategory.schema';
import { Item } from 'src/schemas/item.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post(':categoryId/subcategories')
  async createSubCategory(
    @Param('categoryId') categoryId: string,
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ) {
    return this.categoryService.createSubCategory(
      categoryId,
      createSubCategoryDto,
    );
  }

  @Post(':categoryId/subcategories/:subCategoryId/items')
  async createItemUnderSubCategory(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.categoryService.createItem(
      categoryId,
      subCategoryId,
      createItemDto,
    );
  }

  @Post(':categoryId/items')
  async createItemUnderCategory(
    @Param('categoryId') categoryId: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.categoryService.createItem(categoryId, null, createItemDto);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get('by-id/:id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Get('by-name')
  async getCategoryByName(@Query('name') name: string): Promise<Category> {
    return this.categoryService.getCategoryByName(name);
  }

  @Get('subcategories')
  async getAllSubCategories(): Promise<SubCategory[]> {
    return this.categoryService.getAllSubCategories();
  }

  @Get(':categoryId/subcategories')
  async getSubCategoriesByCategoryId(
    @Param('categoryId') categoryId: string,
  ): Promise<SubCategory[]> {
    return this.categoryService.getSubCategoriesByCategoryId(categoryId);
  }

  @Get(':categoryId/subcategories/:subCategoryId')
  async getSubCategoryById(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<SubCategory> {
    return this.categoryService.getSubCategoryById(categoryId, subCategoryId);
  }

  @Get('items')
  async getAllItems(): Promise<Item[]> {
    return this.categoryService.getAllItems();
  }

  @Get(':categoryId/items')
  async getItemsByCategoryId(
    @Param('categoryId') categoryId: string,
  ): Promise<Item[]> {
    return this.categoryService.getItemsByCategoryId(categoryId);
  }

  @Get(':categoryId/subcategories/:subCategoryId/items')
  async getItemsBySubCategoryId(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<Item[]> {
    return this.categoryService.getItemsBySubCategoryId(
      categoryId,
      subCategoryId,
    );
  }

  @Get(':categoryId/items/:itemId')
  async getItemById(
    @Param('categoryId') categoryId: string,
    @Param('itemId') itemId: string,
    @Query('subCategoryId') subCategoryId?: string,
  ): Promise<Item> {
    return this.categoryService.getItemById(categoryId, subCategoryId, itemId);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Patch(':categoryId/subcategories/:subCategoryId')
  async updateSubCategory(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Body() updateSubCategoryDto: CreateSubCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateSubCategory(
      categoryId,
      subCategoryId,
      updateSubCategoryDto,
    );
  }
  @Patch(':categoryId/items/:itemId')
  async updateCategoryItem(
    @Param('categoryId') categoryId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: CreateItemDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryItem(
      categoryId,
      itemId,
      updateItemDto,
    );
  }

  @Patch(':categoryId/subcategories/:subCategoryId/items/:itemId')
  async updateSubCategoryItem(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: CreateItemDto,
  ): Promise<Category> {
    return this.categoryService.updateSubCategoryItem(
      categoryId,
      subCategoryId,
      itemId,
      updateItemDto,
    );
  }

  @Get('items/search')
  searchItems(@Query('name') name: string) {
    return this.categoryService.searchItems(name);
  }
}
