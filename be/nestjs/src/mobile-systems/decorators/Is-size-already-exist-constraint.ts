import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SizeEntity } from 'src/mobile-systems/entities/size.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsSizeAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly sizeRepo: Repository<SizeEntity>) {}

  validate(name: any) {
    return this.sizeRepo.findOneBy(name).then((size) => {
      if (size) return false;
      return true;
    });
  }
}

export function IsSizeAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSizeAlreadyExistConstraint,
    });
  };
}
