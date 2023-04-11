import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseIntPipe,
	Res,
	UseGuards,
	HttpStatus,
	Put,
	Logger,
	Request,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product } from './entities/products.entity';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { uploadToS3 } from '../../upload/aws-s3-upload';
import { FileInterceptor } from '@nestjs/platform-express/multer';



@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	logger = new Logger('HTTP');

	@Post('/')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Body() body,
		@Res() res: Response
	) {
		const fileName = file.originalname;
		console.log('file.buffer', file.buffer);
		try {
			const accessPath = await uploadToS3({
				Bucket: 'alphafile',
				Key: `${fileName}`,
				ContentType: `${file.mimetype}`,
				Body: file.buffer
			});

			console.log(accessPath);
			res.json({ accessPath: accessPath });
			// 	});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
	// async create(@Body() createProductDto: CreateProductDto) {
	// 	return await this.productsService.create(createProductDto);
	// }

	@Get()
	async findAll(): Promise<Product[]> {
		return await this.productsService.findAll();
	}

	@Get('/Course')
	async findCourse(): Promise<Product[]> {
		return await this.productsService.findCourse("course");
	}

	@Get('/Note')
	async findNote(): Promise<Product[]> {
		return await this.productsService.findNote("note");
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.remove(id);
	}
}
