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


@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.scss'],
  providers: [
    StudentService,
    TransferredService,
    Ng4LoadingSpinnerService
  ]
})
export class EstudanteComponent implements OnInit {
  public loading: any = false;
  public loadingText: string = '';

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
    private spinnerService: Ng4LoadingSpinnerService,
    private studentService: StudentService,
    private transferredService: TransferredService
    //private flashMessagesService: FlashMessagesService
  ) {

  }

  public ngOnInit() {
    this.listarEstudantes();
  }

  /** Listar Estudantes */
  public listarEstudantes() {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.studentService.getAllStudent().subscribe(
      resp => {
        this.spinnerService.hide();
        if (resp['isSucceed']) {
          this.estudantes = resp['data'];
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }

  public submitFormEstudante(form) {
    console.log(form);
  }

  /** Cadastrar estudantes */
  private cadastrarEstudante(estudante) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.studentService.setStudent(estudante).subscribe(
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

  /** Editar estudantes */
  private editarEstudante(estudante) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.studentService.setStudent(estudante).subscribe(
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
    console.log(form);
  }

  /** Cadastrar translado */
  private cadastrarTranslado(translado) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.transferredService.setTransferred(translado).subscribe(
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

  /** Ações modal cadastra e edita translado */
  openModalTranslado() {
    this.transladoModel = new Translado();
    this.modalActionsTranslado.emit({ action: "modal", params: ['open'] });
  }

  closeModalTranslado() {
    this.modalActionsTranslado.emit({ action: "modal", params: ['close'] });
  }

}