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
export class LogEventoExpirarService {

    private path = 'logeventoexpirar/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {

    }

    /** Cadastra Sistemas */
    setLogEventoExpirar(logTempoExpirar): Observable<any[]> {

        var params = [
            {
                TipoLog: logTempoExpirar.codErro,
                DataTempoExpirar: logTempoExpirar.tempoExpirarErro,
                ativo: true
            },
            {
                TipoLog: logTempoExpirar.codAlerta,
                DataTempoExpirar: logTempoExpirar.tempoExpirarAlerta,
                ativo: true
            },
            {
                TipoLog: logTempoExpirar.codSucesso,
                DataTempoExpirar: logTempoExpirar.tempoExpirarSucesso,
                ativo: true
            }
        ];

        return this.http.post(this.httpUtil.url(this.path), params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Cadastra Sistemas */
    updateLogEventoExpirar(logTempoExpirar): Observable<any[]> {


        
        var params =  [
            {
                codLogEventoExpirar: logTempoExpirar.codEventoErro,
                TipoLog: logTempoExpirar.codErro,
                DataTempoExpirar: logTempoExpirar.tempoExpirarErro,
                ativo: true
            },
            {
                codLogEventoExpirar: logTempoExpirar.codEventoAlerta,
                TipoLog: logTempoExpirar.codAlerta,
                DataTempoExpirar: logTempoExpirar.tempoExpirarAlerta,
                ativo: true
            },
            {
                codLogEventoExpirar: logTempoExpirar.codEventoSucesso,
                TipoLog: logTempoExpirar.codSucesso,
                DataTempoExpirar: logTempoExpirar.tempoExpirarSucesso,
                ativo: true
            }
        ];

        return this.http.put(this.httpUtil.url(this.path), params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Retorna Todos Sistemas */
    getAllLogEventoExpirar(): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + "getAll")
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }


}


