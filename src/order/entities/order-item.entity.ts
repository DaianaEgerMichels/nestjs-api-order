import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ type: 'int' })
  _quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  _price: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  _product: Product;

  @Column({ name: 'productId' })
  _productId: string;

  @ManyToOne(() => Order)
  _order: Order;

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get product(): Product {
    return this._product;
  }

  set product(product: Product) {
    this._product = product;
  }

  get productId(): string {
    return this._productId;
  }

  set productId(productId: string) {
    this._productId = productId;
  }

  get order(): Order {
    return this._order;
  }

  set order(order: Order) {
    this._order = order;
  }
}
