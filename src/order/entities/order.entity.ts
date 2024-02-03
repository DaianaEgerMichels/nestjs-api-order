import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderItem } from './order-item.entity';
import { CreateOrderCommand } from '../type/create-order-command.type';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  _total: number;

  // user authenticated
  @Column()
  _clientId: number;

  @Column()
  _status: OrderStatus;

  @CreateDateColumn()
  _createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: ['insert'] })
  _items: OrderItem[];

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

  get clientId(): number {
    return this._clientId;
  }

  set clientId(clientId: number) {
    this._clientId = clientId;
  }

  get status(): OrderStatus {
    return this._status;
  }

  set status(status: OrderStatus) {
    this._status = status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set items(items: OrderItem[]) {
    this._items = items;
  }

  // richest way to do this

  static create(input: CreateOrderCommand) {
    const order = new Order();
    order.clientId = input.clientId;
    order.items = input.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      return orderItem;
    });
    order.total = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    return order;
  }
}
