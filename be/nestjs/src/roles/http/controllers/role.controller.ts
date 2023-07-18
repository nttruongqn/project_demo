import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { RoleService } from 'src/roles/services/role.service';

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all roles',
    description: 'Get all roles',
  })
  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }
}
