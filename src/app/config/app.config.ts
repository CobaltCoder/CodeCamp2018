import {map} from 'rxjs/operators';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Config {

    private _config: Object
    private _env: Object
    private _configCustom: Object

    constructor(private http: Http) {
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/env.json')
                .pipe(map(res => res.json()))
                .subscribe((env_data) => {
                    this._env = env_data;
                    this.http.get('assets/config.' + env_data.env + '.json')
                        .pipe(map(res => res.json()))
                        .subscribe((data) => {
                            this._config = data;
                            resolve(true);
                        });
                });

        });
    }

    getEnv(key: any) {
        return this._env[key];
    }

    get(key: any) {
        return this._config[key];
    }

    set(key: any, val: any) {
        this._config[key] = val;
    }
};