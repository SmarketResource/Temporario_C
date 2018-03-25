import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** services */
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-header-adm',
  templateUrl: './header-adm.component.html',
  styleUrls: ['./header-adm.component.scss'],
  providers: [
    AuthenticationService
  ],
})
export class HeaderAdmComponent implements OnInit {

  constructor(  private router: Router,
                public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

  }

  deslogar() {
    this.authenticationService.logout();
    this.router.navigate(['./login']);
  }

  
}
