import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter,NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// const https = require('https');
// const http2 = require('http2');
// const express = require('express');
const fs = require('fs');
// import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    // const httpsOptions = {
    //   key: fs.readFileSync('C:\\Users\\beebe\\Desktop\\Project_Year4\\gRPC\\rest-api\\key\\server.key'),
    //   cert: fs.readFileSync('C:\\Users\\beebe\\Desktop\\Project_Year4\\gRPC\\rest-api\\key\\server.crt'),
    // };
    // const opt : { https: any} = {
    //       https: httpsOptions
    // }
    const app = await NestFactory.create<NestFastifyApplication>(
    	AppModule,
    	// new FastifyAdapter(opt)
  	);

    // const server: any = express();
    // const app = await NestFactory.create(
    //   AppModule,
    //   new ExpressAdapter(server),
    //   {
    //     cors: true,
    //   },
    // );

    const options = new DocumentBuilder()
      .setTitle('Soft Arch')
      .setDescription('Soft Arch')
      .setVersion('1.0')
      .addTag('SA')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
    
    await app.listen(3000)

    // await app.init();
    // http2.createServer(httpsOptions,server).listen(443);
    // https.createServer(httpsOptions, server).listen(3000);

  } catch (e) {
    console.error(e);
  }
}
bootstrap();
