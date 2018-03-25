import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.scss']
})
export class DashboardAdmComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  configurarMotoristas() {
    this.router.navigate(['./adm/motorista']);
  }

  configurarAlunos() {
    this.router.navigate(['./adm/estudante']);
  }

  configurarTranslados() {
    this.router.navigate(['./adm/translado']);
  }

}
