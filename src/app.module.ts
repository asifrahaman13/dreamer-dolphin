import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigService, CustomConfigService } from './config/config.service';
import { loadYamlConfig } from './config/load-yaml.config';
import { MongodbConfigService } from './mongoservice/mongoservice.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
    }),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadYamlConfig],
    }),
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService, ConfigService, CustomConfigService],
  exports: [CustomConfigService],
})
export class AppModule {}
