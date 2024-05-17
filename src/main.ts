import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomConfigService } from './config/config.service';

async function bootstrap() {
  // Create the Nest application
  const app = await NestFactory.create(AppModule);

  // Get the custom configuration service
  const configService = app.get(CustomConfigService);

  // Get the port from the custom configuration service
  const port = configService.getPort();

  // Start the application
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
