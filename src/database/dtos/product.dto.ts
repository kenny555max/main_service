import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name' })
  name: string;

  @ApiProperty({ example: 'This is a product description' })
  description: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  image: string;

  @ApiProperty({ example: 100 })
  available_qty: number;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 'Electronics' })
  category: string;

  @ApiProperty({ example: 'BrandName' })
  brand: string;

  @ApiProperty({ example: 1.5 })
  weight: number;

  @ApiProperty({ example: '10x5x2 cm' })
  dimensions: string;
}
