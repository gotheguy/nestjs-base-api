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
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(":id")
  @Header('Content-Type','application/json')
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productsService.getProduct(prodId);
    return product;
  }

  @Patch(":id")
  @Header('Content-Type','application/json')
  async updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDescription: string, @Body('price') prodPrice: number) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
    return null;
  }

  @Delete(":id")
  @Header('Content-Type','application/json')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
