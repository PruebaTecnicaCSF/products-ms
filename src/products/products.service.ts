import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { PaginationDto } from 'src/common';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.product.count({ where: { rowStatus: true } });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          rowStatus: true,
        },
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: string) {
    const product = await this.product.findFirst({
      where: { id, rowStatus: true },
    });

    if (!product) {
      throw new RpcException({
        message: `Product with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return {
      data: [product],
      meta: {
        total: product?1:0,
        page: 1,
        lastPage: 1,
      },
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    const product = await this.product.update({
      where: { id },
      data: {
        rowStatus: false,
      },
    });

    return product;
  }

  async validateProducts(ids: string[]) {
    ids = Array.from(new Set(ids));

    const products = await this.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    if ( products.length !== ids.length ) {
      throw new RpcException({
        message: 'Some products were not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }


    return products;

  }

  async updateStock(updateProductStockDto: UpdateProductStockDto) {
    try {
      
      const updateData = {
        stock: updateProductStockDto.newStock,
        lastCostPrice: updateProductStockDto.lastCostPrice,
      };

      if (!updateProductStockDto.lastCostPrice)
        delete updateData.lastCostPrice;

      return await this.product.update({
        where: { id: updateProductStockDto.productId, rowStatus: true },
        data: updateData,
      });
    } catch (error: any) {
      this.logger.error(`Error actualizando stock para el producto ${updateProductStockDto.productId}: ${error.message}`);
      
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `No se pudo actualizar el stock. Producto con ID ${updateProductStockDto.productId} no encontrado.`,
      });
    }
  }

}
