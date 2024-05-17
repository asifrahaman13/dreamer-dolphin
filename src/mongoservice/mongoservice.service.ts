import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createMongooseOptions(): MongooseModuleOptions {
    // Return the MongoDB URI from the configuration service
    return {
      uri: this.configService.get<string>('MONGO_URI'),
    };
  }
}
