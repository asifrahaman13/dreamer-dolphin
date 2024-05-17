import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

@Injectable()
export class CustomConfigService {
  // Define a private readonly yamlConfig property
  private readonly yamlConfig: Record<string, any>;

  constructor(private readonly configService: ConfigService) {
    // Load the config.yaml file and assign it to the yamlConfig property
    this.yamlConfig = yaml.load(
      readFileSync(join(__dirname, '../../config.yaml'), 'utf8'),
    ) as Record<string, any>;
  }

  get(key: string): any {
    // Return the value from the ConfigService if it exists, otherwise return the value from the yamlConfig property
    return this.configService.get(key) || this.yamlConfig[key];
  }

  getDatabaseConfig() {
    // Return the database configuration

    console.log('The database host', this.get('DATABASE_HOST'));
    return {
      host: this.get('DATABASE_HOST'),
      port: parseInt(this.get('DATABASE_PORT'), 10) || 5432,
    };
  }

  getMongoUri(): string {
    return this.get('MONGO_URI') || 'mongodb://localhost/nest';
  }

  getPort(): number {
    const port = parseInt(this.get('PORT'), 10) || 3000;
    console.log('The port', port);
    // Return the port number.
    return port;
  }
}

export { ConfigService };
