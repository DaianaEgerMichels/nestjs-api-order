import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createOrderDto: CreateOrderDto & { clientId: number }) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepository.findBy({
      id: In(uniqueProductIds),
    });

    if (products.length !== uniqueProductIds.length) {
      throw new Error(
        `Some product does not exist. Past products ${productIds}, products found ${products.map((product) => product.id)}`,
      );
    }

    const order = Order.create({
      clientId: createOrderDto.clientId,
      items: createOrderDto.items.map((item) => {
        const product: Product = products.find((product) => product.id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    });
    await this.orderRepository.save(order);
    return order;
  }

  findAll(clientId: number) {
    return this.orderRepository.find({
      where: {
        clientId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string, clientId: number) {
    return this.orderRepository.findOneByOrFail({
      id,
      clientId,
    });
  }
}
