import { Injectable } from '@angular/core';
import { NATIONALITIES } from '../data-source/nationality-data';

@Injectable({
  providedIn: 'root'
})
export class NationalityDataService {
  getNationalities(): string[] {
    return NATIONALITIES;
  }
}