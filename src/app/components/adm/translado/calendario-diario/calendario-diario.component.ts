import { Component, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-calendario-diario',
  templateUrl: './calendario-diario.component.html',
  styleUrls: ['./calendario-diario.component.scss'],
  providers: [
    Ng4LoadingSpinnerService
  ]
})
export class CalendarioDiarioComponent implements OnInit {
  public motoristas: Array<any> = [];
  public loading: any = false;
  public loadingText: string = '';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService
    //private flashMessagesService: FlashMessagesService
  ) {

  }

  public ngOnInit() {

  }




}
