import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CreateSubCategoryDto } from '../dto/create-subcategory.dto';
import { CreateItemDto } from '../dto/create-item.dto';
import { SubCategory } from 'src/schemas/subcategory.schema';
import { Item } from 'src/schemas/item.schema';

@Injectable()
export class CategoryService {
  // Inject the Category model into the service
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  // Implement the methods to create, read, update, and delete categories, subcategories, and items.
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    // Create a new category using the Category model and save it to the database.
    const createdCategory = new this.categoryModel(createCategoryDto);

    // Return the created category
    return createdCategory.save();
  }

  async createSubCategory(
    categoryId: string,
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<Category> {
    // Just find the category through the id and push the new subcategory to the subCategories array.
    // Return the same.
    return this.categoryModel.findByIdAndUpdate(
      categoryId,
      { $push: { subCategories: createSubCategoryDto } },
      { new: true, useFindAndModify: false },
    );
  }

  async createItem(
    categoryId: string,
    subCategoryId: string,
    createItemDto: CreateItemDto,
  ): Promise<Category> {
    // If subCategoryId is provided then find the category with the categoryId and subCategoryId and push the new item to the items array.
    if (subCategoryId) {
      return this.categoryModel.findOneAndUpdate(
        { _id: categoryId, 'subCategories._id': subCategoryId },
        { $push: { 'subCategories.$.items': createItemDto } },
        { new: true, useFindAndModify: false },
      );
    } else {
      // If subCategoryId is not provided then find the category with the categoryId and push the new item to the items array.
      return this.categoryModel.findByIdAndUpdate(
        categoryId,
        { $push: { items: createItemDto } },
        { new: true, useFindAndModify: false },
      );
    }
  }

  async getAllCategories(): Promise<Category[]> {
    // Find all categories and return them. It will be either list of objects or an empty array.
    return this.categoryModel.find().exec();
  }

  async getCategoryById(id: string): Promise<Category> {
    // Find the category by id and return it. If not found, throw a NotFoundException.
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async getCategoryByName(name: string): Promise<Category> {
    // Find the category by name and return it. If not found, throw a NotFoundException.
    const category = await this.categoryModel.findOne({ name }).exec();
    if (!category) {
      throw new NotFoundException(`Category with name ${name} not found`);
    }
    return category;
  }

  async getAllSubCategories(): Promise<SubCategory[]> {
    // Find all categories and return them. Then map through each category and return the subCategories array.
    const categories = await this.categoryModel.find().exec();

    // Return the subCategories array.
    return categories.flatMap((category) => category.subCategories);
  }

  async getSubCategoriesByCategoryId(
    categoryId: string,
  ): Promise<SubCategory[]> {
    // Find the category by id and return the subCategories array. If not found, throw a NotFoundException.
    const category = await this.getCategoryById(categoryId);

    // Return the subCategories array.
    return category.subCategories;
  }

  async getSubCategoryById(
    categoryId: string,
    subCategoryId: string,
  ): Promise<SubCategory> {
    // Find the category by categoryId and subCategoryId and return the subCategory.
    const category = await this.getCategoryById(categoryId);

    // Find the subCategory by subCategoryId.
    const subCategory = category.subCategories.find(
      (subCat) => subCat._id.toString() === subCategoryId,
    );

    // If subCategory is not found, throw a NotFoundException.
    if (!subCategory) {
      throw new NotFoundException(
        `SubCategory with ID ${subCategoryId} not found`,
      );
    }

    // Return the subCategory.
    return subCategory;
  }

  async getAllItems(): Promise<Item[]> {
    // Find all categories and return them. Then map through each category and return the items array.
    const categories = await this.categoryModel.find().exec();

    // Combine the items and subCategoryItems arrays.
    const items = categories.flatMap((category) => category.items);

    // Return the combined array.
    const subCategoryItems = categories.flatMap((category) =>
      category.subCategories.flatMap((subCategory) => subCategory.items),
    );

    // Return the combined array.
    return [...items, ...subCategoryItems];
  }

  async getItemsByCategoryId(categoryId: string): Promise<Item[]> {
    // Find the category by categoryId and return the items array.
    const category = await this.getCategoryById(categoryId);

    // Return the items array.
    return category.items;
  }

  async getItemsBySubCategoryId(
    categoryId: string,
    subCategoryId: string,
  ): Promise<Item[]> {
    // Find the category by categoryId and subCategoryId and return the items array.
    const subCategory = await this.getSubCategoryById(
      categoryId,
      subCategoryId,
    );

    // Return the items array.
    return subCategory.items;
  }

  async getItemById(
    categoryId: string,
    subCategoryId: string,
    itemId: string,
  ): Promise<Item> {
    // Find the category by categoryId and subCategoryId and return the item by itemId.
    const items = subCategoryId
      ? await this.getItemsBySubCategoryId(categoryId, subCategoryId)
      : await this.getItemsByCategoryId(categoryId);
    // Find the item by itemId.
    const item = items.find((item) => item._id.toString() === itemId);
    // If item is not found, throw a NotFoundException.
    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }
    return item;
  }

  async updateCategory(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    // Find the category by id and update it with the new values.
    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    // If category is not found, throw a NotFoundException.
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async updateSubCategory(
    categoryId: string,
    subCategoryId: string,
    updateSubCategoryDto: CreateSubCategoryDto,
  ): Promise<Category> {
    // Find the category by categoryId and subCategoryId and update the subCategory with the new values.
    return this.categoryModel.findOneAndUpdate(
      { _id: categoryId, 'subCategories._id': subCategoryId },
      { $set: { 'subCategories.$.name': updateSubCategoryDto.name } },
      { new: true, useFindAndModify: false },
    );
  }

  async updateCategoryItem(
    categoryId: string,
    itemId: string,
    updateItemDto: CreateItemDto,
  ): Promise<Category> {
    // Find the category by categoryId and itemId and update the item with the new values.
    return this.categoryModel.findOneAndUpdate(
      { _id: categoryId, 'items._id': itemId },
      {
        $set: {
          'items.$.name': updateItemDto.name,
          'items.$.description': updateItemDto.description,
        },
      },
      { new: true, useFindAndModify: false },
    );
  }

  async updateSubCategoryItem(
    categoryId: string,
    subCategoryId: string,
    itemId: string,
    updateItemDto: CreateItemDto,
  ): Promise<Category> {
    // Find the category by categoryId, subCategoryId, and itemId and update the item with the new values.
    return this.categoryModel.findOneAndUpdate(
      {
        _id: categoryId,
        'subCategories._id': subCategoryId,
        'subCategories.items._id': itemId,
      },
      {
        $set: {
          'subCategories.$[sc].items.$[item].name': updateItemDto.name,
          'subCategories.$[sc].items.$[item].description':
            updateItemDto.description,
        },
      },
      {
        arrayFilters: [{ 'sc._id': subCategoryId }, { 'item._id': itemId }],
        new: true,
        useFindAndModify: false,
      },
    );
  }

  //  Note that the following method oreturns the items present either within category or subcategory.
  async searchItems(name: string): Promise<Item[]> {
    // First find the categories and then map through each category and return the items array.
    const categories = await this.categoryModel.find().exec();

    // Then find the subCategories and map through each subCategory and return the items array.
    const items = categories.flatMap((category) => category.items);

    // Combine the items and subCategoryItems arrays and filter the items by name.
    const subCategoryItems = categories.flatMap((category) =>
      category.subCategories.flatMap((subCategory) => subCategory.items),
    );

    // Return the filtered items.
    return [...items, ...subCategoryItems].filter((item) =>
      item.name.includes(name),
    );
  }
}
