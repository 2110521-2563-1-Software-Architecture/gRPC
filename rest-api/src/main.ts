import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import http = require('http');
import http2 = require('http2');
import express = require('express');
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const server: any = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      {
        cors: true,
      },
    );

    const options = new DocumentBuilder()
      .setTitle('Soft Arch')
      .setDescription('Soft Arch')
      .setVersion('1.0')
      .addTag('SA')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.init();

    http.createServer(server).listen(3000);
    http2.createServer(server).listen(3001);
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
