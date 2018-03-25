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

  configurarLogs() {
    this.router.navigate(['./adm/manage-status']);
  }

  configurarSistemas() {
    this.router.navigate(['./adm/manage-system']);
  }

  exibirMonitor() {
    this.router.navigate(['./monitor']);
  }

}
