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
  @ViewChild('formMotorista') formMotorista: NgForm;
  public loadingText: string = '';
  public isEditMotorista: boolean = false;

  public motoristas: Array<Motorista> = [];
  public motoristaModel: Motorista = new Motorista();

  modalActionsMotorista = new EventEmitter<string|MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerServiceList: Ng4LoadingSpinnerService,
    private spinnerServiceForm: Ng4LoadingSpinnerService,
    private driverVanService: DriverVanService 
  ) {

  }

  public ngOnInit() {
    this.listarMotoristas();
  }

  public submitFormMotorista(form) {
    if(form.form.status === "VALID"){
      if(this.isEditMotorista){
        this.editarMotorista(this.motoristaModel);
      }
      else{
        this.cadastrarMotorista(this.motoristaModel);
      }
    }
    else{
      toast('<i class="material-icons">notifications</i>&nbsp;<span>Formulário inválido! Preencha todos os campos corretamente.</span>'
      , 5000, 'orange darken-3');
    }
  }

  public listarMotoristas() {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceList.show();
    this.driverVanService.getAllDriverVan().subscribe(
      resp => {
        this.spinnerServiceList.hide();
        if(resp['isSucceed']){
          this.motoristas = resp['data'];
        }
        else {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 5000, 'orange darken-3');
          }
        }
      },
      err => {
        this.spinnerServiceList.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  public cadastrarMotorista(motorista) {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceForm.show();
    this.driverVanService.setDriverVan(motorista).subscribe(
      resp => {
        this.spinnerServiceForm.hide();
        if (resp['isSucceed']) {     
          toast('<span><i class="material-icons">notifications</i>&nbsp;cadastro realizada com sucesso!</span>'
          , 5000, 'light-green darken-2');
          this.closeModalMotorista();
          this.listarMotoristas();       
        }
        else {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 5000, 'orange darken-3');
          }
        }
      },
      err => {
        this.spinnerServiceForm.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  public editarMotorista(motorista) {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceForm.show();
    this.driverVanService.updateDriverVan(motorista).subscribe(
      resp => {
        this.spinnerServiceForm.hide();
        if (resp['isSucceed']) { 
          toast('<span><i class="material-icons">notifications</i>&nbsp;Edição realizada com sucesso!</span>'
          , 5000, 'light-green darken-2');    
          this.closeModalMotorista();  
          this.listarMotoristas(); 
        }
        else {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 5000, 'orange darken-3');
          }
        }
      },
      err => {
        this.spinnerServiceForm.hide();
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
