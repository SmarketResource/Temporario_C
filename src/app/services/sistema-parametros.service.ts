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
export class SistemaParametrosService {

    private path = 'SistemaParametros/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {

    }

    /** Retorna Parametros pelo código do sistema */
    getSistemaParametros(codSistema): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + 'get?' + 'codsistema=' + codSistema)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Cadastra Url */
    setUrl(parametro): Observable<any[]> {

        var params = {
            codSistema: parametro.codSistema, 
            url: parametro.url,
            prefixUrl: parametro.prefixUrl, 
            periodoDe: parametro.periodoDe, 
            periodoAte: parametro.periodoAte, 
            tempoValidacao: parametro.tempoValidacao,
            ativo: true
        }

        return this.http.post(this.httpUtil.url(this.path), params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

        /** Cadastra Url */
        updateParametros(parametro): Observable<any[]> {

            var params = {
                codSistemaParametro: parametro.codSistemaParametro, 
                codSistema: parametro.codSistema, 
                url: parametro.url, 
                prefixUrl: parametro.prefixUrl, 
                periodoDe: parametro.periodoDe, 
                periodoAte: parametro.periodoAte, 
                tempoValidacao: parametro.tempoValidacao,
                ativo: true     
            }
    
            return this.http.put(this.httpUtil.url(this.path), params)
                .map(this.httpUtil.extrairDados)
                .catch(this.httpUtil.processarErros);
        }

            /** Excluir sistema */
    deleteParametros(codParametro): Observable<any[]> {

        return this.http.delete(this.httpUtil.url(this.path) + codParametro)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

}


