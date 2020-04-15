import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProducts() {
        return [...this.products];
    }

    getProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return {...product};
    }

    updateProduct(prodId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = {...product};
        updatedProduct.title = prodTitle;
        updatedProduct.description = prodDescription;
        updatedProduct.price = prodPrice;

        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id == id);
        const product = this.products[productIndex];
        if(!product) {
            throw new NotFoundException('Product not found');
        }
        return [product, productIndex];
    }
}
 