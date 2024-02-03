import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.orderService.create({
      ...createOrderDto,
      clientId: req['user'].sub,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.orderService.findAll(req['user'].sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.orderService.findOne(id, req['user'].sub);
  }
}
