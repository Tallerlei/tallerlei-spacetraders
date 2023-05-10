import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  public static getTextBeforeLastIndexOf(text: string, separator: string) {
    const index = text.lastIndexOf(separator);
    const partOfText = text.substring(0, index);
    return partOfText;
  }
}
