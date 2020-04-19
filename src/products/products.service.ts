import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title: title, 
            description: description, 
            price: price
        });
        const product = await newProduct.save();
        return product;
    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    async getProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(prodId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        const updatedProduct = await this.findProduct(prodId);
        if(prodTitle) {
            updatedProduct.title = prodTitle;
        }
        if(prodDescription) {
            updatedProduct.description = prodDescription;
        }
        if(prodPrice) {
            updatedProduct.price = prodPrice;
        }
        updatedProduct.save();
        return updatedProduct;
    }

    async deleteProduct(prodId: string) {
        await this.productModel.deleteOne({_id: prodId}).exec();
    }

    private async findProduct(id: string): Promise<Product> {
        let product
        try {
            product = await this.productModel.findById(id).exec();
            if(!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        }
        catch(error) {
            throw new NotFoundException('Product not found');
        }
    }
}
 