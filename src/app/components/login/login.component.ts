import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { toast } from 'angular2-materialize';
//import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    AuthenticationService
  ],
})

export class LoginComponent implements OnInit {
  public form: FormGroup;

  public login: AbstractControl;
  public password: AbstractControl;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public authenticationService: AuthenticationService,
    //private flashMessagesService: FlashMessagesService
  ) {

    this.form = fb.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })

    this.login = this.form.controls['login'];
    this.password = this.form.controls['password'];
  }

  public ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params.tokenExpirado) {
          //this.flashMessagesService.show('Login expirado!', { cssClass: 'alert-danger', timeout: 5000 });
        }
      }
    );
  }

  public onSubmit(values: Object): void {

    if (this.form.valid) {
      this.autenticar(values);
    }
    else {
      this.login.markAsTouched();
      this.password.markAsTouched();
    }

  }

  public autenticar(acesso) {
    this.authenticationService.authentication(acesso).subscribe(
      autentica => {
        console.log('autentica',autentica);
        if (autentica['isSucceed'] && autentica['data'].isAuthenticated) {
          this.router.navigate(['/adm']);
        }
        else {
          for (let item of autentica["messages"]) {
            toast('<span><i class="material-icons">notifications</i>&nbsp;' + item.description + '</span>'
              , 5000, 'orange darken-3');
          }
        }
      },
      err => {
          toast('<span><i class="material-icons">notifications</i>&nbsp; Requisição Inválida! </span>'
            , 5000, 'orange darken-3');
      }
    )
  }

  

}




