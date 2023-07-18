import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { WeightEntity } from 'src/mobile-systems/entities/weight.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly weightRepo: Repository<WeightEntity>) {}

  validate(name: any) {
    return this.weightRepo.findOneBy(name).then((weight) => {
      if (weight) return false;
      return true;
    });
  }
}

export function IsWeightAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
