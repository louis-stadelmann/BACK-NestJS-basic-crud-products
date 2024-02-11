import { Transform } from 'class-transformer';
import * as ck from 'check-types';

export function TransformToObject() {
  return Transform(({ value }) => {
    if (ck.nonEmptyString(value)) {
      return JSON.parse(value);
    }
    return value;
  });
}
