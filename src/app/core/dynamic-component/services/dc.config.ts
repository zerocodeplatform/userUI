import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class DcConfig {
    types: { [name: string]: TypeOption } = {};
    constructor(@Inject('config') private config: ConfigOption) {
    }
    getType(name: string): TypeOption {
        // if (!this.types[name]) {
        //     throw new Error(`[Formly Error] There is no type by the name of "${name}"`);
        // }
        let resType: any;
        this.config.types.forEach(type => {
            if (name === type.name) {
                resType = type;
                return false;
            }
        });
        if (!resType) {
            throw new Error(`[Formly Error] There is no type by the name of "${name}"`);
        }
        return resType;
    }

}

export interface ConfigOption {
    types?: TypeOption[];

}
export interface TypeOption {
    name: string;
    component?: any;
    wrappers?: string[];
    extends?: string;
}
