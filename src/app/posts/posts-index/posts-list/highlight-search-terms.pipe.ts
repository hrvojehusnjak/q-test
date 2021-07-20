import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'highlightSearchTerms'
})
export class HighlightSearchTermsPipe implements PipeTransform {
  transform(value: string | null, args: any[]): string | null {
    if (!value || !args || !args.every((arg) => !!arg)) {
      return value
    }
    for (const text of args) {
      var textRegex = new RegExp(text, 'gi')
      value = value.replace(
        textRegex,
        `<span class="highlight-search-text">${text}</span>`
      )
    }

    return value
  }
}
