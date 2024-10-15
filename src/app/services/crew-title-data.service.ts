import { Injectable } from '@angular/core';
import { CREW_TITLES } from '../data-source/crew-title-data';

@Injectable({
  providedIn: 'root'
})
export class CrewTitleDataService {
  getCrewTitles(): string[] {
    return CREW_TITLES;
  }
}