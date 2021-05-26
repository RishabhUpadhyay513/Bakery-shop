import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: any, discount: any, ...args: unknown[]): unknown {
    value = +value + +discount;
    return value;
  }
}
