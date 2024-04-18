import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoDecimal'
})
export class FormatoDecimalPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const numero = parseFloat(value.replace(',', '.'));
    return numero.toFixed(2);
  }
}
