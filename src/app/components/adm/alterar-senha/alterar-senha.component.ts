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
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
  providers: [
    DriverVanService,
    Ng4LoadingSpinnerService
  ]
})
export class AlterarSenhaComponent implements OnInit {

  @ViewChild('formEditMotorista') formEditMotorista: NgForm;

  public motoristas: Array<Motorista> = [];
  public motorista: Motorista = new Motorista();
  public loading: any = false;
  public loadingText: string = '';

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
  

}
