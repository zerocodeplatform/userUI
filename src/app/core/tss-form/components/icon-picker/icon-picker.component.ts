import { Http } from '@angular/http';
import { Component, OnInit, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IconPickerComponent),
    multi: true
};

@Component({
    selector: 'app-icon-picker',
    templateUrl: './icon-picker.component.html',
    styleUrls: ['./icon-picker.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class IconPickerComponent implements OnInit {
    dropDownList: any = [];
    searchKey: any = {};
    private _value: any = '';
    iconsList: any = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getIconList();
    }

    selectedIcon(content, env, icon) {
        this.value = icon.icon;
        content.hide(env);
    }

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    writeValue(value: any) {
        this._value = value;
        this.onChange(value);
    }

    onChange = (_) => {
    }
    onTouched = () => {
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public getIconList() {
        this.http.get('assets/json/icon.json').subscribe(res => {
            if (res) {
                let result: any;
                const iconsListData: any = [];
                result = res;
                // console.log('result', result);
                result.forEach((data) => {
                    // let obj: any = {};
                    const temp: any = [];
                    for (const key in data.data) {
                        if (data.data.hasOwnProperty(key)) {
                            temp.push({ label: data.data[key], icon: key });
                        }
                    }
                    iconsListData.push({ 'fontName': data.fontName, 'list': temp });
                });
                this.iconsList = iconsListData;
            }
        });
    }

}
