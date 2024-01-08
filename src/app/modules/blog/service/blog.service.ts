import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlog } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogSubject = new BehaviorSubject<IBlog[]>([])
  blog$ = this.blogSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/blog`;

  constructor(private http: HttpClient) {
    this.loadBlogs()
  }

  loadBlogs(): void {
    this.http.get<{ data: IBlog[] }>(`${this.apiUrl}/pagination`)
      .pipe(
        map(response => response.data)
    ).subscribe(blogs => {
      return this.blogSubject.next(blogs)
    })
  }

  addBlog(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.apiUrl, blog)
      .pipe(tap(newBlog => {
        const currentBlog = this.blogSubject.getValue()
        this.blogSubject.next([...currentBlog, newBlog])
      }))
  }

  updateBlog(id: string, updatedBlog: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.apiUrl}/${id}`, updatedBlog)
      .pipe(tap(updatedData => {
        const currentBlog = this.blogSubject.getValue();
        const updatedBlog = currentBlog.map(blog =>
          blog.id === id ? updatedData : blog
        )
        this.blogSubject.next(updatedBlog)
      }))
  }

  deleteBlog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentBlog = this.blogSubject.getValue();
        const updateBlog = currentBlog.filter(blog => blog.id !== id);
        this.blogSubject.next(updateBlog)
      }))
  }

  getAll(): Observable<IBlog[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IBlog[]>(url)
  }

  getById(id: string): Observable<IBlog> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IBlog>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IBlog> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IBlog>(url);
  }
}
