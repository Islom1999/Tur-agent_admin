import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IHighlight } from 'src/interfaces';
import { HighlightService } from '../../service/highlight.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-highlight-detail',
  templateUrl: './highlight-detail.component.html',
  styleUrls: ['./highlight-detail.component.scss']
})
export class HighlightDetailComponent {
  permissionsTypes = Object.values(Permissions);
  highlight!: IHighlight;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;
  package_id!: string

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private highlightService: HighlightService,
    private drawerRef: NzDrawerRef,
    private messageSvc: NzMessageService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      info_en: new FormControl('', [Validators.required]),
      info_ru: new FormControl('', [Validators.required]),
      info_ne: new FormControl('', [Validators.required]),
      info_id: new FormControl('', [Validators.required]),
    });   
    if (this.highlight) {
      this.isLoading$ = true; 
      this.highlightService.getById(this.highlight.id as string).subscribe(data => {
        this.form.patchValue(data)
        this.isLoading$ = false;
      })
    }
    console.log(this.package_id);
    
  }


  close() {
    this.drawerRef.close()
  }

  submitData() {
    if (this.isFormInvalid()) return;

    const data = this.prepareData();

    if (this.highlight && this.highlight.id) {
      this.updateHighlight(this.highlight.id, data);
    } else {
      this.createHighlight(data);
    }
  }

  private isFormInvalid(): boolean {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return true;
    }
    return false;
  }

  private prepareData(): any {
    const { 
      info_en, info_id, info_ne, info_ru
    } = this.form.getRawValue();
    return { 
      info_en, info_id, info_ne, info_ru,
      package_id: this.package_id
    };
  }

  private updateHighlight(id: string, data: IHighlight) {
    this.highlightService.updateHighlight(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createHighlight(data: IHighlight) {
    this.highlightService.addHighlight(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.highlightService.deleteHighlight(this.highlight.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }
}
