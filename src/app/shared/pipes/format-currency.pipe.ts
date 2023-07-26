import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(money: number, unit?: string): string {
    return (money ? money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0') + (unit ? unit : '');
  }

  transformText(input: any, args?: any): any {
    let exp,
      suffixes = [' nghìn', ' triệu', ' tỷ'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));
    if (args) {
      let argString = '.';
      for (let i = 0; i < args; i++) {
        argString = argString.concat('0');
      }

      if ((input / Math.pow(1000, exp)).toFixed(args).includes(argString)) {
        return (input / Math.pow(1000, exp)).toFixed(args).replace(argString, '') + suffixes[exp - 1];
      } else {
        return (input / Math.pow(1000, exp)).toFixed(args).replace(/\./g, ',') + suffixes[exp - 1];
      }
    } else {
      return (input / Math.pow(1000, exp)).toString().replace(/\./g, ',') + suffixes[exp - 1];
    }
  }
}
