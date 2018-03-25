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
export class LogService {

    private path = 'log/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {

    }

    /** Cadastra Sistemas */
    getListLog(filtros): Observable<any[]> {

        var params = {
            codLoja: filtros.codLoja,
            dataFim: filtros.dataFim,
            dataInicio: filtros.dataInicio,
            pagina: filtros.pagina,
            sistemas: [filtros.sistema],
            tipoLog: filtros.tipoLog
        }

        return this.http.post(this.httpUtil.url(this.path) + 'getlist', params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    getbysystem(filtros): Observable<any[]> {

        var params = {
            codLoja: filtros.codLoja,
            sistemas: [filtros.sistemas]
        }

        if (params.sistemas[0] == "") {
            params.sistemas = null;
        }

        return this.http.post(this.httpUtil.url(this.path) + 'getbysystem', params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    getCountLogs(filtros): Observable<any[]> {

        var params = {
            codLoja: filtros.codLoja,
            dataFim: filtros.dataFim,
            dataInicio: filtros.dataInicio,
            pagina: filtros.pagina,
            sistemas: [filtros.sistema],
            tipoLog: filtros.tipoLog
        }

        return this.http.post(this.httpUtil.url(this.path) + 'getcount', params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    resendlog(codLog): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + "resendlog?codLog=" + codLog)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }


}


