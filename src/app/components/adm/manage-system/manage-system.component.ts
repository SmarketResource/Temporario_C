import { Component, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';

/** Services */
import { SistemaService } from '../../../services/sistema.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SistemaParametrosService } from '../../../services/sistema-parametros.service';

@Component({
  selector: 'app-manage-system',
  templateUrl: './manage-system.component.html',
  styleUrls: ['./manage-system.component.scss'],
  providers: [
    SistemaService,
    SistemaParametrosService
  ]
})
export class ManageSystemComponent implements OnInit {
  public sistemas: Array<any> = [];
  public parametros: Array<any> = [];

  public loading: any = false;
  public loadingText: string = '';

  public idSistema = 0;

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    public sistemaService: SistemaService,
    public sistemaParametrosService: SistemaParametrosService,
    private spinnerService: Ng4LoadingSpinnerService
    //private flashMessagesService: FlashMessagesService
  ) {

  }

  public ngOnInit() {
    this.getAllSistemas();
  }

  /** Listar Sistemas */
  public getAllSistemas() {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.sistemaService.getAllSistemas().subscribe(
      sistemas => {
        this.spinnerService.hide();
        if (sistemas['isSucceed']) {
          this.sistemas = sistemas['data'];
          for (let i in this.sistemas) {
            if (this.sistemas[i].imagem) {
              this.sistemas[i].imagem = this.domSanitizer.bypassSecurityTrustResourceUrl(this.sistemas[i].imagem);
            }
          }

        }
        else {

        }
      },
      err => {
        this.spinnerService.hide();
      }
    )
  }

  /** Listar Sistemas */
  public getSistemaParametros(codSistema) {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.sistemaParametrosService.getSistemaParametros(codSistema).subscribe(
      parametros => {
        this.spinnerService.hide();
        if (parametros['isSucceed']) {
          this.parametros = parametros['data'];
        }
        else {
          //this.flashMessagesService.show('Login ou senha inválidos!', { cssClass: 'alert-danger', timeout: 1000 });
        }
      },
      err => {
        this.spinnerService.hide();
        //this.flashMessagesService.show('Requisição inválida!', { cssClass: 'alert-danger', timeout: 1000 });
      }
    )
  }

  public excluirSistema(codSistema) {
    this.sistemaService.deleteSistema(codSistema).subscribe(
      resp => {
        this.closeModal();
        if (resp["isSucceed"]) {
          toast('Sistema excluido com sucesso!', 10000, 'light-green darken-2');
          this.getSistemaParametros(codSistema);
          location.reload();          
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
        toast('<span><i class="material-icons">notifications</i>&nbsp; Requisição Inválida! </span>'
        , 10000, 'orange darken-3');
      }
    )
  }

  /** Exclui parametro do sistema */
  public excluirParametros(codParametros, codSistema) {
    this.sistemaParametrosService.deleteParametros(codParametros).subscribe(
      resp => {
        if (resp['isSucceed']) {
          toast('Parametro excluido com sucesso!', 50000, 'light-green darken-2');
          this.getSistemaParametros(codSistema);
        }
        else {
          for (let item of resp["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
            , 10000, 'orange darken-3');
          }
        }
      },
      err => {
        toast('<span><i class="material-icons">notifications</i>&nbsp; Requisição Inválida! </span>'
        , 10000, 'orange darken-3');
      }
    )
  }

  public adicionarSistema() {
    this.router.navigate(['/adm/manage-system/form-system']);
  }

  public adicionarUrl(codSistema) {
    localStorage.setItem('codSistema', JSON.stringify(codSistema));
    this.router.navigate(['/adm/manage-system/form-urls']);
  }

  public editarSistema(sistema) {
    localStorage.setItem('sistema', JSON.stringify(sistema));
    this.router.navigate(['/adm/manage-system/form-system']);
  }

  public editarParametros(parametro) {
    console.log(parametro);
    localStorage.setItem('parametro', JSON.stringify(parametro));
    this.router.navigate(['/adm/manage-system/form-urls']);
  }

  public voltar() {
    this.router.navigate(['/adm/manage-system']);
  }

  //modal

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }


}
