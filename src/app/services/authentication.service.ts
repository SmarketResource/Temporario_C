import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import * as globalConst from '../../constants';

@Injectable()
export class AuthenticationService {
    private url = globalConst.baseAPIToken + "login/";
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) {

    }

    /*Autentica Usário*/
    authentication(acesso: any): Observable<boolean> {
        let resp: any;

        let body = {
            login: acesso.login,
            password: acesso.password
        }

        return this.http.post(this.url, body, this.options)
            .map((response: Response) => {
                resp = response.json();
                if (resp.isSucceed && resp.data.isAuthenticated) {
                    localStorage.setItem('currentUser', JSON.stringify({
                        isAuthenticated: resp.data.isAuthenticated,
                        expiration: resp.data.created,
                        created: resp.data.expiration,
                        token: resp.data.token
                    }));
                    return resp;
                }
                else {
                    return resp;
                }
            });
    }

    usuarioEstaAutenticado(): boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            return true;
        }
        else {
            return false;
        }
    }

    logout(): void {
        localStorage.clear();
    }
}
