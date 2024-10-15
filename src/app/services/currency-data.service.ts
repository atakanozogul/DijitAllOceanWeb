import { Injectable } from '@angular/core';
import { CURRENCIES } from '../data-source/currency-data';

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {
  getCurrencies(): string[] {
    return CURRENCIES;
  }
}