import { v4 as uuid } from 'uuid';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interface/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Fiat',
      model: 'Fiorino',
    },
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Focus',
    },
    {
      id: uuid(),
      brand: 'Peugeot',
      model: '2008',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto
    }
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, udpateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);
    // esta validación no es necesaria, es solo para probar
    if (udpateCarDto.id && udpateCarDto.id !== id) {
      throw new BadRequestException(`Car id in body not valid`);
    }
    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...udpateCarDto,
          id
        }
        return carDB;
      }
      return car
    })
    return carDB;
  }

  delete(id: string) {
    const carDB = this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id)
  }
}
