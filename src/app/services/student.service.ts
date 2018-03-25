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
export class StudentService {

    private path = 'Student/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {

    }

    /** Retorna estudantes cadastrados */
    getAllStudent(): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + 'GetAll', this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    setStudent(student): Observable<any[]> {
        let params = {
                "name": student.name,
                "phone": student.phone,
                "email": student.email,
                "nickName": student.nickName
        }
        return this.http.post(this.httpUtil.url(this.path), params, this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    updateStudent(student): Observable<any[]> {
        let params = {
                "studentId": student.studentId,
                "name": student.name,
                "phone": student.phone,
                "email": student.email,
                "nickName": student.nickName
        }
        return this.http.put(this.httpUtil.url(this.path), params, this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }
}


