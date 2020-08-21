import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor() { }

  transform(value: string, search: string): SafeHtml {
    // null checks
    if (!search || !value) {
      return value;
    }
    const re = new RegExp(search, 'gi');
    return value.toString().replace(re, '<mark>$&</mark>');
  }

}
