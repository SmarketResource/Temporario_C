import { Component, EventEmitter, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';
import { LowerCasePipe } from '@angular/common';
import * as moment from 'moment';
moment.locale('pt-BR');

/** Data */
import * as caledarioConst from '../../../data/calendario.data';

/** Models */
import { DiasSemana } from '../../../models/calendario.model';
import { Mes } from '../../../models/calendario.model';
import { Translado } from '../../../models/translado.model';
import { Estudante } from '../../../models/estudante.model';

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudentService } from '../../../services/student.service';
import { DriverVanService } from '../../../services/driver-van.service';

@Component({
  selector: 'app-translado',
  templateUrl: './translado.component.html',
  styleUrls: ['./translado.component.scss'],
  providers: [
    StudentService,
    DriverVanService,
    Ng4LoadingSpinnerService
  ]
})

export class TransladoComponent implements OnInit {
  public loading: any = false;
  public loadingText: string = '';
  public pickerVisible: boolean;

  private motoristas: Array<any>;
  private motoristasList: any = { '': null };

  public diaSelecionado: any;
  public calendario: any = {}
  public diasSemana: Array<DiasSemana> = caledarioConst.diasSemana;
  public meses: Array<DiasSemana> = caledarioConst.meses;

  public transladoModel: Translado = new Translado();

                                                                                                                                                                                                                                                                                                                                                                            mm 
  public datepickerActions = new EventEmitter<string | MaterializeAction>();
  public datepickerCreateTranslado = new EventEmitter<string | MaterializeAction>();
  public timpickerActions = new EventEmitter<string | MaterializeAction>();
  public modalActionsCreateTranslado = new EventEmitter<string | MaterializeAction>();
  public modalActionsEdit = new EventEmitter<string | MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService,
    private driverVanService: DriverVanService,
    private studentService: StudentService
    //private flashMessagesService: FlashMessagesService
  ) {
    this.listarMotoristas();
  }

  public ngOnInit() {
    this.calendario = {
      diaAtual: parseInt(moment().format('DD')),
      mesAtual: parseInt(moment().format('MM')),
      anoAtual: parseInt(moment().format('YYYY')),
      ultimoDia: moment().daysInMonth()
    }

  }

  public listarMotoristas() {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.driverVanService.getAllDriverVan().subscribe(
      resp => {
        this.spinnerService.hide();
        if (resp['isSucceed']) {
          this.motoristas = resp['data'];
          for (var i = 0; i < this.motoristas.length; i++) {
            let motorista = this.motoristas[i].name;
            this.motoristasList[motorista] = null;
          }
          console.log(this.motoristasList.length);
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  //Ações datepicker
  public openDatepicker() {
    this.datepickerActions.emit({ action: "pickadate", params: ["open"] });
  }
  public closeDatepicker() {
    this.datepickerActions.emit({ action: "pickadate", params: ["close"] });
  }

    //Ações datepicker modal criar translado
    public openDatepickerCreateTranslado() {
      this.datepickerActions.emit({ action: "pickadate", params: ["open"] });
    }
    public closeDatepickerCreateTranslado() {
      this.datepickerActions.emit({ action: "pickadate", params: ["close"] });
    }

  //Ações modal cadastrar translado
  openModalCreateTranslado() {
    this.modalActionsCreateTranslado.emit({ action: "modal", params: ['open'] });
  }
  closeModalCreateTranslado() {
    this.modalActionsCreateTranslado.emit({ action: "modal", params: ['close'] });
  }


  //Ações modal cadastrar translado
  openModalEdit() {
    this.modalActionsEdit.emit({ action: "modal", params: ['open'] });
  }
  closeModalEdit() {
    this.modalActionsEdit.emit({ action: "modal", params: ['close'] });
  }

}
