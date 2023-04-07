import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	app.enableCors();

	//   app.use(bodyParser.json({limit: '50000mb'}));
	// app.use(bodyParser.urlencoded({ extended: true,limit: '50000mb'}));
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		})
	);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
	console.log('http://192.168.1.200:3000');
}
bootstrap();
