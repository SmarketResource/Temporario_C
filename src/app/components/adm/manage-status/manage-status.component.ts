import { Component, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { toast } from 'angular2-materialize';
import * as moment from 'moment';

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LogEventoExpirarService } from '../../../services/log-evento-expirar.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage-status',
  templateUrl: './manage-status.component.html',
  styleUrls: ['./manage-status.component.scss'],
  providers: [
    LogEventoExpirarService
  ]
})
export class ManageStatusComponent implements OnInit {
  public isEdit: boolean = false;
  public formStatus: FormGroup;
  public logsExpirar: any = null;

  public loadingText: string = '';

  public tempoExpirarErro: AbstractControl;
  public codErro: AbstractControl;
  public codEventoErro: AbstractControl;
  public tempoExpirarAlerta: AbstractControl;
  public codAlerta: AbstractControl;
  public codEventoAlerta: AbstractControl;
  public codSucesso: AbstractControl;
  public codEventoSucesso: AbstractControl;
  public tempoExpirarSucesso: AbstractControl;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public logEventoExpirarService: LogEventoExpirarService,
    private spinnerService: Ng4LoadingSpinnerService
    //private flashMessagesService: FlashMessagesService
  ) {

    this.formStatus = fb.group({
      tempoExpirarErro: ['', Validators.compose([Validators.required])],
      tempoExpirarAlerta: ['', Validators.compose([Validators.required])],
      tempoExpirarSucesso: ['', Validators.compose([Validators.required])],
      codErro: ['', Validators.compose([Validators.required])],
      codAlerta: ['', Validators.compose([Validators.required])],
      codSucesso: ['', Validators.compose([Validators.required])],
      codEventoErro: [''],
      codEventoAlerta: [''],
      codEventoSucesso: ['']
    })

    this.tempoExpirarErro = this.formStatus.controls['tempoExpirarErro'];
    this.codErro = this.formStatus.controls['codErro'];
    this.codEventoErro = this.formStatus.controls['codEventoErro'];
    this.tempoExpirarAlerta = this.formStatus.controls['tempoExpirarAlerta'];
    this.codAlerta = this.formStatus.controls['codAlerta'];
    this.codEventoAlerta = this.formStatus.controls['codEventoAlerta'];
    this.tempoExpirarSucesso = this.formStatus.controls['tempoExpirarSucesso'];
    this.codSucesso = this.formStatus.controls['codSucesso'];
    this.codEventoSucesso = this.formStatus.controls['codEventoSucesso'];
  }

  public ngOnInit() {
    this.codErro.setValue(3);
    this.codAlerta.setValue(2);
    this.codSucesso.setValue(1);
    this.getLogEventoExpirar();

  }

  public onSubmit(values: Object): void {
    console.log('teste');
    if (this.formStatus.valid) {
      if (!this.isEdit) {
        this.setLogEventoExpirar(values);
      }
      else {
        this.updateLogEventoExpirar(values);
      }
    }
    else {
      this.tempoExpirarErro.markAsTouched();
      this.tempoExpirarAlerta.markAsTouched();
      this.tempoExpirarSucesso.markAsTouched();
    }
  }

  /** Cadastrar Sistemas */
  public setLogEventoExpirar(logTempoExpiracao) {
    this.loadingText = 'Cadastrando...';
    this.spinnerService.show();
    this.logEventoExpirarService.setLogEventoExpirar(logTempoExpiracao).subscribe(
      resp => {
        this.spinnerService.hide();
        if (resp['isSucceed']) {
          for (let item of resp["messages"]) {            
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 10000, 'light-green darken-2');
          }
        }
        else {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 10000, 'orange darken-3');
          }
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 10000, 'orange darken-3');
      }
    )
  }

  /** Cadastrar Sistemas */
  public updateLogEventoExpirar(logTempoExpiracao) {
    this.loadingText = 'Atualizando...';
    this.spinnerService.show();
    this.logEventoExpirarService.updateLogEventoExpirar(logTempoExpiracao).subscribe(
      resp => {
        this.spinnerService.hide();
        if (resp['isSucceed']) {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 10000, 'light-green darken-2');
          }
        }
        else {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 10000, 'orange darken-3');
          }
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 10000, 'orange darken-3');
      }
    )
  }

  /** Cadastrar Sistemas */
  public getLogEventoExpirar() {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.logEventoExpirarService.getAllLogEventoExpirar().subscribe(
      logsExpirar => {
        this.spinnerService.hide();
        if (logsExpirar['isSucceed']) {
          this.logsExpirar = logsExpirar['data'];
          if (this.logsExpirar.length > 0) {
            this.tempoExpirarErro.setValue(this.logsExpirar[0].tempoExpirar);
            this.tempoExpirarAlerta.setValue(this.logsExpirar[1].tempoExpirar);
            this.tempoExpirarSucesso.setValue(this.logsExpirar[2].tempoExpirar);
            this.codEventoErro.setValue(this.logsExpirar[0].codLogEventoExpirar);
            this.codEventoAlerta.setValue(this.logsExpirar[1].codLogEventoExpirar);
            this.codEventoSucesso.setValue(this.logsExpirar[2].codLogEventoExpirar);
            this.isEdit = true;
          }
        }
        else {
          for (let item of logsExpirar["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 10000, 'orange darken-3');
          }
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 10000, 'orange darken-3');
      }
    )
  }

}
