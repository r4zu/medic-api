import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserInfo } from '../entities/user-info.entity';

@ValidatorConstraint({ async: false })
export class IsValidDniConstraint implements ValidatorConstraintInterface {
  validate(dni: any, args: ValidationArguments): Promise<boolean> | boolean {
    const userInfo = args.object as UserInfo;
    const dniType = userInfo.dniType;
    if (dniType === 'cedula' || dniType === 'pasaporte') {
      return typeof dni === 'string' && dni.length >= 8 && dni.length <= 10;
    }
    if (dniType === 'RUC') {
      return typeof dni === 'string' && dni.length === 13;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const userInfo = args.object as UserInfo;
    const dniType = userInfo.dniType;
    if (dniType === 'cedula' || dniType === 'pasaporte') {
      return 'El DNI para cédula o pasaporte debe tener un mínimo de 8 hasta un máximo de 10 caracteres.';
    }
    if (dniType === 'RUC') {
      return 'El DNI para RUC debe tener 13 caracteres.';
    }
    return 'El DNI no es válido';
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
