import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        NzTableModule,
        ReactiveFormsModule,
        NzInputModule,
        NzIconModule,
        NzButtonModule,
        NzDrawerModule,
        NzFormModule,
        NzSelectModule,
        FormsModule,
        NzMessageModule,
        NzSpinModule,
        NzPaginationModule,
        HttpClientModule,
        NzInputNumberModule,
        NzSwitchModule,
        NgxPermissionsModule,
        NzToolTipModule,
        TranslateModule.forChild({
            extend: true
        })
    ],
    exports: [
        CommonModule,
        NzTableModule,
        ReactiveFormsModule,
        NzInputModule,
        NzIconModule,
        NzButtonModule,
        NzDrawerModule,
        NzFormModule,
        NzSelectModule,
        FormsModule,
        NzMessageModule,
        NzSpinModule,
        NzPaginationModule,
        HttpClientModule,
        NzInputNumberModule,
        NzSwitchModule,
        NgxPermissionsModule,
        NzToolTipModule,
        TranslateModule
    ]
})
export class BaseModule { }
