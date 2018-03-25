import { Component, EventEmitter, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';

/** Models */
import { Estudante } from '../../../models/estudante.model';
import { Translado } from '../../../models/translado.model';

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudentService } from '../../../services/student.service';
import { TransferredService } from '../../../services/transferred.service';
import { DriverVanService } from '../../../services/driver-van.service';
import { Motorista } from '../../../models/motorista.model';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.scss'],
  providers: [
    StudentService,
    TransferredService,
    DriverVanService,
    Ng4LoadingSpinnerService
  ]
})
export class EstudanteComponent implements OnInit {
  public loadingText: string = '';

  public motoristas: Array<Motorista>;
  public motoristasList: any = { '': null };

  public isEditEstudante: boolean = false;
  public estudantes: Array<Estudante>;
  public estudanteModel: Estudante = new Estudante();

  public transladoModel: Translado = new Translado();

  modalActionsEstudante = new EventEmitter<string | MaterializeAction>();
  modalActionsTranslado = new EventEmitter<string | MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerServiceList: Ng4LoadingSpinnerService,
    private spinnerServiceForm: Ng4LoadingSpinnerService,
    private studentService: StudentService,
    private transferredService: TransferredService,
    private driverVanService: DriverVanService
  ) {

  }

  public ngOnInit() {
    this.listarEstudantes();
    this.listarMotoristas();
  }

  /** Listar Estudantes */
  public listarEstudantes() {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceList.show();
    this.studentService.getAllStudent().subscribe(
      resp => {
        this.spinnerServiceList.hide();
        if (resp['isSucceed']) {
          this.estudantes = resp['data'];
        }
      },
      err => {
        this.spinnerServiceList.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  public submitFormEstudante(form) {
    if (form.form.status === "VALID") {
      console.log(this.estudanteModel);
      if (this.isEditEstudante) {
        this.editarEstudante(this.estudanteModel);
      }
      else {
        this.cadastrarEstudante(this.estudanteModel);
      }
    }
    else {
      toast('<i class="material-icons">notifications</i>&nbsp;<span>Formulário inválido! Preencha todos os campos corretamente.</span>'
      , 5000, 'orange darken-3');
    }
  }

  /** Cadastrar estudantes */
  private cadastrarEstudante(estudante) {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceForm.show();
    this.studentService.setStudent(estudante).subscribe(
      resp => {
        this.spinnerServiceForm.hide();
        if (resp['isSucceed']) {
          toast('<span><i class="material-icons">notifications</i>&nbsp;Cadastro realizado com sucesso!</span>'
            , 5000, 'light-green darken-2');
          this.closeModalEstudante();
          this.listarEstudantes();
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

  /** Editar estudantes */
  private editarEstudante(estudante) {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceForm.show();
    this.studentService.updateStudent(estudante).subscribe(
      resp => {
        this.spinnerServiceForm.hide();
        if (resp['isSucceed']) {
          toast('<span><i class="material-icons">notifications</i>&nbsp;Edição realizada com sucesso!</span>'
            , 5000, 'light-green darken-2');
          this.closeModalEstudante();
          this.listarEstudantes();
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

  /** Editar estudantes */
  // private ativarEstudante(estudante) {
  //   this.loadingText = 'Aguarde...';
  //   this.spinnerService.show();
  //   this.studentService.activeStudent(estudante).subscribe(
  //     resp => {
  //       this.spinnerService.hide();
  //     },
  //     err => {
  //       this.spinnerService.hide();
  //       toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
  //         , 5000, 'orange darken-3');
  //     }
  //   )
  // }

  /** Ações modal cadastra e edita estudantes */
  openModalEstudante(estudante = null) {
    if (estudante === null) {
      this.isEditEstudante = false;
      this.estudanteModel = new Estudante();
    }
    else {
      this.isEditEstudante = true;
      this.estudanteModel = estudante;
    }
    this.modalActionsEstudante.emit({ action: "modal", params: ['open'] });
  }

  closeModalEstudante() {
    this.modalActionsEstudante.emit({ action: "modal", params: ['close'] });
  }

  public submitFormTranslado(form) {
    if (form.form.status === "VALID") {
      this.cadastrarTranslado(this.transladoModel);
    }
    else {
      toast('<i class="material-icons">notifications</i>&nbsp;<span>Formulário inválido! Preencha todos os campos corretamente.</span>'
      , 5000, 'orange darken-3');
    }
  }

  /** Cadastrar translado */
  private cadastrarTranslado(translado) {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceForm.show();
    this.transferredService.setTransferred(translado).subscribe(
      resp => {
        this.spinnerServiceForm.hide();
        if (resp['isSucceed']) {
          toast('<span><i class="material-icons">notifications</i>&nbsp;Cadastro realizado com sucesso!</span>'
            , 5000, 'light-green darken-2');
          this.closeModalTranslado();
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

  /** Ações modal cadastra e edita translado */
  openModalTranslado(estudante) {
    this.transladoModel = new Translado();
    this.transladoModel.studentId = estudante.studentId;
    this.transladoModel.student = estudante.name + '-' + estudante.documento;
    this.modalActionsTranslado.emit({ action: "modal", params: ['open'] });
  }

  closeModalTranslado() {
    this.modalActionsTranslado.emit({ action: "modal", params: ['close'] });
  }

  public listarMotoristas() {
    this.loadingText = 'Aguarde...';
    this.spinnerServiceList.show();
    this.driverVanService.getAllDriverVan().subscribe(
      resp => {
        this.spinnerServiceList.hide();
        if (resp['isSucceed']) {
          this.motoristas = resp['data'];
          for (var i = 0; i < this.motoristas.length; i++) {
            let motorista = this.motoristas[i].name;
            this.motoristasList[motorista] = null;
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

  public changeMotorista() {
    let motoristaSelecionado = this.motoristas.find(x => x.name == this.transladoModel.driver);
    this.transladoModel.driverId = motoristaSelecionado.codDriverVan;
  }

}
