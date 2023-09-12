import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmRearCameraEntity } from '../entities/film-rear-camera.entity';

@Injectable()
export class FilmRearCameraService {
  constructor(
    @InjectRepository(FilmRearCameraEntity)
    private filmRearCameraRepo: Repository<FilmRearCameraEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.filmRearCameraRepo.find();
  }

  async create(name: string): Promise<string> {
    const filmRearCamera = await this.filmRearCameraRepo.save({ name });
    return filmRearCamera.id;
  }

  async delete(id: string) {
    await this.filmRearCameraRepo.delete(id);
  }
}
