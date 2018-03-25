import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtilService } from './http-util.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class TransferredService {

    private path = 'Transferred/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {

    }

    /** Cadastra Translado */
    setTransferred(translado): Observable<any[]> {
        var params = translado;
        return this.http.post(this.httpUtil.url(this.path), params, this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Edita Translado */
    updateTransferred(translado): Observable<any[]> {
        var params = translado;
        return this.http.put(this.httpUtil.url(this.path), params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Retorna Todos Translados */
    getAllTransferred(): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + "get")
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Exclui Translado */
    deleteTransferred(codTranslado): Observable<any[]> {
        return this.http.delete(this.httpUtil.url(this.path) + "/" + codTranslado)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }
}


