import { Transform } from 'class-transformer';
import { parse, isValid } from 'date-fns';

export function TransformDate() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      const date = parse(value, 'dd-MM-yyyy', new Date());
      if (isValid(date)) {
        return date;
      }
    }
    return value;
  });
}
