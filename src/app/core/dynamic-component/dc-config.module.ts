import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { ConfigOption } from '../../core/dynamic-component/services/dc.config';
import { DcModule } from '../../core/dynamic-component/Dc.module';
import { Hellow } from './components/hellow';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
    types: [
        {
            name: 'template',
            component: Hellow,
            wrappers: ['form-field-horizontal']
        },
        {
            name: 'form',
            component: Hellow,
            wrappers: ['form-field-horizontal']
        },
        {
            name: 'grid',
            component: Hellow,
            wrappers: ['form-field-horizontal']
        }
    ]
};
@NgModule({
    declarations: [
        Hellow
    ],
    entryComponents: [
        Hellow
    ],
    imports: [
        CommonModule,
        DcModule.forRoot(BOOTSTRAP_FORMLY_CONFIG)
    ],
})
export class DcConfigModule { }
