import { Component, EventEmitter, AfterViewInit, OnInit, Input } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { toast } from 'angular2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import * as moment from 'moment';


/** Services */
import { SistemaParametrosService } from '../../../../services/sistema-parametros.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-form-urls',
  templateUrl: './form-urls.component.html',
  styleUrls: ['./form-urls.component.scss'],
  providers: [
    SistemaParametrosService
  ]

})

export class FormUrlsComponent implements OnInit {
  formattedDate: any;
  public isEdit: boolean = false;

  public formUrl: FormGroup;
  public loadingText: string = '';
  public sistema: any;
  public parametro: any;

  public codSistemaParametro: AbstractControl;
  public prefixUrl: AbstractControl;
  public codSistema: AbstractControl;
  public url: AbstractControl;
  public periodoDe: AbstractControl;
  public periodoAte: AbstractControl;
  public tempoValidacao: AbstractControl;
  public ativo: AbstractControl;


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public sistemaParametrosService: SistemaParametrosService,
    private spinnerService: Ng4LoadingSpinnerService
    //private flashMessagesService: FlashMessagesService
  ) {

    this.formUrl = fb.group({
      codSistemaParametro: [''],
      ativo: [''],
      prefixUrl: ['', Validators.compose([Validators.required])],
      codSistema: ['', Validators.compose([Validators.required])],
      url: ['', Validators.compose([Validators.required])],
      periodoDe: ['', Validators.compose([Validators.required])],
      periodoAte: ['', Validators.compose([Validators.required])],
      tempoValidacao: ['', Validators.compose([Validators.required])]
    })

    this.codSistemaParametro = this.formUrl.controls['codSistemaParametro'];
    this.codSistema = this.formUrl.controls['codSistema'];
    this.prefixUrl = this.formUrl.controls['prefixUrl'];
    this.url = this.formUrl.controls['url'];
    this.periodoDe = this.formUrl.controls['periodoDe'];
    this.periodoAte = this.formUrl.controls['periodoAte'];
    this.tempoValidacao = this.formUrl.controls['tempoValidacao'];
    this.ativo = this.formUrl.controls['ativo'];
  }

  ngOnInit() {

    if (localStorage.getItem('parametro')) {
      this.parametro = JSON.parse(localStorage.getItem('parametro'));

      localStorage.removeItem('parametro');

      this.codSistemaParametro.setValue(this.parametro.codSistemaParametro);
      this.ativo.setValue(this.parametro.ativo);
      this.codSistema.setValue(this.parametro.codSistema);
      this.url.setValue(this.parametro.url);
      let teste: string = this.parametro.prefixUrl; 
      this.prefixUrl.setValue(teste.toString());

      this.periodoDe.setValue(this.convetDatePt(this.parametro.periodoDe));
      this.periodoAte.setValue(this.convetDatePt(this.parametro.periodoAte));
      this.tempoValidacao.setValue(this.convetTempoValidacao(this.parametro.tempoValidacao));

      this.isEdit = true;
    }
    else if (localStorage.getItem('codSistema')) {
      this.prefixUrl.setValue('1');
      this.codSistema.setValue(JSON.parse(localStorage.getItem('codSistema')));
    }
    else {
      this.voltar();
    }
  }

  public onSubmit(values: Object): void {
    if (this.formUrl.valid) {
      if (!this.isEdit) {
        this.setUrl(values);
      }
      else {
        this.updateParametros(values);
      }
    }
    else {
      this.codSistema.markAsTouched();
      this.url.markAsTouched();
      this.periodoDe.markAsTouched();
      this.periodoAte.markAsTouched();
      this.tempoValidacao.markAsTouched();
    }
  }

  /** Cadastrar Url */
  public setUrl(parametros) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();

    //formata datas
    parametros.periodoDe = this.convetDate(parametros.periodoDe);
    parametros.periodoAte = this.convetDate(parametros.periodoAte);

    this.sistemaParametrosService.setUrl(parametros).subscribe(
      resp => {
        this.spinnerService.hide();
        if (resp['isSucceed']) {
          toast('Cadastro realizado com sucesso!', 10000, 'light-green darken-2');
          this.voltar();
        }
        else {
          toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
            , 10000, 'orange darken-3');
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 10000, 'orange darken-3');
      }
    )
  }

  /** Cadastrar Url */
  public updateParametros(parametros) {
    var erros = [];
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();

    //formata datas
    parametros.periodoDe = this.convetDate(parametros.periodoDe);
    parametros.periodoAte = this.convetDate(parametros.periodoAte);

    this.sistemaParametrosService.updateParametros(parametros).subscribe(
      resp => {
        this.spinnerService.hide();
        if (resp['isSucceed']) {
          toast('Parametro atualizado com sucesso!', 10000, 'light-green darken-2');
          this.voltar();
        }
        else {
          erros = resp['erros'];
          console.log(erros);
          toast('<i class="material-icons">notifications</i>&nbsp;<span></span>'
            , 10000, 'orange darken-3');
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 10000, 'orange darken-3');
      }
    )
  }

  public voltar() {
    this.router.navigate(['/adm/manage-system']);
  }

  public convetDate(data) {
    data = data.replace('/', '-');
    var dataFormat = moment(data, "DD-MM-YYYY");
    return dataFormat.format('YYYY') + '-' + dataFormat.format('MM') + '-' + dataFormat.format('DD');
  }

  public convetDatePt(data) {
    data = data.replace('/', '-');
    var dataFormat = moment(data, "YYYY-MM-DD");
    return dataFormat.format('DD') + '/' + dataFormat.format('MM') + '/'+ dataFormat.format('YYYY');
  }

  public convetTempoValidacao(tempo) {
    var tempoFormat = moment(tempo);
    return tempoFormat.format('HH')+ ':' + tempoFormat.format('mm');
  }

  public validaUrl() {
    this.url.setValue(this.url.value.replace('http://', ''));
    this.url.setValue(this.url.value.replace('https://', ''));
  }

}
