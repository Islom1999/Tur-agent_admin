import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild({
            extend: true
        })
    ],
    exports: [
        CommonModule,
        TranslateModule
    ]
})
export class LangModule { }
