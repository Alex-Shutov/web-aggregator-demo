import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRolesEntity } from '@app/roles/entities/projectRoles.entity';

@Injectable()

export class RolesService {
  constructor(@InjectRepository(ProjectRolesEntity)  private readonly projectRolesRepository:Repository<ProjectRolesEntity>) {
  }

  async create(createRoleDto: CreateRoleDto) {
    return this.projectRolesRepository.save(createRoleDto)
  }

  async findAll() {
    return await this.projectRolesRepository.find()
  }

  findOne(id: string) {
    return this.projectRolesRepository.findOneBy({ id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.projectRolesRepository.findOneBy({ id });
    if (!role) return null;
    this.projectRolesRepository.merge(role, updateRoleDto);
    return this.projectRolesRepository.save(role);
  }

  async remove(id: string) {
    await this.projectRolesRepository.delete(id)
    return { success: true }
  }
}
