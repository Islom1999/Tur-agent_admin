import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject} from 'rxjs';
import { ImageService } from 'src/app/shared/services/image.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { BaseService } from '../../services/base-api.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { debounceTime, distinctUntilChanged, startWith} from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export abstract class BaseListComponent<T> {
  paginatedItems$: Observable<T[]> = this.baseService.paginatedItems$;
  isLoading$ = this.baseService.isLoading$
  Loading = true;
  searchTerm: string = '';
  page: number = 1;
  limit: number = 10;
  total: number = 0;

  constructor(
    protected baseService: BaseService<T>,
    protected imageSvc: ImageService,
    protected drawerService: DrawerService,
    protected breadcrumbService: BreadcrumbsService,
    protected NzdService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
    this.loadEntities();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadEntities();
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement)?.value || '';
    this.searchTerm = searchTerm;
    this.page = 1;

    // So'rovni kechiktirish
    setTimeout(() => {
      if (this.searchTerm === searchTerm) {
        if (searchTerm === '') {
          // Agar input qiymati bo'sh bo'lsa, boshlang'ich ma'lumotlarni qayta yuklash
          this.loadInitialData();
        } else {
          // Agar input qiymati bo'lsa, yangilangan ma'lumotlarni yuklash
          this.loadEntities();
        }
      }
    }, 500); // Kechiktirish vaqti (masalan, 500 millisekund)
  }



  private loadInitialData(): void {
    // Boshlang'ich holatdagi ma'lumotlarni yuklash logikasi
    // Misol uchun, birinchi sahifadagi barcha ma'lumotlarni yuklash
    this.searchTerm = '';
    this.page = 1;
    this.loadEntities();
  }


  private loadEntities(): void {
    this.Loading = true;
    this.baseService.getPaginatedItems(this.page, this.limit, this.searchTerm)
      .subscribe({
        next: data => {
          this.Loading = false;
          this.total = data.total;
          this.baseService.updatePaginatedItemsList(data.items);
        },
        error: error => {
          this.Loading = false;
          // Agar xatolik yuz berganda, table'ni bo'sh qilish
          this.baseService.updatePaginatedItemsList([]);
        }
      });
  }

  // private loadEntities(): void {
  //   this.Loading = true;
  //   this.baseService.getPaginatedItems(this.page, this.limit, this.searchTerm)
  //     .subscribe({
  //       next: data => {
  //         this.Loading = false;
  //         this.total = data.total; 
  //         this.baseService.updatePaginatedItemsList(data.items);
  //       },
  //       error: error => {
  //         this.baseService.updatePaginatedItemsList([]);
  //         this.Loading = false;
  //       }
  //     });
  // }

  abstract setBreadcrumbs(): void;

  abstract openDrawerForCreate(): void;

  abstract openDrawerForUpdate(entity: T): void;

  getImageUrl(image: string): string {
    return this.imageSvc.getImageUrl(image);
  }

  listOfColumn: any[] = [];

}