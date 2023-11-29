import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T> {
    isLoading$ = new BehaviorSubject<boolean>(false);
    isLoading = this.isLoading$.asObservable();

    paginatedItemsSubject = new BehaviorSubject<T[]>([]);
    paginatedItems$ = this.paginatedItemsSubject.asObservable();

    allItemsSubject = new BehaviorSubject<T[]>([]);
    allItems$ = this.allItemsSubject.asObservable();


    constructor(protected http: HttpClient, protected apiUrl: string) {
        this.getPercentagedItems();
        this.getAllItems();
    }

    // Mahsulotlar ro'yxatini yangilash
    updatePaginatedItemsList(items: T[]): void {
        this.paginatedItemsSubject.next(items || []);
    }

    updateAllItemsList(items: T[]): void {
        this.allItemsSubject.next(items || []);
    }

    // Yuklash holatini boshqarish
    updateLoadingStatus(state: boolean): void {
        // this.isLoading$Subject.next(state);
    }

    // HTTP so'rovi uchun parametrlarni yaratish
    generateHttpParams(page: number, limit: number, search: string | ''): HttpParams {
        return new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('search', search);
    }

    // Sahifalash bilan birga mahsulotlar ro'yxatini olish
    getPaginatedItems(page: number = 1, limit: number = 10, search: string = ''): Observable<{ items: T[], total: number }> {

        const params = this.generateHttpParams(page, limit, search);

        return this.http.get<{ data: T[], count: number }>(`${this.apiUrl}/percentage`, { params })
            .pipe(
                map(response => ({ items: response.data, total: response.count })),
                catchError(() => {
                    return of({ items: [], total: 0 });
                })
            );
    }

    // Barcha mahsulotlarni olish
    getPercentagedItems() {
        this.updateLoadingStatus(true);

        this.http.get<{ data: T[] }>(`${this.apiUrl}/percentage`)
            .pipe(
                map(response => response && response.data ? response.data : []),
                catchError(error => {
                    console.error(error);
                    return of([]);
                })
            )
            .subscribe(data => {
                this.updatePaginatedItemsList(data);
                this.updateLoadingStatus(false);
            });
    }

    getAllItems() {
        this.updateLoadingStatus(true);
        this.http.get<T[]>(`${this.apiUrl}`)
            .subscribe(res => {
                this.updateAllItemsList(res);
                this.updateLoadingStatus(false);
            });
    }

    // Yangi mahsulot qo'shish
    addItem(item: Partial<T>): Observable<T> {
        return this.http.post<T>(this.apiUrl, item)
            .pipe(
                tap(newItem => {
                    const currentItems = this.paginatedItemsSubject.getValue();
                    this.updatePaginatedItemsList([...currentItems, newItem]);
                })
            );
    }

    // Mavjud mahsulotni yangilash
    updateItem(id: string, updatedItem: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${id}`, updatedItem)
            .pipe(tap(updatedData => {
                const currentItems = this.paginatedItemsSubject.getValue();
                const updatedItems = currentItems.map(item => (item as any).id === id ? updatedData : item);
                this.updatePaginatedItemsList(updatedItems);
            }));
    }

    // Mahsulotni o'chirish
    deleteItem(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(tap(() => {
                const currentItems = this.paginatedItemsSubject.getValue();
                const filteredItems = currentItems.filter(item => (item as any).id !== id);
                this.updatePaginatedItemsList(filteredItems);
            }));
    }

    // Id bo'yicha mahsulotni olish
    getItemById(id: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`);
    }

    // ParentId bo'yicha mahsulotni olish
    getItemsByParentId(makerId: string): Observable<T[]> {
        return this.http.get<T[]>(`${this.apiUrl}/${makerId}`);
    }

}
