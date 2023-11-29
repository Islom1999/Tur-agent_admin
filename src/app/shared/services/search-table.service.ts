import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTableService {

  search<T>(data$: Observable<T[]>, term: string, field: keyof T): Observable<T[]> {
    if (!term.trim()) {
      return data$;
    }

    return data$.pipe(
      map(data =>
        data.filter(item => {
          const value = item[field];

          if (typeof value !== 'string') {
            // Massage service ishga tushadi inputga kiritilgan value string emasligi haqida
            return false;
          }
          return value.toLowerCase().includes(term.toLowerCase());
        })
      )
    );
  }
}
