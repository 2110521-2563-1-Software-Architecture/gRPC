import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const http = require('http');
const http2 = require('http2');
const express = require('express');
const fs = require('fs');
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const httpsOptions = {
      key: fs.readFileSync('C:\\Users\\beebe\\Desktop\\Project_Year4\\gRPC\\rest-api\\key\\server.key'),
      cert: fs.readFileSync('C:\\Users\\beebe\\Desktop\\Project_Year4\\gRPC\\rest-api\\key\\server.crt'),
    };
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      cors: true,
    });

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
    http2.createServer(httpsOptions, server).listen(443);

  } catch (e) {
    console.error(e);
  }
}
bootstrap();
