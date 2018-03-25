import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
import * as globalConst from '../../constants';

@Injectable()
export class HttpUtilService {
 
	private API_URL: string = globalConst.baseAPI; 
 
	url(path: string) {
		return this.API_URL + path;
	}
 
	headers() {
		let headersParams = { 
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		 };
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));	
		if (currentUser.token) {
			headersParams['Authorization'] = 'Bearer ' + currentUser.token;	
		}
		let headers = new Headers(headersParams);
		let options = new RequestOptions({ headers: headers });
				
		return options;
	}
 
	extrairDados(response: Response) {
		let data = response.json();
    	return data || {};
  	}
 
  	processarErros(erro: any) {
		let err: any = {
			msg: '',
			status: ''
		};
		err.msg = (erro.message) ? erro.message : erro.status ? `${erro.status} - ${erro.statusText}` : 'Server error';
		err.status = erro.status;
		return Observable.throw(err);
	}

}


