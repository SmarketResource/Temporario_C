import { Component, EventEmitter, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';

/** Models */
import { Motorista } from '../../../models/motorista.model'

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverVanService } from '../../../services/driver-van.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.scss'],
  providers: [
    DriverVanService,
    Ng4LoadingSpinnerService
  ]
})
export class MotoristaComponent implements OnInit {

  @ViewChild('formEditMotorista') formEditMotorista: NgForm;

  public isEditMotorista: boolean = false;

  public motoristas: Array<Motorista> = [];
  public motoristaModel: Motorista = new Motorista();
  public loading: any = false;
  public loadingText: string = '';

  modalActionsMotorista = new EventEmitter<string|MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService,
    private driverVanService: DriverVanService 
    //private flashMessagesService: FlashMessagesService
  ) {

  }

  public ngOnInit() {
    this.listarMotoristas();
  }

  public submitFormMotorista(form) {
    if(form.form.status === "VALID"){
      console.log(this.motoristaModel);
      if(this.isEditMotorista){
        this.editarMotorista(this.motoristaModel);
      }
      else{
        this.cadastrarMotorista(this.motoristaModel);
      }
    }
    else{

    }
  }

  public listarMotoristas() {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.driverVanService.getAllDriverVan().subscribe(
      resp => {
        this.spinnerService.hide();
        if(resp['isSucceed']){
          this.motoristas = resp['data'];
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  public cadastrarMotorista(form) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.driverVanService.setDriverVan(form.value).subscribe(
      resp => {
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  public editarMotorista(form) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.driverVanService.setDriverVan(form.value).subscribe(
      resp => {
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }
  
  /** Cadastrar Motorista */
  openModalMotorista(motorista = null) {
    if (motorista === null) {
      this.isEditMotorista = false;
      this.motoristaModel = new Motorista();
    }
    else {
      this.isEditMotorista = true;
      this.motoristaModel = motorista;
    }
    this.modalActionsMotorista.emit({action:"modal",params:['open']});
  }
  closeModalMotorista() {
    this.modalActionsMotorista.emit({action:"modal",params:['close']});
  }

}
