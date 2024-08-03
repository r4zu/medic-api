// custom-days-validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidDaysConstraint implements ValidatorConstraintInterface {
  validate(days: string[]): boolean {
    const validDays = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ];
    return days.every((day) => validDays.includes(day.toLowerCase()));
  }

  defaultMessage(): string {
    return "Los días deben ser 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado' o 'domingo'";
  }
}

export function IsValidDays(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDaysConstraint,
    });
  };
}
