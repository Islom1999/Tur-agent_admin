import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBlog } from 'src/interfaces';
import { BlogService } from '../../service/blog.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  blogs$: Observable<IBlog[]> = of([])
  isDisabled!: boolean;

  constructor(
    private blogScv: BlogService,
    private permission : PermissionService,
    private breadcrumbService: BreadcrumbsService,
    private permissionsService: NgxPermissionsService,
    private messageSvc: NzMessageService,
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Blog List', label: 'Blog', url: 'blog' }
    ])
  }

  ngOnInit(): void {
    this.blogs$ = this.blogScv.blog$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  delete(id:any){
    this.blogScv.deleteBlog(id).subscribe(() => {
      this.messageSvc.success('Product deleted successfully')
    })
  }
  
  cancel(){
    this.messageSvc.info('Product delete cancelled')
  }
}
