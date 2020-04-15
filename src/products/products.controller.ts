import { Controller, Get, Post, Patch, Delete, Header, Body, Param } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Header('Content-Type','application/json')
  addProduct(@Body('title') prodTitle: string, @Body('description') prodDescription: string, @Body('price') prodPrice: number): any {
    return this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
  }

  @Get()
  @Header('Content-Type','application/json')
  getAllProducts(): any {
    return this.productsService.getAllProducts();
  }

  @Get(":id")
  @Header('Content-Type','application/json')
  getProduct(@Param('id') prodId: string): any {
    return this.productsService.getProduct(prodId);
  }

  @Patch(":id")
  @Header('Content-Type','application/json')
  updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDescription: string, @Body('price') prodPrice: number): any {
    this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
    return null;
  }

  @Delete(":id")
  @Header('Content-Type','application/json')
  deleteProduct(@Param('id') prodId: string): any {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
