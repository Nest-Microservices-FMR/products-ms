import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //@Post()
  @MessagePattern({ cmd: 'create-product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'find-all' })
  findAll(@Payload() paginationDto: PaginationDto) {


    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'find-one' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update-one' })
  update(
    //@Param('id', ParseIntPipe) id: number, 
    //@Body() updateProductDto: UpdateProductDto),
    @Payload() updateProductDto: UpdateProductDto) {

    return this.productsService.update(updateProductDto.id, updateProductDto);

  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete-one' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
