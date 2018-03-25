import { Component, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';
import { LowerCasePipe } from '@angular/common';
import * as moment from 'moment';
moment.locale('pt-BR');

/** Data */
import * as caledarioConst from '../../../../data/calendario.data';

/** Models */
import { DiasSemana } from '../../../../models/calendario.model';

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { format } from 'util';


@Component({
  selector: 'app-calendario-mensal',
  templateUrl: './calendario-mensal.component.html',
  styleUrls: ['./calendario-mensal.component.scss'],
  providers: [
    Ng4LoadingSpinnerService
  ]
})
export class CalendarioMensalComponent implements OnInit {
  public loading: any = false;
  public loadingText: string = '';

  public diasSemana: Array<DiasSemana> = caledarioConst.diasSemana;

  public calendarMensal: any = {}

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService
    //private flashMessagesService: FlashMessagesService
  ) {

  }

  public ngOnInit() {

    this.calendarMensal = {
      diaAtual: parseInt(moment().format('DD')),
      mesAtual: parseInt(moment().format('MM')),
      anoAtual: parseInt(moment().format('YYYY')),
      ultimoDia: moment().daysInMonth()
    }

    console.log(this.calendarMensal);

  }

  public montaCalendario(){
    for(var i = this.calendarMensal.diaInicio; i <= this.calendarMensal.diaFim; i ++){

    }
  }


}
