import { Component, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { toast } from 'angular2-materialize';
import { DomSanitizer } from '@angular/platform-browser';

/** services */
import { SistemaService } from '../../../../services/sistema.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forEach } from '@angular/router/src/utils/collection';
import { UploadMetadata } from 'angular2-image-upload';

@Component({
  selector: 'app-form-system',
  templateUrl: './form-system.component.html',
  styleUrls: ['./form-system.component.scss'],
  providers: [
    SistemaService
  ]
})

export class FormSystemComponent implements OnInit {
  public isEdit: boolean = false;
  public formSystem: FormGroup;
  public sistema: any = null;

  public imagemUpload: any = '';
  public loadingText: string = '';

  public nome: AbstractControl;
  public imagem: AbstractControl;
  public tipoImagem: AbstractControl;
  public codSistema: AbstractControl;
  public ativo: AbstractControl;

  /** configurações componente upload image */
  customStyle = {
    selectButton: {
      "background-color": "#0288d1",
      "box-shadow": "0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2)"
    },
    clearButton: {
      "background-color": "#E53935",
      "margin-left": "10px"
    },
    layout: {
      "font-size": "15px",
      "margin": "10px",
      "padding-top": "5px",
      "width": "80%",
      "margin-left": "10%",
      "margin-rigth": "10%"
    },
    previewPanel: {

    }
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public domSanitizer: DomSanitizer,
    public sistemaService: SistemaService,
    private spinnerService: Ng4LoadingSpinnerService
    //private flashMessagesService: FlashMessagesService
  ) {

    this.formSystem = fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      imagem: [''],
      tipoImagem: [''],
      codSistema: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
      ativo: ['']
    })

    this.nome = this.formSystem.controls['nome'];
    this.imagem = this.formSystem.controls['imagem'];
    this.tipoImagem = this.formSystem.controls['tipoImagem'];
    this.codSistema = this.formSystem.controls['codSistema'];
    this.ativo = this.formSystem.controls['ativo'];
  }

  public ngOnInit() {
    if (localStorage.getItem('sistema')) {
      this.sistema = JSON.parse(localStorage.getItem('sistema'));
      localStorage.removeItem('sistema');
      this.codSistema.setValue(this.sistema.codSistema);
      this.nome.setValue(this.sistema.nome);
      if (this.sistema.imagem != null) {
        this.imagem.setValue(this.sistema.imagem.changingThisBreaksApplicationSecurity);
      }
      if (this.sistema.imagem != null && this.sistema.imagem.changingThisBreaksApplicationSecurity) {
        this.imagemUpload = this.sistema.imagem.changingThisBreaksApplicationSecurity;
      }
      this.tipoImagem.setValue(this.sistema.tipoImagem);
      console.log(this.tipoImagem);
      this.ativo.setValue(this.sistema.ativo);
      this.isEdit = true;
    }
    else {
      this.ativo.setValue(1);
    }
  }

  public onSubmit(values: Object): void {

    if (this.formSystem.valid) {
      if (!this.isEdit) {
        this.setSistemas(values);
      }
      else {
        this.updateSistemas(values);
      }

    }
    else {
      this.nome.markAsTouched();
      this.codSistema.markAsTouched();
    }
  }

  /** Cadastrar Sistemas */
  public setSistemas(sistema) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.sistemaService.setSistemas(sistema).subscribe(
      sistemas => {
        this.spinnerService.hide();
        if (sistemas['isSucceed']) {
          for (let item of sistemas["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 50000, 'light-green darken-2');
          }
          this.voltar();
        }
        else {
          toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
            , 50000, 'orange darken-3');

        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 50000, 'orange darken-3');
      }
    )
  }

  /** Cadastrar Sistemas */
  public updateSistemas(sistema) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.sistemaService.updateSistemas(sistema).subscribe(
      sistemas => {
        this.spinnerService.hide();
        if (sistemas['isSucceed']) {
          for (let item of sistemas["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 50000, 'light-green darken-2');
          }
          this.voltar();
        }
        else {
          toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
            , 50000, 'orange darken-3');
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 50000, 'orange darken-3');
      }
    )
  }

  /** ações componente upload image */
  onRemoved(event) {
    this.imagem.setValue('');
    this.tipoImagem.setValue('');
    this.imagemUpload = '';
  }
  onUploadFinished(event) {
    this.imagem.setValue(event.src);
    this.tipoImagem.setValue(event.file.type.replace('image/', ''));
  }
  onUploadStateChanged(event) {

  }

  onBeforeUpload = (metadata: UploadMetadata) => {
    console.log(metadata);
    if (this.imagemUpload != '') {
      metadata.abort = true;
    }

    return metadata;
  };

  public voltar() {
    this.router.navigate(['/adm/manage-system']);
  }

}
