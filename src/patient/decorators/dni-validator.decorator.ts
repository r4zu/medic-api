import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Patient } from '../entities/patient.entity';

@ValidatorConstraint({ async: false })
export class IsValidDniConstraint implements ValidatorConstraintInterface {
  validate(dni: any, args: ValidationArguments): Promise<boolean> | boolean {
    const patient = args.object as Patient;
    const dniType = patient.dniType;
    if (dniType === 'cedula' || dniType === 'pasaporte') {
      return typeof dni === 'string' && dni.length >= 8 && dni.length <= 10;
    }
    if (dniType === 'ruc') {
      return typeof dni === 'string' && dni.length === 13;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const patient = args.object as Patient;
    const dniType = patient.dniType;
    if (dniType === 'cedula' || dniType === 'pasaporte') {
      return "'cedula' or 'passport' must have 8 to 10 characters.";
    }
    if (dniType === 'ruc') {
      return "'ruc' must have 13 characters.";
    }
    return 'Invalid dni';
  }
}

export function IsValidDni(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDniConstraint,
    });
  };
}
