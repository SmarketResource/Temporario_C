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
export class SistemaService {

    private path = 'Sistema/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {

    }

    /** Cadastra Sistemas */
    setSistemas(sistema): Observable<any[]> {

        var params = sistema;

        return this.http.post(this.httpUtil.url(this.path), params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Cadastra Sistemas */
    updateSistemas(sistema): Observable<any[]> {

        var params = sistema;

        return this.http.put(this.httpUtil.url(this.path), params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Retorna Todos Sistemas
    getAllSistemas(paginaAtual = 1, total = 10): Observable<any[]> {

        var params = 'paginaAtual=' + paginaAtual + '&total=' + total;

        return this.http.get(this.httpUtil.url(this.path) + "get?" + params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    } */

    /** Retorna Todos Sistemas */
    getAllSistemas(): Observable<any[]> {

        return this.http.get(this.httpUtil.url(this.path) + "get")
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Excluir sistema */
    deleteSistema(codSistema): Observable<any[]> {

        return this.http.delete(this.httpUtil.url(this.path) + "/" + codSistema)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }
}


