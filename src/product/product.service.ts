import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from 'src/database/dtos/product.dto';
import { ProductEntity } from 'src/database/entities/product.entities';
import { ServerError } from 'src/utils/custom-error-classes';
import { ErrorHandler } from 'src/utils/enhanced-error-manager';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<string> {
    try {
      console.log(createProductDto);
      const {
        name,
        description,
        image,
        available_qty,
        price,
        category,
        brand,
        weight,
        dimensions,
      } = createProductDto;

      const upload = this.cloudinary.uploadBase64Image(image);
      return 'cool';
    } catch (error) {
      ErrorHandler.handleError(
        'ProductService.create',
        new ServerError('Failed to create user', { error }),
      );
    }
  }
}
