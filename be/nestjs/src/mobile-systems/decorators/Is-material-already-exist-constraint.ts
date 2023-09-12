import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MaterialService } from '../services/material.service';

@ValidatorConstraint({ async: true })
export class IsMaterialAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly materialService: MaterialService) {
    console.log('Constructor of IsMaterialAlreadyExistConstraint is called');
  }

  validate(name: any) {
    return this.materialService.findByName(name).then((material) => {
      if (material) return false;
      return true;
    });
  }
}

export function IsMaterialAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMaterialAlreadyExistConstraint,
    });
  };
}
